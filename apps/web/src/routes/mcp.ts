import type { Route } from "./+types/mcp";
import { handleChauffeurMcp } from "@/lib/chauffeur-mcp.server";

export function loader({ request }: Route.LoaderArgs) {
  return handleChauffeurMcp(request);
}

export function action({ request }: Route.ActionArgs) {
  return handleChauffeurMcp(request);
}
