import { getChauffeurServiceInfo, publicTool } from "@/lib/public-agent-tools";

type Context = {
  registerTool(tool: typeof publicTool & {
    execute: () => ReturnType<typeof getChauffeurServiceInfo>;
  }): void | Promise<void>;
};

export function registerChauffeurWebMcp() {
  const context = (document as Document & { modelContext?: Context }).modelContext
    ?? (navigator as Navigator & { modelContext?: Context }).modelContext;
  if (!context?.registerTool) return;

  try {
    return Promise.resolve(context.registerTool({
      ...publicTool,
      execute: () => getChauffeurServiceInfo(window.location.origin),
    })).catch(error => console.warn("Could not register the chauffeur WebMCP tool", error));
  } catch (error) {
    console.warn("Could not register the chauffeur WebMCP tool", error);
  }
}
