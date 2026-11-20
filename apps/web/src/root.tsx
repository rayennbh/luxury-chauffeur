import {
  data,
  useLocation,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import stylesheet from "@/index.css?url";
import { siteOrigin } from "@/lib/site-origin.server";
import { HorizonsPreviewScripts } from "./horizons-preview-scripts";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CookieBanner } from "@/components/cookie-banner";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact-links";
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from "@/constants/site";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
  rel: "icon",
  type: "image/svg+xml",
  href:
    "data:image/svg+xml," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="12" fill="#111d2b"/>
        <g fill="none" stroke="#e7bf73" stroke-width="5"
           stroke-linecap="square" stroke-linejoin="miter">
          <path d="M52 19C48 15 44 14 39 14C28 14 22 22 22 32C22 43 28 50 39 50C44 50 48 48 52 44"/>
          <path d="M16 17V46H34"/>
        </g>
      </svg>
    `),
},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

/**
 * Publishes the site's public origin, which `seo()` reads to build canonical and
 * `og:url` tags, and advertises the sitemap to crawlers that read response
 * headers rather than HTML.
 *
 * A `meta` export can only reach server data through `matches`, and the `headers`
 * export cannot see loader data at all, so both have to travel this way.
 */
export function loader({ request }: Route.LoaderArgs) {
  const origin = siteOrigin(request);

  return data(
    { origin },
    {
      headers: {
        Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
      },
    },
  );
}

/**
 * A page route that exports `headers` replaces this one, so merge `parentHeaders`
 * there rather than returning only that route's own headers.
 */
export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning absorbs attributes injected by browser extensions
    // and theme scripts before hydration; attribute-only, one element deep. Keep both.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <HorizonsPreviewScripts />
      </head>
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
        <CookieBanner />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const isHome = useLocation().pathname === "/";

  return (
    <>
      {!isHome && (
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
      )}

      {!isHome && <SiteHeader />}

      <Outlet />

      {!isHome && <SiteFooter />}

      <a
        className="whatsapp-floating"
        href={whatsappUrl({
          phone: WHATSAPP_NUMBER,
          text: WHATSAPP_DEFAULT_MESSAGE,
        })}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp — opens in a new tab"
      >
        <MessageCircle size={25} aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "Please try again in a few moments.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "This page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack ? (
        <pre>
          <code>{stack}</code>
        </pre>
      ) : null}
    </main>
  );
}
