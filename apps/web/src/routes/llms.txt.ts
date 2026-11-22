import type { Route } from "./+types/llms.txt";
import { siteOrigin } from "@/lib/site-origin.server";
import { renderSiteMarkdown } from "@/lib/site-markdown";

export function loader({ request }: Route.LoaderArgs) {
  return new Response(renderSiteMarkdown(siteOrigin(request)), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
