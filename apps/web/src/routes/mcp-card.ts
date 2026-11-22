import type { Route } from "./+types/mcp-card";
import { serverCard } from "@/lib/chauffeur-mcp.server";
import { siteOrigin } from "@/lib/site-origin.server";

export function loader({ request }: Route.LoaderArgs) {
  return Response.json(serverCard(siteOrigin(request)), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
