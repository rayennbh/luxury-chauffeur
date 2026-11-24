import type { Route } from "./+types/sitemap.xml";
import { siteOrigin } from "@/lib/site-origin.server";
import { publicPages } from "@/data/public-pages";

// Each listed page gained new or materially updated content or structured data
// in this release. Update the corresponding date when a page changes again.
const lastModified: Record<string, string> = {
  "/": "2026-11-24",
  "/about": "2026-11-23",
  "/contact": "2026-11-23",
  "/terms": "2026-11-23",
  "/nice": "2026-11-24",
  "/cannes": "2026-11-24",
  "/monaco": "2026-11-24",
  "/saint-tropez": "2026-11-23",
  "/courchevel": "2026-11-24",
  "/nice-airport-to-cannes": "2026-11-23",
  "/nice-airport-to-monaco": "2026-11-23",
  "/nice-airport-to-saint-tropez": "2026-11-23",
  "/geneva-airport-to-courchevel": "2026-11-23",
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function loader({ request }: Route.LoaderArgs) {
  const origin = siteOrigin(request);
  const urls = publicPages.map(({ path }) => {
    const lastmod = lastModified[path];
    return `  <url>
    <loc>${escapeXml(origin + path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
  }).join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
