import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { CallToolRequestSchema, ErrorCode, LATEST_PROTOCOL_VERSION, ListToolsRequestSchema, McpError } from "@modelcontextprotocol/sdk/types.js";
import { getChauffeurServiceInfo, publicTool } from "@/lib/public-agent-tools";
import { siteOrigin } from "@/lib/site-origin.server";

const serverInfo = {
  name: "luxury-chauffeur",
  title: "Luxury Chauffeur",
  version: "1.0.0",
};

export function serverCard(origin: string) {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/mcp-server-card/v1.json",
    version: "1.0",
    protocolVersion: LATEST_PROTOCOL_VERSION,
    serverInfo,
    description: "Read-only discovery of private chauffeur services, airport transfers and public contact information.",
    documentationUrl: origin + "/llms.txt",
    transport: { type: "streamable-http", endpoint: "/mcp" },
    capabilities: { tools: { listChanged: false } },
    authentication: { required: false },
    tools: [publicTool],
  };
}

export async function handleChauffeurMcp(request: Request) {
  const origin = siteOrigin(request);
  const requestOrigin = request.headers.get("Origin");
  if (requestOrigin && requestOrigin !== origin) {
    return Response.json({
      jsonrpc: "2.0", id: null, error: { code: -32000, message: "Origin is not allowed" },
    }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }

  if (request.method !== "POST") {
    return Response.json({
      jsonrpc: "2.0", id: null, error: { code: -32000, message: "This read-only endpoint accepts POST" },
    }, { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } });
  }

  // There is no session, visitor data or write capability to retain between requests.
  const server = new Server(serverInfo, { capabilities: { tools: { listChanged: false } } });
  server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: [publicTool] }));
  server.setRequestHandler(CallToolRequestSchema, ({ params }) => {
    if (params.name !== publicTool.name || Object.keys(params.arguments ?? {}).length) {
      throw new McpError(ErrorCode.InvalidParams, "Choose the listed tool and omit arguments");
    }
    return getChauffeurServiceInfo(origin);
  });

  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
    maxRequestBodySize: 8192,
  });
  try {
    await server.connect(transport);
    const response = await transport.handleRequest(request);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "no-store");
    return new Response(response.body, { status: response.status, headers });
  } finally {
    await server.close();
  }
}
