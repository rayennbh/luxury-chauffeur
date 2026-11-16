import { a as logger, i as rateLimitHeaders, n as clientIdentifier, r as consumeRateLimit } from "./rate-limit.server-CBw0EuCw.js";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, data, isRouteErrorResponse, useLocation } from "react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Expand, LockKeyhole, Mail, Menu, MessageCircle, X } from "lucide-react";
import PocketBase from "pocketbase";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// src/entry.server.tsx
var entry_server_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function appendComponentStack(error, errorInfo) {
	const componentStack = errorInfo?.componentStack;
	if (!(error instanceof Error) || !componentStack || error.stack?.includes(componentStack)) return;
	const separator = componentStack.startsWith("\n") ? "" : "\n";
	try {
		error.stack = `${error.stack ?? `${error.name}: ${error.message}`}${separator}${componentStack}`;
	} catch {}
}
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const userAgent = request.headers.get("user-agent");
		const readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error, errorInfo) {
				appendComponentStack(error, errorInfo);
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
// src/index.css?url
var src_default = "/assets/index-C_iDAQS9.css";
// src/lib/site-origin.server.ts
var LOCAL_HOSTNAMES = /* @__PURE__ */ new Set([
	"localhost",
	"127.0.0.1",
	"0.0.0.0",
	"[::1]"
]);
/**
* The public origin of this site, e.g. `https://example.com`. Use it for
* absolute URLs that leave the app — sitemap `<loc>`, canonical links, `og:url`.
*
* The scheme comes from the hostname because the request cannot report it: TLS
* terminates at the proxy, so `request.url` and `X-Forwarded-Proto` both say
* `http` even for a visitor who arrived over HTTPS. Trusting either publishes
* `http://` URLs that only redirect, which search engines index as a second,
* duplicate site. Every host this app is reachable on serves HTTPS except a
* local `npm run start`, which is where the `curl` checks in the SEO skill run.
*
* `Host` carries the public domain, and only the origin is read, so the `.data`
* suffix React Router adds to `request.url` on client navigations does not
* matter.
*/
var siteOrigin = (request) => {
	const { host, hostname } = new URL(request.url);
	return `${LOCAL_HOSTNAMES.has(hostname) ? "http" : "https"}://${host}`;
};
function HorizonsPreviewScripts() {
	useEffect(() => {
		window.__horizonsHydrated = true;
		window.dispatchEvent(new Event("horizons:hydrated"));
		import("./_virtual_horizons-runtime-DDCd-mNj.js");
	}, []);
	return null;
}
// src/hooks/use-disclosure.ts
/**
* Open/close behaviour for anything that shows and hides a panel: a mobile menu,
* a dropdown, a drawer, a modal-like overlay, a "read more". It carries no markup
* or styling; spread the props onto the elements the site designs.
*
*   const menu = useDisclosure({ lockScroll: true });
*   <button type="button" {...menu.triggerProps} aria-label="Menu">…</button>
*   {menu.isOpen && <nav {...menu.panelProps}>…</nav>}
*
* Escape closes it and returns focus to the trigger; navigating closes it by
* default. For a list of independently opening items (an FAQ), give each item
* its own `useDisclosure` or use a native `<details>`.
*/
function useDisclosure({ isInitiallyOpen = false, closeOnNavigate = true, closeOnEscape = true, lockScroll = false } = {}) {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);
	const panelId = useId();
	const triggerRef = useRef(null);
	const { pathname } = useLocation();
	const previousPathname = useRef(pathname);
	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((current) => !current), []);
	const setTriggerRef = useCallback((node) => {
		triggerRef.current = node;
	}, []);
	useEffect(() => {
		if (previousPathname.current === pathname) return;
		previousPathname.current = pathname;
		if (closeOnNavigate) setIsOpen(false);
	}, [pathname, closeOnNavigate]);
	useEffect(() => {
		if (!isOpen || !closeOnEscape) return;
		const onKeyDown = (event) => {
			if (event.key !== "Escape") return;
			setIsOpen(false);
			triggerRef.current?.focus();
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [isOpen, closeOnEscape]);
	useEffect(() => {
		if (!isOpen || !lockScroll) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen, lockScroll]);
	return {
		isOpen,
		open,
		close,
		toggle,
		triggerProps: {
			ref: setTriggerRef,
			onClick: toggle,
			"aria-expanded": isOpen,
			"aria-controls": panelId
		},
		panelProps: { id: panelId }
	};
}
// src/lib/contact-links.ts
/**
* `href`s for the ways a visitor reaches the business: call, email, WhatsApp,
* directions. Pass numbers in full international form (`+370 612 34567`);
* spaces, dashes and brackets are stripped here.
*/
var digitsOnly = (value) => value.replace(/\D/g, "");
/**
* Encoded with `encodeURIComponent`, not `URLSearchParams`: mail clients show the
* `+` that `URLSearchParams` uses for spaces literally.
*/
var mailtoHref = ({ email, subject, body }) => {
	const params = [subject && `subject=${encodeURIComponent(subject)}`, body && `body=${encodeURIComponent(body)}`].filter(Boolean);
	return `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
};
/**
* Opens a WhatsApp chat with an optional prefilled message. The number must
* include the country code: wa.me rejects local numbers and a leading 0.
*
* `whatsappUrl({ phone: '+370 612 34567', text: 'Hi! I would like to book a table.' })`
*/
var whatsappUrl = ({ phone, text }) => `https://wa.me/${digitsOnly(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
// src/constants/site.ts
/**
* Contact details for PRIME TRANSFER FRENCH RIVIERA.
*
* ⚠️ WHATSAPP_NUMBER is a PLACEHOLDER. Replace it with the real full-international
* WhatsApp number (country code first, e.g. '+33 6 12 34 56 78') and the whole
* site picks it up — header, contact section, footer and chat panel.
*/
var WHATSAPP_NUMBER = "+33773141625";
/** Prefilled message opened when a visitor taps a WhatsApp button. */
var WHATSAPP_DEFAULT_MESSAGE = "Hello Luxury Chauffeur, I would like to request a private transfer. Could you confirm availability and provide a quotation?";
var CONTACT_EMAIL = "contact@luxury-chauffeur.com";
// src/components/site-header.tsx
/** Vector interpretation of the supplied LR monogram; no image file required. */
function LuxrideBrand() {
	const gradientId = `luxury-gold-${useId().replace(/:/g, "")}`;
	return /* @__PURE__ */ jsxs("a", {
		href: "/#accueil",
		className: "brand luxury-chauffeur-brand",
		"aria-label": "Luxury Chauffeur — Home",
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "luxury-chauffeur-monogram",
			viewBox: "0 0 100 100",
			fill: "none",
			"aria-hidden": "true",
			focusable: "false",
			children: [/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", {
				id: gradientId,
				x1: "10",
				y1: "10",
				x2: "90",
				y2: "90",
				gradientUnits: "userSpaceOnUse",
				children: [
					/* @__PURE__ */ jsx("stop", { stopColor: "#b58942" }),
					/* @__PURE__ */ jsx("stop", {
						offset: "0.35",
						stopColor: "#f3d58b"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "0.7",
						stopColor: "#c99a4d"
					}),
					/* @__PURE__ */ jsx("stop", {
						offset: "1",
						stopColor: "#efd292"
					})
				]
			}) }), /* @__PURE__ */ jsxs("g", {
				fill: `url(#${gradientId})`,
				children: [/* @__PURE__ */ jsx("path", { d: "M79 20C72 14 65 12 57 12C35 12 21 28 21 50C21 73 35 88 57 88C66 88 74 85 81 79V63H77C74 76 68 82 58 82C42 82 34 69 34 50C34 31 42 18 58 18C68 18 74 24 77 36H81V20Z" }), /* @__PURE__ */ jsx("path", { d: "M39 30H60V33L54 35V69H67C72 69 75 66 78 59H82L78 76H39V73L44 71V35L39 33Z" })]
			})]
		}), /* @__PURE__ */ jsxs("span", {
			className: "luxury-chauffeur-wordmark",
			children: [
				/* @__PURE__ */ jsx("strong", { children: "LUXURY" }),
				/* @__PURE__ */ jsx("span", { children: "CHAUFFEUR" }),
				/* @__PURE__ */ jsx("small", { children: "FRENCH RIVIERA" })
			]
		})]
	});
}
function SiteHeader() {
	const menu = useDisclosure();
	const navigation = [
		{
			label: "Home",
			href: "/#accueil"
		},
		{
			label: "Services",
			href: "/#services"
		},
		{
			label: "Fleet",
			href: "/#vehicules"
		},
		{
			label: "Monaco",
			href: "/monaco"
		},
		{
			label: "Cannes",
			href: "/cannes"
		},
		{
			label: "The Riviera",
			href: "/#galerie"
		},
		{
			label: "Contact",
			href: "/#contact"
		}
	];
	return /* @__PURE__ */ jsxs("header", {
		className: "site-header",
		children: [
			/* @__PURE__ */ jsx(LuxrideBrand, {}),
			/* @__PURE__ */ jsx("nav", {
				className: "desktop-nav",
				"aria-label": "Main navigation",
				children: navigation.map((item) => /* @__PURE__ */ jsx("a", {
					href: item.href,
					children: item.label
				}, item.href))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "header-actions",
				children: [/* @__PURE__ */ jsxs("a", {
					className: "icon-button header-whatsapp",
					href: whatsappUrl({
						phone: WHATSAPP_NUMBER,
						text: WHATSAPP_DEFAULT_MESSAGE
					}),
					target: "_blank",
					rel: "noopener noreferrer",
					"aria-label": "Message us on WhatsApp",
					children: [/* @__PURE__ */ jsx(MessageCircle, { size: 20 }), /* @__PURE__ */ jsx("span", { children: "WhatsApp" })]
				}), /* @__PURE__ */ jsxs("a", {
					className: "button button-blue header-book",
					href: "/#reservations",
					children: ["Request a transfer ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })]
				})]
			}),
			/* @__PURE__ */ jsx("button", {
				className: "icon-button mobile-menu",
				...menu.triggerProps,
				"aria-label": menu.isOpen ? "Close menu" : "Open menu",
				children: menu.isOpen ? /* @__PURE__ */ jsx(X, {}) : /* @__PURE__ */ jsx(Menu, {})
			}),
			menu.isOpen && /* @__PURE__ */ jsx("nav", {
				...menu.panelProps,
				className: "mobile-nav",
				"aria-label": "Mobile navigation",
				children: [
					...navigation.slice(0, -1),
					{
						label: "Appointment",
						href: "/#reservations"
					},
					navigation[navigation.length - 1]
				].map((item) => /* @__PURE__ */ jsxs("a", {
					href: item.href,
					onClick: menu.close,
					children: [item.label, /* @__PURE__ */ jsx(ArrowUpRight, { size: 18 })]
				}, item.href))
			})
		]
	});
}
// src/lib/cookie-consent.ts
var CONSENT_COOKIE = "cc_cookie";
var CONSENT_MAX_AGE_SECONDS = 15724800;
var CONSENT_EVENT = "cc:onConsent";
var CONSENT_CHANGE_EVENT = "cc:onChange";
var PREFERENCES_REQUESTED_EVENT = "horizons:cookie-preferences-requested";
/**
* Cookie categories the visitor chooses between. `Necessary` is always granted.
* The store's Google Analytics stores cookies only with `Analytics`, its Meta Pixel
* loads only with `Marketing`, and checkout lets Hostinger's own analytics
* (Amplitude) use cookies only with `PlatformAnalytics`. Gate any script you add
* the same way.
*/
var CookieConsentCategory = {
	Necessary: "necessary",
	Analytics: "analytics",
	Marketing: "marketing",
	PlatformAnalytics: "platformAnalytics"
};
/** The categories the visitor accepted, or `null` before they have chosen. Browser only. */
function getConsentCategories() {
	if (typeof document === "undefined") return null;
	const prefix = `${CONSENT_COOKIE}=`;
	const cookie = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
	try {
		const categories = cookie ? JSON.parse(decodeURIComponent(cookie.slice(prefix.length))).categories : null;
		return Array.isArray(categories) ? categories : null;
	} catch {
		return null;
	}
}
function hasConsentDecision() {
	return getConsentCategories() !== null;
}
function isConsentGranted(category) {
	return !!getConsentCategories()?.includes(category);
}
/** Stores the visitor's choice and tells the platform's tracking about it. */
function saveConsent({ analytics, marketing, platformAnalytics }) {
	const isFirstDecision = !hasConsentDecision();
	const categories = [
		CookieConsentCategory.Necessary,
		...analytics ? [CookieConsentCategory.Analytics] : [],
		...marketing ? [CookieConsentCategory.Marketing] : [],
		...platformAnalytics ? [CookieConsentCategory.PlatformAnalytics] : []
	];
	const value = encodeURIComponent(JSON.stringify({
		categories,
		consentTimestamp: (/* @__PURE__ */ new Date()).toISOString()
	}));
	document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/`;
	document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE_SECONDS}; path=/; SameSite=None; Secure; Partitioned`;
	window.dispatchEvent(new CustomEvent(isFirstDecision ? CONSENT_EVENT : CONSENT_CHANGE_EVENT, { detail: { categories } }));
}
function acceptAllCookies() {
	saveConsent({
		analytics: true,
		marketing: true,
		platformAnalytics: true
	});
}
function rejectOptionalCookies() {
	saveConsent({
		analytics: false,
		marketing: false,
		platformAnalytics: false
	});
}
/** Reopens the preferences for a "Cookie settings" link, typically in the footer. */
function openCookiePreferences() {
	window.dispatchEvent(new Event(PREFERENCES_REQUESTED_EVENT));
}
/** Lets the banner react to `openCookiePreferences`. Returns the unsubscribe function. */
function onCookiePreferencesRequested(callback) {
	window.addEventListener(PREFERENCES_REQUESTED_EVENT, callback);
	return () => window.removeEventListener(PREFERENCES_REQUESTED_EVENT, callback);
}
// src/components/site-footer.tsx
function SiteFooter() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "site-footer",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "footer-main",
			children: [
				/* @__PURE__ */ jsx(LuxrideBrand, {}),
				/* @__PURE__ */ jsx("p", { children: "Your Riviera journey starts with a conversation." }),
				/* @__PURE__ */ jsxs("div", {
					className: "footer-contact",
					children: [/* @__PURE__ */ jsxs("a", {
						href: "/#contact",
						className: "text-link",
						children: ["Let us plan your journey ", /* @__PURE__ */ jsx(ArrowUpRight, { size: 18 })]
					}), /* @__PURE__ */ jsxs("a", {
						className: "text-link footer-whatsapp",
						href: whatsappUrl({
							phone: WHATSAPP_NUMBER,
							text: WHATSAPP_DEFAULT_MESSAGE
						}),
						target: "_blank",
						rel: "noopener noreferrer",
						children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), " WhatsApp"]
					})]
				})
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "footer-bottom",
			children: [/* @__PURE__ */ jsx("span", { children: "© 2026 Luxury Chauffeur · FRENCH RIVIERA" }), /* @__PURE__ */ jsxs("nav", {
				"aria-label": "Footer links",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "/#services",
						children: "Services"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/#reservations",
						children: "Appointment"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/#vehicules",
						children: "Fleet"
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/#contact",
						children: "Contact"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: openCookiePreferences,
						children: "Cookie preferences"
					})
				]
			})]
		})]
	});
}
// src/hooks/use-cookie-banner.ts
var NO_OPTIONAL_COOKIES = {
	analytics: false,
	marketing: false,
	platformAnalytics: false
};
var grantedChoices = () => ({
	analytics: isConsentGranted(CookieConsentCategory.Analytics),
	marketing: isConsentGranted(CookieConsentCategory.Marketing),
	platformAnalytics: isConsentGranted(CookieConsentCategory.PlatformAnalytics)
});
/**
* Everything the site's cookie banner does, and nothing about how it looks:
* render whatever markup fits the site from these values.
*
* - `isOpen` is false on the server and during hydration, then true until the
*   visitor decides, so the banner never flashes for someone who already chose.
* - A footer "Cookie settings" link calling `openCookiePreferences()` from
*   `@/lib/cookie-consent` reopens it with `isCustomizing` true and the toggles
*   pre-filled from what the visitor granted before.
* - Toggles start unticked: never pre-tick an optional category.
*
*   const banner = useCookieBanner();
*   if (!banner.isOpen) return null;
*   // banner.acceptAll, banner.rejectOptional, banner.customize,
*   // banner.choices + banner.setChoice('analytics', checked), banner.saveChoices
*/
function useCookieBanner() {
	const [isOpen, setIsOpen] = useState(false);
	const [isCustomizing, setIsCustomizing] = useState(false);
	const [choices, setChoices] = useState(NO_OPTIONAL_COOKIES);
	useEffect(() => {
		setIsOpen(!hasConsentDecision());
		return onCookiePreferencesRequested(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
			setIsOpen(true);
		});
	}, []);
	const finish = useCallback((save) => {
		save();
		setIsCustomizing(false);
		setIsOpen(false);
	}, []);
	return {
		isOpen,
		isCustomizing,
		choices,
		setChoice: useCallback((category, isGranted) => {
			setChoices((current) => ({
				...current,
				[category]: isGranted
			}));
		}, []),
		customize: useCallback(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
		}, []),
		acceptAll: useCallback(() => finish(acceptAllCookies), [finish]),
		rejectOptional: useCallback(() => finish(rejectOptionalCookies), [finish]),
		saveChoices: useCallback(() => finish(() => saveConsent(choices)), [finish, choices])
	};
}
// src/components/cookie-banner.tsx
function CookieBanner() {
	const banner = useCookieBanner();
	if (!banner.isOpen) return null;
	return /* @__PURE__ */ jsxs("section", {
		className: "cookie-banner",
		role: "dialog",
		"aria-label": "Your cookie preferences",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Your visit, your choice." }), /* @__PURE__ */ jsx("p", { children: "Essential cookies keep this website working. Optional cookies are only used with your consent." })] }),
			banner.isCustomizing && /* @__PURE__ */ jsxs("fieldset", {
				className: "cookie-choices",
				children: [
					/* @__PURE__ */ jsx("legend", { children: "Optional cookies" }),
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: banner.choices.analytics,
						onChange: (e) => banner.setChoice("analytics", e.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: ["Website analytics", /* @__PURE__ */ jsx("small", { children: "Understand visits and improve your experience." })] })] }),
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: banner.choices.marketing,
						onChange: (e) => banner.setChoice("marketing", e.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: ["Marketing", /* @__PURE__ */ jsx("small", { children: "Measure and personalise advertising." })] })] }),
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: banner.choices.platformAnalytics,
						onChange: (e) => banner.setChoice("platformAnalytics", e.target.checked)
					}), /* @__PURE__ */ jsxs("span", { children: ["Platform analytics", /* @__PURE__ */ jsx("small", { children: "Allow Hostinger to improve its platform without directly identifying you." })] })] })
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "cookie-actions",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "button button-outline",
						onClick: banner.rejectOptional,
						children: "Reject optional"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "button button-outline",
						onClick: banner.isCustomizing ? banner.saveChoices : banner.customize,
						children: banner.isCustomizing ? "Save preferences" : "Customise"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "button button-blue",
						onClick: banner.acceptAll,
						children: "Accept all"
					})
				]
			})
		]
	});
}
// src/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	headers: () => headers,
	links: () => links,
	loader: () => loader$4
});
var links = () => [
	{
		rel: "stylesheet",
		href: src_default
	},
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "data:image/svg+xml," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="12" fill="#111d2b"/>
        <g fill="none" stroke="#e7bf73" stroke-width="5"
           stroke-linecap="square" stroke-linejoin="miter">
          <path d="M52 19C48 15 44 14 39 14C28 14 22 22 22 32C22 43 28 50 39 50C44 50 48 48 52 44"/>
          <path d="M16 17V46H34"/>
        </g>
      </svg>
    `)
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap"
	}
];
/**
* Publishes the site's public origin, which `seo()` reads to build canonical and
* `og:url` tags, and advertises the sitemap to crawlers that read response
* headers rather than HTML.
*
* A `meta` export can only reach server data through `matches`, and the `headers`
* export cannot see loader data at all, so both have to travel this way.
*/
function loader$4({ request }) {
	const origin = siteOrigin(request);
	return data({ origin }, { headers: { Link: `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"` } });
}
/**
* A page route that exports `headers` replaces this one, so merge `parentHeaders`
* there rather than returning only that route's own headers.
*/
function headers({ loaderHeaders }) {
	return loaderHeaders;
}
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {}),
			/* @__PURE__ */ jsx(HorizonsPreviewScripts, {})
		] }), /* @__PURE__ */ jsxs("body", {
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ jsx("div", {
					id: "root",
					children
				}),
				/* @__PURE__ */ jsx(CookieBanner, {}),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	const isHome = useLocation().pathname === "/";
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		!isHome && /* @__PURE__ */ jsx("a", {
			className: "skip-link",
			href: "#main-content",
			children: "Skip to content"
		}),
		!isHome && /* @__PURE__ */ jsx(SiteHeader, {}),
		/* @__PURE__ */ jsx(Outlet, {}),
		!isHome && /* @__PURE__ */ jsx(SiteFooter, {}),
		/* @__PURE__ */ jsxs("a", {
			className: "whatsapp-floating",
			href: whatsappUrl({
				phone: WHATSAPP_NUMBER,
				text: WHATSAPP_DEFAULT_MESSAGE
			}),
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "Contact us on WhatsApp — opens in a new tab",
			children: [/* @__PURE__ */ jsx(MessageCircle, {
				size: 25,
				"aria-hidden": "true"
			}), /* @__PURE__ */ jsx("span", { children: "WhatsApp" })]
		})
	] });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Something went wrong";
	let details = "Please try again in a few moments.";
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "This page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", { children: [
		/* @__PURE__ */ jsx("h1", { children: message }),
		/* @__PURE__ */ jsx("p", { children: details }),
		null
	] });
});
// src/lib/seo.ts
var ROOT_ROUTE_ID = "root";
/** The site's public origin, as published by the root loader. */
var siteOriginFrom = (matches) => {
	return (matches.find((match) => match?.id === ROOT_ROUTE_ID)?.loaderData)?.origin ?? "";
};
var absoluteUrl = (origin, target) => {
	if (/^https?:\/\//.test(target)) return target;
	return `${origin}${target.startsWith("/") ? target : `/${target}`}`;
};
function seo({ matches, location }, input) {
	const origin = siteOriginFrom(matches);
	const canonical = absoluteUrl(origin, input.path ?? location.pathname);
	const imageUrl = input.image ? absoluteUrl(origin, input.image) : "";
	const tags = [
		{ title: input.title },
		{
			name: "description",
			content: input.description
		},
		{
			property: "og:title",
			content: input.title
		},
		{
			property: "og:description",
			content: input.description
		},
		{
			property: "og:type",
			content: input.type ?? "website"
		},
		{
			name: "twitter:card",
			content: imageUrl ? "summary_large_image" : "summary"
		},
		{
			name: "twitter:title",
			content: input.title
		},
		{
			name: "twitter:description",
			content: input.description
		}
	];
	if (origin) tags.push({
		tagName: "link",
		rel: "canonical",
		href: canonical
	}, {
		property: "og:url",
		content: canonical
	});
	if (imageUrl) tags.push({
		property: "og:image",
		content: imageUrl
	}, {
		name: "twitter:image",
		content: imageUrl
	});
	if (input.noindex) tags.push({
		name: "robots",
		content: "noindex"
	});
	for (const block of [input.jsonLd ?? []].flat()) tags.push({ "script:ld+json": block });
	return tags;
}
// src/data/vehicles.ts
var vehicles = [
	{
		name: "Tesla Model Y",
		passengers: 4,
		luggage: 3,
		image: "https://n.sinaimg.cn/sinakd20240201ac/599/w1335h864/20240201/4e36-21f257cbcb0e144ace33e3f6f53972e6.jpg"
	},
	{
		name: "Mercedes E-Class",
		passengers: 3,
		luggage: 3,
		image: "https://majesticmilechauffeurs.co.uk/img/e_class.jpg"
	},
	{
		name: "Mercedes S-Class",
		passengers: 3,
		luggage: 3,
		image: "https://silkride.co.uk/images/sclassBackground.webp"
	},
	{
		name: "Hyundai Staria",
		passengers: 8,
		luggage: 10,
		image: "https://avatars.mds.yandex.net/get-autoru-vos/4298023/6e46abcc8824827447609b0760d0d211/1200x900"
	},
	{
		name: "Mercedes V-Class — Van",
		passengers: 7,
		luggage: 7,
		image: "https://octane.rent/wp-content/uploads/2024/02/mercedes-benz-v-class-xl-black-1.jpg"
	},
	{
		name: "Mercedes Sprinter Van VIP",
		passengers: 8,
		luggage: 8,
		image: "https://www.emirvipgrup.com/img/galeri/mercedes-sprinter-vip-turizm/mercedes-sprinter-turizm-vip-5.jpeg"
	},
	{
		name: "Range Rover",
		passengers: 4,
		luggage: 3,
		image: "https://www.exclusiveautomotivegroup.com/imagetag/3381/main/l/Used-2023-Land-Rover-Range-Rover-SE-1665673458.jpg"
	},
	{
		name: "Mercedes Sprinter Minibus",
		passengers: 20,
		luggage: 20,
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/CKRBus_Sprinter%2C_Busworld_Europe_2025%2C_Brussels_%2820251003-P1062566%29.jpg/960px-CKRBus_Sprinter%2C_Busworld_Europe_2025%2C_Brussels_%2820251003-P1062566%29.jpg"
	}
];
// src/components/home/hero.tsx
var BOOKING_EMAIL = "contact@luxury-chauffeur.com";
var markup = "\n<a class=\"skip\" href=\"#booking\">Skip to booking</a>\n<header class=\"header\"><div class=\"container header-inner\"><a class=\"brand\" href=\"/#accueil\" aria-label=\"Luxury Chauffeur home\"><span class=\"monogram\">LC</span><span class=\"brand-text\">LUXURY-CHAUFFEUR<span class=\"domain\">.com</span><small>PREMIUM CHAUFFEUR SERVICE</small></span></a><nav class=\"nav\" id=\"nav\" aria-label=\"Main navigation\"><a href=\"#booking\" id=\"transferLink\">Transfers</a><a href=\"#booking\" id=\"hourlyLink\">Hourly Service</a><a href=\"#fleet\">Our Fleet</a><a href=\"#destinations\">Destinations</a><a href=\"#contact\">Contact</a></nav><a class=\"book-top\" href=\"#booking\">Book Now <span aria-hidden=\"true\">↗</span></a><button class=\"menu\" id=\"menu\" aria-label=\"Open navigation\" aria-controls=\"nav\" aria-expanded=\"false\"><span></span><span></span><span></span></button></div></header>\n<main id=\"main-content\"><section class=\"hero\" id=\"accueil\"><div class=\"hero-shade\"></div><div class=\"container hero-content\"><div class=\"eyebrow\">PRIVATE CHAUFFEUR · FRENCH RIVIERA & ALPS</div><h1>Côte d’Azur <em>&</em> Alps</h1><p>NICE <span>·</span> MONACO <span>·</span> CANNES <span>·</span> SAINT-TROPEZ <span>·</span> COURCHEVEL</p><div class=\"hero-line\"></div></div></section>\n<span id=\"reservations\"></span><section class=\"booking-zone\" id=\"booking\"><div class=\"container\"><div class=\"booking-card\"><div class=\"tabs\" role=\"tablist\" aria-label=\"Service type\"><button id=\"transferTab\" class=\"tab active\" type=\"button\" role=\"tab\" aria-selected=\"true\">↗ &nbsp; Transfer</button><button id=\"hourlyTab\" class=\"tab\" type=\"button\" role=\"tab\" aria-selected=\"false\">◷ &nbsp; Hourly Service</button></div><form id=\"quoteForm\"><div class=\"fields\"><label class=\"field pickup\">Pickup Location<input id=\"pickup\" name=\"pickup\" list=\"locations\" placeholder=\"Address, airport, hotel...\" autocomplete=\"street-address\" required maxlength=\"180\"></label><button class=\"swap\" id=\"swap\" type=\"button\" aria-label=\"Swap pickup and drop-off\">⇄</button><label class=\"field drop\" id=\"dropField\">Drop-off Location<input id=\"dropoff\" name=\"dropoff\" list=\"locations\" placeholder=\"Address, city, resort...\" required maxlength=\"180\"></label><label class=\"field duration\" id=\"durationField\" hidden>Duration<select id=\"duration\" name=\"duration\"><option value=\"4\">4 hours</option><option value=\"6\">6 hours</option><option value=\"8\">8 hours</option><option value=\"10\">10 hours</option><option value=\"12\">12 hours</option></select></label><label class=\"field date-field\">Date<input id=\"date\" name=\"date\" type=\"date\" required></label><label class=\"field time-field\">Time<input id=\"time\" name=\"time\" type=\"time\" required></label><label class=\"field pax-field\">Passengers<select id=\"pax\" name=\"passengers\"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select></label><button class=\"primary getquote\" type=\"submit\">Get a Quote <span>→</span></button></div><datalist id=\"locations\"><option value=\"Nice Côte d’Azur Airport (NCE)\"><option value=\"Nice\"><option value=\"Monaco\"><option value=\"Cannes\"><option value=\"Saint-Tropez\"><option value=\"Geneva Airport (GVA)\"><option value=\"Lyon Airport (LYS)\"><option value=\"Grenoble Airport (GNB)\"><option value=\"Chambéry Airport (CMF)\"><option value=\"Courchevel\"><option value=\"Méribel\"><option value=\"Val Thorens\"><option value=\"Val d’Isère\"><option value=\"Megève\"></datalist><p class=\"form-note\">Request a personalised quote · All journeys subject to confirmation</p><div id=\"formError\" class=\"error\" role=\"alert\" hidden></div></form></div>\n<div class=\"benefits\" id=\"services\"><div><span>◇</span><strong>Premium Vehicles</strong><small>Comfort & elegance</small></div><div><span>♢</span><strong>Professional Drivers</strong><small>Discreet & multilingual</small></div><div><span>✈</span><strong>Airport Transfers</strong><small>Meet & greet service</small></div><div><span>❄</span><strong>Alps Transfers</strong><small>Winter-ready fleet</small></div></div></div></section>\n<span id=\"vehicules\"></span><section class=\"section fleet\" id=\"fleet\"><div class=\"container\"><div class=\"section-title\"><span>TRAVEL IN STYLE</span><h2>Our Premium Fleet</h2><p>Choose your perfect Mercedes experience.</p></div><div class=\"fleet-grid\"><article class=\"fleet-card\"><img src=\"data:image/jpeg;base64,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\" alt=\"Illustrative black executive Mercedes E-Class\" loading=\"lazy\" width=\"800\" height=\"520\"><div class=\"fleet-info\"><h3>Mercedes E-Class</h3><p>Executive comfort</p><div>♙ &nbsp; Up to 3 passengers <span>▣ &nbsp; 2–3 bags</span></div><button type=\"button\" class=\"choose\" data-vehicle=\"E\">Choose E-Class ↗</button></div></article><article class=\"fleet-card featured\"><span class=\"popular\">MOST POPULAR</span><img src=\"data:image/jpeg;base64,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\" alt=\"Illustrative black Mercedes V-Class luxury van\" loading=\"lazy\" width=\"800\" height=\"520\"><div class=\"fleet-info\"><h3>Mercedes V-Class</h3><p>Spacious luxury</p><div>♙ &nbsp; Up to 7 passengers <span>▣ &nbsp; Luggage on request</span></div><button type=\"button\" class=\"choose\" data-vehicle=\"V\">Choose V-Class ↗</button></div></article><article class=\"fleet-card\"><img src=\"data:image/jpeg;base64,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\" alt=\"Illustrative black Mercedes S-Class luxury sedan\" loading=\"lazy\" width=\"800\" height=\"520\"><div class=\"fleet-info\"><h3>Mercedes S-Class</h3><p>First-class travel</p><div>♙ &nbsp; Up to 3 passengers <span>▣ &nbsp; 2–3 bags</span></div><button type=\"button\" class=\"choose\" data-vehicle=\"S\">Choose S-Class ↗</button></div></article></div></div></section>\n<span id=\"galerie\"></span><section class=\"section destinations\" id=\"destinations\"><div class=\"container\"><div class=\"section-title\"><span>ICONIC DESTINATIONS</span><h2>Where can we take you?</h2></div><div class=\"destination-grid\"><button data-destination=\"Nice\">Nice <span>↗</span></button><button data-destination=\"Monaco\">Monaco <span>↗</span></button><button data-destination=\"Cannes\">Cannes <span>↗</span></button><button data-destination=\"Saint-Tropez\">Saint-Tropez <span>↗</span></button><button data-destination=\"Courchevel\">Courchevel <span>↗</span></button></div></div></section>\n<section class=\"cta\" id=\"contact\"><div class=\"container cta-inner\"><div><span class=\"eyebrow\">YOUR JOURNEY STARTS HERE</span><h2>Arrive exceptionally.</h2><p>Private transfers, airport arrivals and bespoke chauffeur service.</p></div><a class=\"primary\" href=\"#booking\">Request Your Transfer →</a></div></section></main>\n<footer><div class=\"container footer-inner\"><span>© <span id=\"year\"></span> Luxury-Chauffeur.com</span><span>Premium private chauffeur service · France</span><a href=\"/monaco\">Monaco</a><a href=\"/cannes\">Cannes</a><a href=\"#privacy\" data-open-privacy=\"true\">Privacy & Legal</a></div><p class=\"disclaimer container\">Vehicle images are AI-generated illustrations, not photographs of the actual fleet. Vehicle model, capacity, availability and final fare must be confirmed before booking.</p></footer>\n<dialog id=\"quoteDialog\" aria-labelledby=\"quoteTitle\"><div class=\"dialog-content\"><button class=\"close\" id=\"closeDialog\" type=\"button\" aria-label=\"Close\">×</button><span class=\"eyebrow\">YOUR PRIVATE TRANSFER</span><h2 id=\"quoteTitle\">Your Quote</h2><p id=\"quoteSummary\"></p><div id=\"priceBox\" class=\"pricebox\"></div><form id=\"requestForm\"><input name=\"company_website\" id=\"companyWebsite\" tabindex=\"-1\" autocomplete=\"off\" aria-hidden=\"true\" style=\"position:absolute;left:-10000px;width:1px;height:1px\"><label>Your name<input id=\"customerName\" autocomplete=\"name\" required maxlength=\"100\" placeholder=\"Full name\"></label><label>Email address<input id=\"customerEmail\" type=\"email\" autocomplete=\"email\" required placeholder=\"name@example.com\"></label><label>Phone / WhatsApp<input id=\"customerPhone\" type=\"tel\" autocomplete=\"tel\" placeholder=\"+44 ...\"></label><label>Special requests (optional)<textarea id=\"notes\" rows=\"2\" maxlength=\"800\" placeholder=\"Flight number, luggage, child seats...\"></textarea></label><label class=\"check\"><input id=\"consent\" type=\"checkbox\" required> I agree to send my details through FormSubmit to request a quote. See <a href=\"#privacy\" data-open-privacy=\"true\" target=\"_blank\">privacy notice</a>.</label><div class=\"dialog-actions\"><button class=\"primary\" id=\"sendRequest\" type=\"submit\">Send Booking Request →</button><button class=\"secondary\" id=\"copyRequest\" type=\"button\">Copy Details</button></div><p class=\"request-hint\" id=\"requestHint\" role=\"status\">Your request will be sent to our team. Your booking is confirmed separately.</p></form></div></dialog>\n<dialog id=\"privacyDialog\" aria-labelledby=\"privacyTitle\"><div class=\"dialog-content\"><button id=\"closePrivacy\" class=\"close\" type=\"button\" aria-label=\"Close privacy notice\">×</button><h1 id=\"privacyTitle\">Privacy & Legal Information</h1><p><strong>Important:</strong> This page is a publication template and must be completed with the business owner's verified legal details before the website goes live.</p><h2>Website operator</h2><p>Legal business name: [ADD LEGAL BUSINESS NAME]<br>Registered address: [ADD REGISTERED ADDRESS]<br>Company registration number: [ADD NUMBER]<br>Contact email: [ADD CONTACT EMAIL]<br>Hosting provider: [ADD HOST DETAILS]</p><h2>Quote requests</h2><p>When you request a quotation, your name, email address, phone number (if provided), itinerary and any special requests are transmitted to FormSubmit (formsubmit.co), a third-party form delivery service, to forward your request to our team by email. This version does not save requests in the website database. FormSubmit and our email provider process your request for delivery. Please do not include sensitive personal information unless necessary.</p><h2>Use of data</h2><p>Quote request details are intended only to answer your enquiry, arrange a chauffeur service and manage the related customer relationship. The operator must publish applicable retention periods, legal bases and contact details for exercising privacy rights before going live.</p><h2>Cookies and analytics</h2><p>This version does not intentionally set advertising or analytics cookies. If analytics, maps, payments or other third-party services are added, this notice and any required consent mechanism must be updated.</p><h2>Illustrations</h2><p>Vehicle photographs on this website are AI-generated illustrations and may differ from the vehicles supplied for your journey.</p><p></p></div></dialog>";
var DEFAULT_VEHICLE = "Mercedes V-Class — Van";
function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[character]);
}
function buildFleetMarkup() {
	return `
    <section class="section fleet" id="fleet">
      <div class="container">
        <div class="section-title">
          <span>TRAVEL IN STYLE</span>
          <h2>Our Premium Fleet</h2>
          <p>Choose the vehicle that suits your journey.</p>
        </div>

        <div class="fleet-grid">
          ${vehicles.map((vehicle) => `
                <article class="fleet-card">
                  <img
                    src="${escapeHtml(vehicle.image)}"
                    alt="${escapeHtml(vehicle.name)}"
                    loading="lazy"
                    width="800"
                    height="520"
                  >

                  <div class="fleet-image-fallback" hidden>
                    Photo coming soon
                  </div>

                  <div class="fleet-info">
                    <h3>${escapeHtml(vehicle.name)}</h3>
                    <p>Private chauffeur service</p>

                    <div>
                      <span>
                        Up to ${vehicle.passengers} passengers
                      </span>
                      <span>${vehicle.luggage} bags</span>
                    </div>

                    <button
                      type="button"
                      class="choose"
                      data-vehicle="${escapeHtml(vehicle.name)}"
                    >
                      Choose this vehicle ↗
                    </button>
                  </div>
                </article>
              `).join("")}
        </div>

        <p class="fleet-capacity-note">
          Photos and capacities are indicative. Availability,
          vehicle configuration and luggage space are confirmed
          before booking.
          <br>
Minibus photo:
<a
  href="https://commons.wikimedia.org/wiki/File:CKRBus_Sprinter,_Busworld_Europe_2025,_Brussels_(20251003-P1062566).jpg"
  target="_blank"
  rel="noopener noreferrer"
>
  Matti Blume
</a>
·
<a
  href="https://creativecommons.org/licenses/by-sa/4.0/"
  target="_blank"
  rel="noopener noreferrer"
>
  CC BY-SA 4.0
</a>
· Image cropped to fit.
        </p>
      </div>
    </section>
  `;
}
var destinationPaths = {
	Nice: "/nice",
	Monaco: "/monaco",
	Cannes: "/cannes",
	"Saint-Tropez": "/saint-tropez",
	Courchevel: "/courchevel"
};
var pageMarkup = markup.replace(/<button data-destination="([^"]+)">([\s\S]*?)<\/button>/g, (_, name, content) => "<a href=\"" + destinationPaths[name] + "\">" + content + "</a>").replace(/<section class="section fleet" id="fleet">[\s\S]*?<\/section>/, buildFleetMarkup()).replace(/(<select id="pax" name="passengers">)[\s\S]*?<\/select>/, (_, opening) => opening + Array.from({ length: 20 }, (_, index) => `<option value="${index + 1}">${index + 1}</option>`).join("") + "</select>");
function installPhotonAutocomplete(root) {
	const doc = root.ownerDocument;
	const cache = /* @__PURE__ */ new Map();
	const events = new AbortController();
	const restorers = [];
	let timer;
	let activeRequest;
	let version = 0;
	let disposed = false;
	const hint = doc.createElement("p");
	hint.className = "photon-hint";
	const osmLink = doc.createElement("a");
	osmLink.href = "https://www.openstreetmap.org/copyright";
	osmLink.textContent = "© OpenStreetMap contributors";
	osmLink.target = "_blank";
	osmLink.rel = "noopener noreferrer";
	hint.append(osmLink);
	root.querySelector("footer .footer-inner")?.append(hint);
	const stop = () => {
		version += 1;
		clearTimeout(timer);
		activeRequest?.abort();
	};
	for (const id of ["pickup", "dropoff"]) {
		const input = root.querySelector("#" + id);
		if (!input) continue;
		const originalList = input.getAttribute("list");
		const originalAutocomplete = input.getAttribute("autocomplete");
		const source = originalList ? doc.getElementById(originalList) : null;
		const presets = source ? Array.from(source.querySelectorAll("option"), (option) => option.value) : [];
		const list = doc.createElement("datalist");
		list.id = id + "-photon-locations";
		input.after(list);
		input.setAttribute("list", list.id);
		input.setAttribute("autocomplete", "off");
		const render = (labels) => {
			list.replaceChildren();
			const values = Array.from(/* @__PURE__ */ new Set([...labels, ...presets]));
			for (const label of values) {
				const option = doc.createElement("option");
				option.value = label;
				list.append(option);
			}
		};
		render([]);
		const search = () => {
			stop();
			const query = input.value.trim();
			const currentVersion = version;
			if (query.length < 3) {
				render([]);
				return;
			}
			if (Array.from(list.options).some((option) => option.value === query)) return;
			const key = query.toLowerCase();
			const cached = cache.get(key);
			if (cached) {
				render(cached);
				return;
			}
			timer = setTimeout(async () => {
				const request = new AbortController();
				activeRequest = request;
				const timeout = setTimeout(() => request.abort(), 8e3);
				try {
					const url = new URL("https://photon.komoot.io/api/");
					url.searchParams.set("q", query);
					url.searchParams.set("limit", "6");
					url.searchParams.set("lang", "en");
					url.searchParams.set("lat", "43.7");
					url.searchParams.set("lon", "7.26");
					const response = await fetch(url, {
						signal: request.signal,
						credentials: "omit"
					});
					if (!response.ok) throw new Error("Location search unavailable");
					const labels = ((await response.json()).features ?? []).map((feature) => {
						const p = feature.properties ?? {};
						const street = [p.housenumber, p.street].filter(Boolean).join(" ");
						const city = p.city || p.town || p.village || p.county;
						const parts = [
							p.name,
							street,
							city,
							p.country
						].filter((value) => Boolean(value?.trim()));
						return Array.from(new Set(parts)).join(", ");
					}).filter(Boolean);
					if (disposed || currentVersion !== version || input.value.trim() !== query) return;
					cache.set(key, labels);
					if (cache.size > 40) {
						const oldest = cache.keys().next().value;
						if (oldest !== void 0) cache.delete(oldest);
					}
					render(labels);
				} catch {
					if (!disposed && currentVersion === version) render([]);
				} finally {
					clearTimeout(timeout);
					if (activeRequest === request) activeRequest = void 0;
				}
			}, 600);
		};
		input.addEventListener("input", search, { signal: events.signal });
		input.addEventListener("blur", stop, { signal: events.signal });
		restorers.push(() => {
			if (originalList === null) input.removeAttribute("list");
			else input.setAttribute("list", originalList);
			if (originalAutocomplete === null) input.removeAttribute("autocomplete");
			else input.setAttribute("autocomplete", originalAutocomplete);
			list.remove();
		});
	}
	return () => {
		disposed = true;
		stop();
		events.abort();
		restorers.forEach((restore) => restore());
		hint.remove();
	};
}
function initializeLuxuryHome(root, sendBooking) {
	const cleanup = [];
	cleanup.push(installPhotonAutocomplete(root));
	const listen = (element, event, handler) => {
		element.addEventListener(event, handler);
		cleanup.push(() => element.removeEventListener(event, handler));
	};
	const document = {
		getElementById: (id) => root.querySelector("#" + id),
		querySelector: (selector) => root.querySelector(selector),
		querySelectorAll: (selector) => root.querySelectorAll(selector),
		createElement: (tag) => window.document.createElement(tag),
		body: root,
		execCommand: (command) => window.document.execCommand(command)
	};
	const $ = (id) => document.getElementById(id);
	let mode = "transfer", preferred = DEFAULT_VEHICLE;
	const requestedDestination = new URLSearchParams(window.location.search).get("destination");
	if (requestedDestination && requestedDestination.length <= 180) $("dropoff").value = requestedDestination;
	let lastQuote = null;
	root.querySelector(".form-note")?.remove();
	$("year").textContent = String((/* @__PURE__ */ new Date()).getFullYear());
	const today = /* @__PURE__ */ new Date();
	const local = (/* @__PURE__ */ new Date(today.getTime() - today.getTimezoneOffset() * 6e4)).toISOString().slice(0, 10);
	$("date").min = local;
	root.querySelectorAll(".choose").forEach((button) => {
		button.classList.toggle("selected", button.dataset.vehicle === preferred);
	});
	root.querySelectorAll(".fleet-card img").forEach((image) => {
		const showFallback = () => {
			image.hidden = true;
			const fallback = image.nextElementSibling;
			if (fallback) fallback.hidden = false;
		};
		listen(image, "error", showFallback);
		if (image.complete && image.naturalWidth === 0) showFallback();
	});
	const nav = $("nav");
	listen($("menu"), "click", () => {
		const open = nav.classList.toggle("open");
		$("menu").setAttribute("aria-expanded", String(open));
	});
	nav.querySelectorAll("a").forEach((a) => listen(a, "click", () => {
		nav.classList.remove("open");
		$("menu").setAttribute("aria-expanded", "false");
	}));
	listen($("transferLink"), "click", () => setMode("transfer"));
	function setMode(m) {
		mode = m;
		const hourly = m === "hourly";
		$("transferTab").classList.toggle("active", !hourly);
		$("hourlyTab").classList.toggle("active", hourly);
		$("transferTab").setAttribute("aria-selected", String(!hourly));
		$("hourlyTab").setAttribute("aria-selected", String(hourly));
		$("dropField").hidden = hourly;
		$("durationField").hidden = !hourly;
		$("swap").hidden = hourly;
		$("dropoff").required = !hourly;
		$("formError").hidden = true;
	}
	$("transferTab").onclick = () => setMode("transfer");
	$("hourlyTab").onclick = () => setMode("hourly");
	listen($("hourlyLink"), "click", () => setMode("hourly"));
	$("swap").onclick = () => {
		const a = $("pickup").value;
		$("pickup").value = $("dropoff").value;
		$("dropoff").value = a;
	};
	function showError(message) {
		$("formError").textContent = message;
		$("formError").hidden = false;
	}
	listen($("quoteForm"), "submit", (e) => {
		e.preventDefault();
		$("formError").hidden = true;
		const pickup = $("pickup").value.trim(), dropoff = $("dropoff").value.trim(), date = $("date").value, time = $("time").value, pax = Number($("pax").value);
		if (!pickup || mode === "transfer" && !dropoff || !date || !time) {
			showError("Please complete pickup, destination (if applicable), date and time.");
			return;
		}
		if (!Number.isFinite((/* @__PURE__ */ new Date(date + "T" + time)).getTime()) || (/* @__PURE__ */ new Date(date + "T" + time)).getTime() <= Date.now()) {
			showError("Please choose a future date and time.");
			return;
		}
		lastQuote = {
			mode,
			pickup,
			dropoff,
			date,
			time,
			pax,
			vehicle: preferred,
			duration: $("duration").value,
			amount: null
		};
		$("quoteSummary").textContent = mode === "transfer" ? `${pickup} → ${dropoff} · ${date} at ${time} · ${pax} passenger${pax === 1 ? "" : "s"}` : `${pickup} · ${$("duration").value} hours · ${date} at ${time} · ${pax} passenger${pax === 1 ? "" : "s"}`;
		$("priceBox").textContent = `Custom quotation required · ${preferred}`;
		if (pax > (vehicles.find((vehicle) => vehicle.name === preferred)?.passengers ?? 0)) $("priceBox").textContent = preferred + ": your group exceeds this vehicle’s listed capacity. Please choose a larger vehicle or request multiple vehicles.";
		$("requestHint").textContent = "Your request will be sent to our team. Your booking is confirmed separately.";
		$("sendRequest").disabled = false;
		$("sendRequest").textContent = "Send Booking Request →";
		$("quoteDialog").showModal();
	});
	$("closeDialog").onclick = () => $("quoteDialog").close();
	listen($("quoteDialog"), "click", (e) => {
		if (e.target === $("quoteDialog")) $("quoteDialog").close();
	});
	function requestText() {
		if (!lastQuote) return "";
		const q = lastQuote;
		return `Luxury Chauffeur — Quote Request\n\nService: ${q.mode === "transfer" ? "Transfer" : "Hourly service"}\nPickup: ${q.pickup}\n${q.mode === "transfer" ? `Drop-off: ${q.dropoff}\n` : `Duration: ${q.duration} hours\n`}Date: ${q.date}\nTime: ${q.time}\nPassengers: ${q.pax}\nPreferred vehicle: ${q.vehicle}\n${q.amount === null ? "Price: Custom quote requested" : `Indicative price: €${q.amount} (subject to confirmation)`}\n\nName: ${$("customerName").value.trim()}\nEmail: ${$("customerEmail").value.trim()}\nPhone: ${$("customerPhone").value.trim()}\nNotes: ${$("notes").value.trim()}\n\nPlease confirm availability and final price.`;
	}
	listen($("requestForm"), "submit", async (e) => {
		e.preventDefault();
		if (!$("requestForm").reportValidity() || !lastQuote || $("sendRequest").disabled) return;
		if ($("companyWebsite").value) {
			$("requestHint").textContent = "Please leave the hidden field empty.";
			return;
		}
		const button = $("sendRequest");
		button.disabled = true;
		button.textContent = "Sending…";
		try {
			await sendBooking({
				mode: lastQuote.mode,
				pickup: lastQuote.pickup,
				dropoff: lastQuote.dropoff,
				date: lastQuote.date,
				time: lastQuote.time,
				passengers: lastQuote.pax,
				vehicle: lastQuote.vehicle,
				duration: Number(lastQuote.duration),
				timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
				requestedAt: (/* @__PURE__ */ new Date(lastQuote.date + "T" + lastQuote.time)).toISOString(),
				name: $("customerName").value.trim(),
				email: $("customerEmail").value.trim(),
				phone: $("customerPhone").value.trim(),
				notes: $("notes").value.trim(),
				consent: $("consent").checked,
				company_website: $("companyWebsite").value
			});
			$("requestHint").textContent = "Your request has been submitted. Our team will contact you to confirm availability and price.";
			button.textContent = "Request received";
		} catch {
			$("requestHint").textContent = "Your request could not be submitted. Please try again or contact our team.";
			button.disabled = false;
			button.textContent = "Send Booking Request →";
		}
	});
	$("copyRequest").onclick = async () => {
		if (!lastQuote) return;
		const t = requestText();
		try {
			await navigator.clipboard.writeText(t);
			$("requestHint").textContent = "Quote details copied.";
		} catch {
			const el = document.createElement("textarea");
			el.value = t;
			document.body.append(el);
			el.select();
			document.execCommand("copy");
			el.remove();
			$("requestHint").textContent = "Quote details copied (if your browser allows copying).";
		}
	};
	document.querySelectorAll(".choose").forEach((b) => listen(b, "click", () => {
		preferred = b.dataset.vehicle || DEFAULT_VEHICLE;
		document.querySelectorAll(".choose").forEach((x) => x.classList.toggle("selected", x === b));
		document.querySelector("#booking").scrollIntoView({ behavior: "smooth" });
		$("pickup").focus({ preventScroll: true });
	}));
	document.querySelectorAll("[data-destination]").forEach((b) => listen(b, "click", () => {
		$("dropoff").value = b.dataset.destination || "";
		setMode("transfer");
		$("booking").scrollIntoView({ behavior: "smooth" });
		$("pickup").focus({ preventScroll: true });
	}));
	document.querySelectorAll("[data-open-privacy]").forEach((link) => listen(link, "click", (event) => {
		event.preventDefault();
		$("privacyDialog").showModal();
	}));
	listen($("closePrivacy"), "click", () => $("privacyDialog").close());
	return () => {
		cleanup.forEach((dispose) => dispose());
		[
			"transferTab",
			"hourlyTab",
			"swap",
			"closeDialog",
			"copyRequest"
		].forEach((id) => {
			$(id).onclick = null;
		});
	};
}
function Hero() {
	const root = useRef(null);
	useEffect(() => {
		if (!root.current) return;
		return initializeLuxuryHome(root.current, async (payload) => {
			const email = BOOKING_EMAIL.trim();
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Reservation email is not configured.");
			const response = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(email), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					...payload,
					_subject: "Luxury Chauffeur — Booking request",
					_template: "table",
					_url: window.location.href,
					_honey: String(payload.company_website || "")
				})
			});
			const result = await response.json();
			if (!response.ok || !(result.success === true || result.success === "true")) throw new Error("The request could not be submitted.");
		});
	}, []);
	return /* @__PURE__ */ jsx("div", {
		className: "luxury-home",
		ref: root,
		dangerouslySetInnerHTML: { __html: pageMarkup }
	});
}
// src/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$1
});
function meta$1({ matches, location }) {
	return seo({
		matches,
		location
	}, {
		title: "Luxury Chauffeur | Private Transfers on the French Riviera & Alps",
		description: "Luxury chauffeur transfers in Nice, Monaco, Cannes, Saint-Tropez and Courchevel. Premium Mercedes fleet, airport transfers and private chauffeur service. Request a quote.",
		jsonLd: [{
			"@context": "https://schema.org",
			"@type": "WebSite",
			name: "Luxury Chauffeur",
			inLanguage: "en"
		}]
	});
}
var home_default = UNSAFE_withComponentProps(function HomePage() {
	return /* @__PURE__ */ jsx(Hero, {});
});
var photos = [
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/e268b586-0f7c-4444-b1ea-a7a6a05d59dd.png",
		title: "The spirit of the Riviera",
		caption: "Nice, between city and Mediterranean",
		width: 1216,
		height: 912
	},
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/211c5f7f-4c85-4476-aaa2-a14215cfac97.png",
		title: "Blue horizons",
		caption: "Scenery of the French Riviera",
		width: 1472,
		height: 640
	},
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/aef3617c-5470-418b-88eb-bea30d7aff72.png",
		title: "Along the coast",
		caption: "A coastal road overlooking the sea",
		width: 1216,
		height: 912
	}
];
// src/data/cannes.ts
var cannesPhotos = [
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/998a4de4-a59f-4489-8a1a-f966003f4874.png",
		title: "La Croisette",
		caption: "The waterfront promenade and its grand hotels.",
		width: 896,
		height: 1152
	},
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/9139bacd-db45-4fbf-969f-1d092e904552.png",
		title: "The Palais des Festivals",
		caption: "The setting for major film and business events.",
		width: 896,
		height: 1152
	},
	{
		src: "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/7d3e424f-4fcb-47c8-b069-0f1073c68498.png",
		title: "Le Suquet",
		caption: "Historic Cannes overlooking the bay.",
		width: 896,
		height: 1152
	}
];
// src/hooks/use-carousel.ts
var wrapIndex = (index, count, loop) => {
	if (count <= 0) return 0;
	if (loop) return (index % count + count) % count;
	return Math.min(Math.max(index, 0), count - 1);
};
/**
* Index state for a slider, testimonial rotator or hero slideshow whose markup
* and transitions the site designs itself. For a swipeable track, the template
* also ships `embla-carousel-react`.
*
*   const carousel = useCarousel({ count: slides.length, autoplayMs: 6000 });
*   <section {...carousel.regionProps} aria-label="Testimonials">
*     {slides.map((slide, i) => <article key={slide.id} hidden={i !== carousel.index}>…</article>)}
*     <button type="button" onClick={carousel.prev} aria-label="Previous">…</button>
*   </section>
*
* The region pauses autoplay on hover and focus and moves with the arrow keys.
*/
function useCarousel({ count, autoplayMs, loop = true }) {
	const [index, setIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const goTo = useCallback((next) => setIndex(wrapIndex(next, count, loop)), [count, loop]);
	const next = useCallback(() => setIndex((current) => wrapIndex(current + 1, count, loop)), [count, loop]);
	const prev = useCallback(() => setIndex((current) => wrapIndex(current - 1, count, loop)), [count, loop]);
	const pause = useCallback(() => setIsPaused(true), []);
	const resume = useCallback(() => setIsPaused(false), []);
	useEffect(() => {
		setIndex((current) => wrapIndex(current, count, false));
	}, [count]);
	useEffect(() => {
		if (!autoplayMs || isPaused || count < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const timer = window.setInterval(() => {
			if (document.visibilityState === "visible") setIndex((current) => wrapIndex(current + 1, count, true));
		}, autoplayMs);
		return () => window.clearInterval(timer);
	}, [
		autoplayMs,
		isPaused,
		count
	]);
	const onKeyDown = useCallback((event) => {
		if (event.key === "ArrowRight") {
			event.preventDefault();
			next();
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			prev();
		}
	}, [next, prev]);
	return {
		index,
		count,
		next,
		prev,
		goTo,
		isFirst: index === 0,
		isLast: index === count - 1,
		isPaused,
		pause,
		resume,
		regionProps: {
			onMouseEnter: pause,
			onMouseLeave: resume,
			onFocus: pause,
			onBlur: resume,
			onKeyDown,
			"aria-roledescription": "carousel"
		}
	};
}
// src/components/cannes/gallery.tsx
function CannesGallery() {
	const dialog = useRef(null);
	const carousel = useCarousel({ count: cannesPhotos.length });
	const current = cannesPhotos[carousel.index];
	return /* @__PURE__ */ jsxs("section", {
		id: "galerie",
		className: "gallery section-rail",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "section-heading",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "eyebrow",
					children: "02 / CANNES IN PICTURES"
				}), /* @__PURE__ */ jsxs("h2", { children: ["A few moments ", /* @__PURE__ */ jsx("em", { children: "in Cannes." })] })] }), /* @__PURE__ */ jsx("p", { children: "La Croisette, the Palais des Festivals and Le Suquet. Discover the city before your next transfer." })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "gallery-grid",
				children: cannesPhotos.map((photo, index) => /* @__PURE__ */ jsxs("figure", { children: [/* @__PURE__ */ jsxs("button", {
					onClick: () => {
						carousel.goTo(index);
						dialog.current?.showModal();
					},
					className: "gallery-photo",
					"aria-label": `Enlarge: ${photo.title}`,
					children: [/* @__PURE__ */ jsx("img", {
						src: photo.src,
						srcSet: `${photo.src}?width=375 375w, ${photo.src}?width=768 768w, ${photo.src} ${photo.width}w`,
						sizes: "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 90vw",
						width: photo.width,
						height: photo.height,
						loading: "lazy",
						alt: photo.caption
					}), /* @__PURE__ */ jsx("span", {
						className: "expand-icon",
						children: /* @__PURE__ */ jsx(Expand, { size: 18 })
					})]
				}), /* @__PURE__ */ jsxs("figcaption", { children: [/* @__PURE__ */ jsxs("span", { children: ["0", index + 1] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", { children: photo.title }), /* @__PURE__ */ jsx("p", { children: photo.caption })] })] })] }, photo.src))
			}),
			/* @__PURE__ */ jsx("p", {
				className: "gallery-note",
				children: "Cannes scenery · illustrative images"
			}),
			/* @__PURE__ */ jsx("dialog", {
				ref: dialog,
				className: "gallery-dialog",
				onClick: (event) => {
					if (event.target === event.currentTarget) dialog.current?.close();
				},
				children: /* @__PURE__ */ jsxs("div", {
					...carousel.regionProps,
					"aria-label": "Cannes gallery",
					children: [
						/* @__PURE__ */ jsx("button", {
							className: "gallery-close icon-button",
							onClick: () => dialog.current?.close(),
							"aria-label": "Close gallery",
							children: /* @__PURE__ */ jsx(X, {})
						}),
						/* @__PURE__ */ jsx("img", {
							src: current.src,
							width: current.width,
							height: current.height,
							alt: current.caption
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "lightbox-controls",
							children: [
								/* @__PURE__ */ jsx("button", {
									className: "icon-button",
									onClick: carousel.prev,
									"aria-label": "Previous photo",
									children: /* @__PURE__ */ jsx(ArrowLeft, {})
								}),
								/* @__PURE__ */ jsxs("p", { children: [
									current.title,
									" ",
									/* @__PURE__ */ jsxs("span", { children: [
										carousel.index + 1,
										" / ",
										cannesPhotos.length
									] })
								] }),
								/* @__PURE__ */ jsx("button", {
									className: "icon-button",
									onClick: carousel.next,
									"aria-label": "Next photo",
									children: /* @__PURE__ */ jsx(ArrowRight, {})
								})
							]
						})
					]
				})
			})
		]
	});
}
// src/hooks/use-form-submission.ts
/** Name of the hidden field bots fill in and people never see. */
var HONEYPOT_FIELD = "company_website";
var toValues = (formData) => {
	const values = {};
	for (const key of new Set(formData.keys())) {
		const entries = formData.getAll(key);
		values[key] = entries.length > 1 ? entries : entries[0];
	}
	return values;
};
var isRecord = (value) => typeof value === "object" && value !== null;
/** PocketBase answers a failed create with `response.data[field].message`. */
var fieldErrorsFrom = (error) => {
	const data = isRecord(error) && isRecord(error.response) ? error.response.data : null;
	if (!isRecord(data)) return {};
	return Object.fromEntries(Object.entries(data).filter((entry) => isRecord(entry[1]) && typeof entry[1].message === "string").map(([field, detail]) => [field, detail.message]));
};
/** 0 when the request never reached a server (offline, blocked). */
var statusFrom = (error) => isRecord(error) && typeof error.status === "number" ? error.status : 0;
var HONEYPOT_STYLE = {
	position: "absolute",
	left: "-10000px",
	width: "1px",
	height: "1px",
	overflow: "hidden"
};
/**
* Submit logic for any form — contact, quote, booking request, newsletter,
* RSVP. It owns sending, status and errors; the site owns every field, label,
* message and the layout.
*
*   // the public write-only collection the pocketbase skill describes
*   const form = useFormSubmission({ submit: (_values, data) => pb.collection('enquiries').create(data) });
*
*   <form onSubmit={form.onSubmit}>
*     <input {...form.honeypotProps} />
*     <input name="email" type="email" required aria-invalid={Boolean(form.fieldErrors.email)} />
*     {form.fieldErrors.email && <p>{form.fieldErrors.email}</p>}
*     <button disabled={form.isSubmitting}>…</button>
*     {form.isSuccess && <p>…thank-you copy in the site's language…</p>}
*   </form>
*
* A filled honeypot ends silently in `success` without sending anything.
* `errorStatus` (429 rate limited, 0 offline, …) lets the error copy say what to
* do next; write that copy yourself, in the site's language.
*/
function useFormSubmission({ submit, resetOnSuccess = true }) {
	const [status, setStatus] = useState("idle");
	const [fieldErrors, setFieldErrors] = useState({});
	const [errorStatus, setErrorStatus] = useState(null);
	const onSubmit = useCallback(async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formData = new FormData(form);
		const honeypot = formData.get(HONEYPOT_FIELD);
		formData.delete(HONEYPOT_FIELD);
		if (typeof honeypot === "string" && honeypot !== "") {
			setStatus("success");
			form.reset();
			return;
		}
		setStatus("submitting");
		setFieldErrors({});
		setErrorStatus(null);
		try {
			await submit(toValues(formData), formData);
			setStatus("success");
			if (resetOnSuccess) form.reset();
		} catch (error) {
			setFieldErrors(fieldErrorsFrom(error));
			setErrorStatus(statusFrom(error));
			setStatus("error");
		}
	}, [submit, resetOnSuccess]);
	const reset = useCallback(() => {
		setStatus("idle");
		setFieldErrors({});
		setErrorStatus(null);
	}, []);
	return {
		onSubmit,
		status,
		isSubmitting: status === "submitting",
		isSuccess: status === "success",
		isError: status === "error",
		fieldErrors,
		errorStatus,
		reset,
		honeypotProps: {
			name: HONEYPOT_FIELD,
			type: "text",
			tabIndex: -1,
			autoComplete: "off",
			"aria-hidden": true,
			style: HONEYPOT_STYLE
		}
	};
}
var pocketbaseClient = new PocketBase("/hcgi/platform");
// src/components/enquiry-form.tsx
function EnquiryForm() {
	const prefix = useId();
	const form = useFormSubmission({ submit: (_values, data) => {
		const date = String(data.get("requested_date") ?? "");
		const time = String(data.get("requested_time") ?? "");
		const requestedAt = (/* @__PURE__ */ new Date(`${date}T${time}`)).getTime();
		if (!Number.isFinite(requestedAt) || requestedAt <= Date.now()) throw new Error("Please choose a future appointment date.");
		data.set("kind", "rendez-vous");
		return pocketbaseClient.collection("prime_requests").create(data, { requestKey: null });
	} });
	if (form.isSuccess) return /* @__PURE__ */ jsxs("div", {
		className: "form-success",
		role: "status",
		children: [
			/* @__PURE__ */ jsx(CheckCircle2, {
				size: 42,
				strokeWidth: 1.4
			}),
			/* @__PURE__ */ jsx("h3", { children: "Thank you. Your appointment request has been received." }),
			/* @__PURE__ */ jsx("p", { children: "Our team will contact you to agree the appointment details. Your appointment is not confirmed until you hear from us." }),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "text-link",
				onClick: form.reset,
				children: ["Request another appointment", /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })]
			})
		]
	});
	return /* @__PURE__ */ jsxs("form", {
		className: "enquiry-form",
		onSubmit: form.onSubmit,
		children: [
			/* @__PURE__ */ jsx("input", { ...form.honeypotProps }),
			/* @__PURE__ */ jsx("input", {
				type: "hidden",
				name: "kind",
				value: "rendez-vous"
			}),
			/* @__PURE__ */ jsx("h3", { children: "Appointment" }),
			/* @__PURE__ */ jsxs("div", {
				className: "form-grid",
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: `${prefix}-name`,
					children: ["Your name *", /* @__PURE__ */ jsx("input", {
						id: `${prefix}-name`,
						name: "name",
						placeholder: "Full name",
						autoComplete: "name",
						required: true,
						maxLength: 150
					})]
				}), /* @__PURE__ */ jsxs("label", {
					htmlFor: `${prefix}-email`,
					children: ["Your email *", /* @__PURE__ */ jsx("input", {
						id: `${prefix}-email`,
						name: "email",
						type: "email",
						placeholder: "you@example.com",
						autoComplete: "email",
						required: true
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "form-grid",
				children: [/* @__PURE__ */ jsxs("label", {
					htmlFor: `${prefix}-date`,
					children: ["Preferred date *", /* @__PURE__ */ jsx("input", {
						id: `${prefix}-date`,
						name: "requested_date",
						type: "date",
						required: true
					})]
				}), /* @__PURE__ */ jsxs("label", {
					htmlFor: `${prefix}-time`,
					children: ["Preferred time *", /* @__PURE__ */ jsx("input", {
						id: `${prefix}-time`,
						name: "requested_time",
						type: "time",
						required: true
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: `${prefix}-phone`,
				children: ["Phone *", /* @__PURE__ */ jsx("input", {
					id: `${prefix}-phone`,
					name: "phone",
					type: "tel",
					autoComplete: "tel",
					placeholder: "Your phone number, including country code",
					required: true,
					maxLength: 50
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				htmlFor: `${prefix}-message`,
				children: ["Additional details (optional)", /* @__PURE__ */ jsx("textarea", {
					id: `${prefix}-message`,
					name: "message",
					rows: 4,
					placeholder: "What would you like to discuss? Please include your time zone.",
					maxLength: 4e3
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "consent-label",
				children: [/* @__PURE__ */ jsx("input", {
					name: "consent",
					type: "checkbox",
					value: "true",
					required: true
				}), /* @__PURE__ */ jsx("span", { children: "I agree that my contact details may be used to respond to my appointment request. They will not be made public. *" })]
			}),
			form.isError && /* @__PURE__ */ jsx("p", {
				className: "form-error",
				role: "alert",
				children: "Your request could not be sent. Check your details and choose a future date and time, then try again."
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "submit",
				className: "button button-blue form-submit",
				disabled: form.isSubmitting,
				children: [form.isSubmitting ? "Sending…" : "Request an appointment", /* @__PURE__ */ jsx(ArrowUpRight, { size: 18 })]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "form-privacy",
				children: [/* @__PURE__ */ jsx(LockKeyhole, { size: 13 }), "Your information remains confidential."]
			})
		]
	});
}
// src/components/home/reservations.tsx
function Reservations() {
	return /* @__PURE__ */ jsx("section", {
		id: "reservations",
		className: "reservations",
		children: /* @__PURE__ */ jsxs("div", {
			className: "reservation-inner",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "reservation-copy",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "eyebrow",
						children: "04 / APPOINTMENT"
					}),
					/* @__PURE__ */ jsxs("h2", { children: [
						"Let us discuss",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("em", { children: "your next journey." })
					] }),
					/* @__PURE__ */ jsx("p", { children: "Request an appointment with our team to discuss your plans, transport requirements or a personalised itinerary." }),
					/* @__PURE__ */ jsxs("ol", {
						className: "booking-steps",
						children: [
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", { children: "01" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Choose your preferred time." }), /* @__PURE__ */ jsx("p", { children: "Share your contact details and appointment preferences." })] })] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", { children: "02" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "Tell us what you need." }), /* @__PURE__ */ jsx("p", { children: "Let us know what you would like to discuss." })] })] }),
							/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("span", { children: "03" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", { children: "We get back to you." }), /* @__PURE__ */ jsx("p", { children: "Our team will contact you to agree the appointment." })] })] })
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reservation-note",
						children: "To reserve a vehicle or request a transfer quotation, contact us directly on WhatsApp or by email."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hero-actions",
						style: {
							justifyContent: "flex-start",
							flexWrap: "wrap"
						},
						children: [/* @__PURE__ */ jsxs("a", {
							className: "button button-blue",
							href: whatsappUrl({
								phone: WHATSAPP_NUMBER,
								text: WHATSAPP_DEFAULT_MESSAGE
							}),
							target: "_blank",
							rel: "noopener noreferrer",
							children: [/* @__PURE__ */ jsx(MessageCircle, { size: 18 }), "Book via WhatsApp"]
						}), /* @__PURE__ */ jsxs("a", {
							className: "text-link",
							href: mailtoHref({
								email: CONTACT_EMAIL,
								subject: "LUXRIDE — Transfer enquiry",
								body: "Hello LUXRIDE,\n\nI would like to request a transfer quotation.\n\nPickup location:\nDestination:\nTravel date and time:\nPassengers:\nLuggage:\nPreferred vehicle:\nPhone number:\n\nThank you."
							}),
							children: [
								/* @__PURE__ */ jsx(Mail, { size: 18 }),
								"Book via email",
								/* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
							]
						})]
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "reservation-form",
				children: /* @__PURE__ */ jsx(EnquiryForm, {})
			})]
		})
	});
}
// src/data/monaco.ts
var monacoHero = "https://images.hostinger.com/57f3e56c-0f9b-4362-8b29-5f8e8ad7d73c/7c64b657-7cc0-4d9a-9506-f9c14b64591d.png";
// src/routes/cannes.tsx
var cannes_exports = /* @__PURE__ */ __exportAll({
	default: () => cannes_default,
	meta: () => meta
});
var destinations = {
	"/cannes": {
		name: "Cannes",
		title: "Private Chauffeur Cannes | Luxury Chauffeur",
		description: "Request a private chauffeur in Cannes for Nice Airport transfers, hotel arrivals, hourly hire and event transport. Receive a personalised quotation.",
		intro: "From an arrival on La Croisette to a busy business itinerary, arrange private transport around your stay in Cannes.",
		services: [
			["Nice Airport to Cannes", "Request a private transfer to your hotel, villa or business address. Share your flight number, passenger count and luggage details."],
			["Hourly chauffeur hire", "Plan meetings, shopping, restaurants or several stops with a chauffeur at your disposal. Schedule and minimum duration are confirmed in your quotation."],
			["Festival and business transport", "Discuss transport for the Cannes Film Festival, Cannes Lions or a conference. Road restrictions and meeting points must be checked before your journey."]
		],
		routes: [
			"Nice Airport",
			"Monaco",
			"Saint-Tropez",
			"Antibes"
		],
		note: "During major events, allow additional time and confirm pickup points in advance."
	},
	"/monaco": {
		name: "Monaco & Monte-Carlo",
		title: "Private Chauffeur Monaco & Monte-Carlo | Luxury Chauffeur",
		description: "Arrange private chauffeur transport in Monaco and Monte-Carlo. Request Nice Airport transfers, hotel journeys, hourly hire and event transportation.",
		intro: "Arrange discreet private transportation for hotel arrivals, business appointments and personal itineraries in Monaco and Monte-Carlo.",
		services: [
			["Nice Airport to Monaco", "Request a private transfer from Nice Côte d’Azur Airport to your hotel, residence or meeting address in Monaco."],
			["Monte-Carlo chauffeur hire", "Share your appointments, restaurant reservations and preferred schedule to arrange hourly or full-day transportation."],
			["Events and marina transfers", "Enquire about journeys for the Monaco Grand Prix, Monaco Yacht Show or a marina arrival. Vehicle access and pickup arrangements require advance confirmation."]
		],
		routes: [
			"Nice Airport",
			"Cannes",
			"Èze",
			"Saint-Jean-Cap-Ferrat"
		],
		note: "Major Monaco events can involve road closures and restricted vehicle access."
	},
	"/nice": {
		name: "Nice",
		title: "Private Chauffeur Nice & Airport Transfers | Luxury Chauffeur",
		description: "Book a private chauffeur enquiry in Nice. Arrange Nice Airport transfers, hotel pickups, business transport and private journeys across the French Riviera.",
		intro: "Start your Riviera stay with private transport from Nice Airport, or plan chauffeur-driven journeys between your hotel, meetings and coastal destinations.",
		services: [
			["Nice Airport transfers", "Provide your flight number and exact destination to request an airport pickup. Meeting arrangements and any requested luggage assistance are confirmed before travel."],
			["City and hotel journeys", "Arrange transport to a hotel, residence, restaurant or business address in Nice. Share the exact location so suitable access can be discussed."],
			["Riviera day itineraries", "Plan several stops in Monaco, Cannes, Èze or nearby coastal towns. The route and stopping times can be discussed around your interests."]
		],
		routes: [
			"Monaco",
			"Cannes",
			"Saint-Tropez",
			"Èze"
		],
		note: "Flight details, luggage requirements and the exact pickup address help us prepare your quotation."
	},
	"/saint-tropez": {
		name: "Saint-Tropez",
		title: "Private Chauffeur Saint-Tropez | Luxury Chauffeur",
		description: "Request private chauffeur transport to Saint-Tropez, Ramatuelle and Pampelonne. Arrange airport transfers, return journeys and hourly chauffeur hire.",
		intro: "Plan your arrival in Saint-Tropez and private journeys to villas, hotels, restaurants and the surrounding coast.",
		services: [
			["Airport and Riviera transfers", "Request a journey from Nice Airport, Cannes or another address to Saint-Tropez. Share your arrival details and destination for a tailored quotation."],
			["Ramatuelle and Pampelonne", "Arrange transport for a restaurant booking, beach visit or private address. Pickup times and access are agreed before your journey."],
			["Hourly and return services", "Discuss a chauffeur for several stops, an evening itinerary or a return transfer. Confirm the schedule and waiting arrangements when enquiring."]
		],
		routes: [
			"Nice Airport",
			"Cannes",
			"Ramatuelle",
			"Pampelonne"
		],
		note: "Summer traffic can affect journey times. Plan appointments and return journeys with sufficient flexibility."
	},
	"/courchevel": {
		name: "Courchevel",
		title: "Courchevel Private Chauffeur & Transfers | Luxury Chauffeur",
		description: "Request a private transfer to Courchevel from Geneva, Lyon, Chambéry or Grenoble Airport. Share passenger, luggage and ski equipment requirements.",
		intro: "Organise private travel to your Courchevel hotel or chalet, with arrangements discussed around your flight, group and luggage.",
		services: [
			["Airport to Courchevel", "Enquire about transfers from Geneva, Lyon, Chambéry or Grenoble Airport. Provide flight details and the exact resort address."],
			["Chalet and resort transport", "Share your hotel, chalet or appointment locations to request local or hourly chauffeur transport, subject to availability."],
			["Luggage and ski equipment", "Specify suitcases, skis, snowboards and any child-seat requirements. Vehicle capacity and suitable equipment must be confirmed before booking."]
		],
		routes: [
			"Geneva Airport",
			"Lyon Airport",
			"Chambéry Airport",
			"Grenoble Airport"
		],
		note: "Mountain weather, road conditions and peak arrival periods can affect travel. Winter equipment and any special requirements must be confirmed with the operator."
	}
};
var destinationImages = {
	"/cannes": {
		src: cannesPhotos[0].src,
		alt: "Illustrative view of La Croisette in Cannes"
	},
	"/monaco": {
		src: monacoHero,
		alt: "Illustrative view of Monaco and Monte-Carlo"
	},
	"/nice": {
		src: photos[0].src,
		alt: "Illustrative view of Nice on the French Riviera"
	},
	"/saint-tropez": {
		src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Saint-Tropez_Le_port_01.jpg/1280px-Saint-Tropez_Le_port_01.jpg",
		alt: "Panoramic view of the port of Saint-Tropez",
		author: "François de Dijon",
		source: "https://commons.wikimedia.org/wiki/File:Saint-Tropez_Le_port_01.jpg",
		license: "CC BY-SA 4.0",
		licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
	},
	"/courchevel": {
		src: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Courchevel-ski-resort-1850.jpg",
		alt: "Courchevel 1850 ski resort",
		author: "Micigata",
		source: "https://commons.wikimedia.org/wiki/File:Courchevel-ski-resort-1850.jpg",
		license: "CC0",
		licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
	}
};
function meta(args) {
	const page = destinations[args.location.pathname] ?? destinations["/cannes"];
	return seo(args, {
		title: page.title,
		description: page.description,
		image: destinationImages[args.location.pathname]?.src,
		path: args.location.pathname
	});
}
var cannes_default = UNSAFE_withComponentProps(function DestinationPage() {
	const { pathname } = useLocation();
	const page = destinations[pathname] ?? destinations["/cannes"];
	const heroPhoto = destinationImages[pathname];
	const bookingHref = "/?destination=" + encodeURIComponent(page.name) + "#booking";
	const whatsappHref = whatsappUrl({
		phone: WHATSAPP_NUMBER,
		text: "Hello Luxury Chauffeur, I would like a quotation for private transport in " + page.name + "."
	});
	const emailHref = mailtoHref({
		email: CONTACT_EMAIL,
		subject: "Luxury Chauffeur — " + page.name + " enquiry"
	});
	return /* @__PURE__ */ jsxs("main", {
		id: "main-content",
		className: "destination-page",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "destination-hero",
				children: [heroPhoto && /* @__PURE__ */ jsx("img", {
					className: "destination-hero-photo",
					src: heroPhoto.src,
					alt: heroPhoto.alt,
					width: 1600,
					height: 900,
					fetchPriority: "high",
					decoding: "async",
					onError: (event) => {
						event.currentTarget.hidden = true;
					}
				}), /* @__PURE__ */ jsxs("div", {
					className: "destination-container",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "destination-eyebrow",
							children: "PRIVATE CHAUFFEUR · FRENCH RIVIERA & ALPS"
						}),
						/* @__PURE__ */ jsxs("h1", { children: [
							"Private chauffeur",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("em", { children: page.name })
						] }),
						/* @__PURE__ */ jsx("p", { children: page.intro }),
						/* @__PURE__ */ jsxs("div", {
							className: "destination-actions",
							children: [/* @__PURE__ */ jsx("a", {
								className: "destination-button",
								href: bookingHref,
								children: "Request a Quote ↗"
							}), /* @__PURE__ */ jsx("a", {
								className: "destination-outline",
								href: whatsappHref,
								target: "_blank",
								rel: "noopener noreferrer",
								children: "WhatsApp ↗"
							})]
						})
					]
				})]
			}),
			heroPhoto?.author && /* @__PURE__ */ jsxs("p", {
				className: "destination-photo-credit destination-container",
				children: [
					"Photo:",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: heroPhoto.source,
						target: "_blank",
						rel: "noopener noreferrer",
						children: heroPhoto.author
					}),
					" · ",
					/* @__PURE__ */ jsx("a", {
						href: heroPhoto.licenseUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						children: heroPhoto.license
					}),
					" · Image cropped to fit the banner."
				]
			}),
			/* @__PURE__ */ jsx("nav", {
				className: "destination-links destination-container",
				"aria-label": "Chauffeur destinations",
				children: Object.entries(destinations).map(([path, item]) => /* @__PURE__ */ jsx("a", {
					href: path,
					"aria-current": pathname === path ? "page" : void 0,
					children: item.name
				}, path))
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "destination-section destination-container",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "destination-eyebrow",
						children: "PRIVATE TRANSPORT, PERSONALLY ARRANGED"
					}),
					/* @__PURE__ */ jsxs("h2", { children: ["Chauffeur services in ", page.name] }),
					/* @__PURE__ */ jsx("div", {
						className: "destination-grid-cards",
						children: page.services.map(([title, text]) => /* @__PURE__ */ jsxs("article", { children: [/* @__PURE__ */ jsx("h3", { children: title }), /* @__PURE__ */ jsx("p", { children: text })] }, title))
					})
				]
			}),
			pathname === "/cannes" && /* @__PURE__ */ jsx(CannesGallery, {}),
			/* @__PURE__ */ jsx("section", {
				className: "destination-section destination-soft",
				children: /* @__PURE__ */ jsxs("div", {
					className: "destination-container",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "destination-eyebrow",
							children: "PLAN YOUR JOURNEY"
						}),
						/* @__PURE__ */ jsx("h2", { children: "Popular journeys and travel details" }),
						/* @__PURE__ */ jsx("ul", {
							className: "destination-routes",
							children: page.routes.map((name) => /* @__PURE__ */ jsxs("li", { children: [
								page.name,
								" ↔ ",
								name
							] }, name))
						}),
						/* @__PURE__ */ jsx("p", { children: page.note }),
						/* @__PURE__ */ jsx("a", {
							className: "destination-text-link",
							href: "/#vehicules",
							children: "Explore our full fleet ↗"
						})
					]
				})
			}),
			pathname !== "/cannes" && /* @__PURE__ */ jsxs("section", {
				className: "destination-section destination-container",
				children: [
					/* @__PURE__ */ jsx("h2", { children: "Before you book" }),
					/* @__PURE__ */ jsxs("details", {
						className: "destination-faq",
						children: [/* @__PURE__ */ jsxs("summary", { children: [
							"How do I request a chauffeur in ",
							page.name,
							"?"
						] }), /* @__PURE__ */ jsx("p", { children: "Use our booking enquiry form or contact us on WhatsApp. Include the pickup and destination, date, time, passengers, luggage and preferred vehicle. We will review your request and provide a quotation." })]
					}),
					/* @__PURE__ */ jsxs("details", {
						className: "destination-faq",
						children: [/* @__PURE__ */ jsx("summary", { children: "Is my booking confirmed when I submit the form?" }), /* @__PURE__ */ jsx("p", { children: "No. Availability, the final price and pickup arrangements must be confirmed separately by our team. No online payment is taken through this enquiry form." })]
					})
				]
			}),
			pathname === "/monaco" && /* @__PURE__ */ jsx(Reservations, {}),
			/* @__PURE__ */ jsx("section", {
				className: "destination-section destination-cta",
				children: /* @__PURE__ */ jsxs("div", {
					className: "destination-container",
					children: [
						/* @__PURE__ */ jsx("h2", { children: "Let us arrange your next journey." }),
						/* @__PURE__ */ jsx("p", { children: "Share your itinerary and request a personalised quotation." }),
						/* @__PURE__ */ jsxs("div", {
							className: "destination-actions",
							children: [
								/* @__PURE__ */ jsx("a", {
									className: "destination-button",
									href: bookingHref,
									children: "Request a Quote ↗"
								}),
								/* @__PURE__ */ jsx("a", {
									className: "destination-outline",
									href: whatsappHref,
									target: "_blank",
									rel: "noopener noreferrer",
									children: "WhatsApp ↗"
								}),
								/* @__PURE__ */ jsx("a", {
									className: "destination-outline",
									href: emailHref,
									children: "Email us ↗"
								})
							]
						})
					]
				})
			})
		]
	});
});
// src/routes/monaco.tsx
var monaco_exports = /* @__PURE__ */ __exportAll({
	default: () => cannes_default,
	meta: () => meta
});
// src/routes/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$3 });
var STATIC_PATHS = [
	"/",
	"/monaco",
	"/cannes",
	"/nice",
	"/saint-tropez",
	"/courchevel"
];
function escapeXml(value) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&apos;");
}
function toLoc(origin, path) {
	return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
function serializeSitemap(origin, entries) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((entry) => {
		return `\t<url>\n\t\t<loc>${escapeXml(toLoc(origin, entry.path))}</loc>${entry.lastmod ? `\n\t\t<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ""}\n\t</url>`;
	}).join("\n")}\n</urlset>\n`;
}
/**
* Public dynamic URLs (blog posts, PDPs, articles).
* Return `{ path, lastmod }` in the same change that adds a collection.
* Return `[]` only while the site has no public records; clear those URLs
* again in the same change that removes the collection.
*/
async function getDynamicEntries() {
	return [];
}
async function loader$3({ request }) {
	const origin = siteOrigin(request);
	const entries = [...STATIC_PATHS.map((path) => ({ path })), ...await getDynamicEntries()];
	return new Response(serializeSitemap(origin, entries), { headers: {
		"Content-Type": "application/xml; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
}
// src/routes/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$2 });
/**
* Hostinger-provided hosts: the editor sandbox preview, and the domain a site is
* published on before its owner connects one of their own. Neither should reach a
* search index — the site is not on its final URL yet.
*/
var UNPUBLISHED_HOST_SUFFIXES = [
	".app-preview.com",
	".app-preview.io",
	".hostingersite.com",
	".hostingersite.dev"
];
/**
* The assistants and answer engines that fetch a page to answer someone's
* question and cite the site back. They are listed by name, rather than left to
* the wildcard group, so the site's stance on AI access is explicit to anyone —
* or anything — reading the file.
*
* Each vendor splits the work the same way: one crawler builds the index the
* answers are drawn from, another fetches the single page a person just asked
* about. Meta and Amazon both document that second kind as free to skip
* robots.txt, since a human asked for the page — naming them records the site's
* answer, it does not enforce it.
*/
var AI_ANSWER_AGENTS = [
	"OAI-SearchBot",
	"ChatGPT-User",
	"Claude-SearchBot",
	"Claude-User",
	"PerplexityBot",
	"Perplexity-User",
	"DuckAssistBot",
	"MistralAI-User",
	"meta-webindexer",
	"meta-externalfetcher",
	"Amzn-SearchBot",
	"Amzn-User"
];
/**
* Tokens whose meaning is permission to train generative models on the content.
* `Google-Extended` and `Applebot-Extended` are not crawlers and never fetch
* anything — they read robots.txt as a usage licence, so `Disallow: /` is the
* only way to express `ai-train=no` to them. The rest are the crawlers that
* collect training corpora. Most have an answer-engine counterpart above that
* keeps the site citable in exchange; `Bytespider` is last because ByteDance
* runs no answer engine to trade the access for.
*
* Blocking `Google-Extended` also gives up grounding in the Gemini app. Google
* Search, and the AI Overviews built from its index, are unaffected, and
* `Applebot-Extended` works the same way for Siri and Spotlight. `Googlebot`
* and `Applebot` themselves keep their access through the wildcard group, which
* is why neither is named above.
*/
var AI_TRAINING_AGENTS = [
	"GPTBot",
	"ClaudeBot",
	"Google-Extended",
	"Applebot-Extended",
	"meta-externalagent",
	"Amazonbot",
	"Bytespider"
];
/**
* Content signals (contentsignals.org) state what crawlers may do with the
* content once fetched: appear in search results, ground an AI answer, or train
* a model. Search and AI answers are allowed because they bring readers back;
* training is not, which is the default every publisher starts from.
*
* A named group replaces the wildcard group for that agent rather than adding
* to it, so the signal is repeated inside each one — otherwise the agents it is
* aimed at are the only ones that never read it.
*/
var CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no";
function publishedRules(origin) {
	return [
		"User-agent: *",
		CONTENT_SIGNAL,
		"Allow: /",
		"",
		...AI_ANSWER_AGENTS.flatMap((agent) => [
			`User-agent: ${agent}`,
			CONTENT_SIGNAL,
			"Allow: /",
			""
		]),
		...AI_TRAINING_AGENTS.flatMap((agent) => [
			`User-agent: ${agent}`,
			"Disallow: /",
			""
		]),
		`Sitemap: ${origin}/sitemap.xml`
	];
}
function loader$2({ request }) {
	const origin = siteOrigin(request);
	const { hostname } = new URL(origin);
	const lines = UNPUBLISHED_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix)) ? ["User-agent: *", "Disallow: /"] : publishedRules(origin);
	return new Response(`${lines.join("\n")}\n`, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
}
// src/lib/api.server.ts
/**
* Helpers for `/api/*` resource routes: JSON responses, security headers,
* rate limiting, body-size limits, and a single error shape.
*
* Wrap every resource route handler in `withApi`: there is no global middleware
* in this app, so the wrapper is what applies these concerns to a route.
*/
/**
* Applied to API responses only. Page responses must stay untouched, because
* framing and CSP headers break embedding the site in a preview iframe.
* Transport security (HSTS) belongs to the proxy in front of this server.
*
* `Cache-Control: no-store` is defence in depth, not a guarantee: the platform
* edge cache rewrites this header on published domains and caches `/api/*` GET
* responses by URL for all visitors. Per-user or authenticated endpoints must
* therefore be actions (POST) — never GET. Handlers returning public,
* cache-friendly data may override by setting their own Cache-Control
* (existing headers are never overwritten here).
*/
var SECURITY_HEADERS = {
	"Cache-Control": "no-store",
	"Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
	"Cross-Origin-Resource-Policy": "same-origin",
	"Referrer-Policy": "no-referrer",
	"X-Content-Type-Options": "nosniff",
	"X-Frame-Options": "DENY",
	"X-Permitted-Cross-Domain-Policies": "none"
};
var withExtraHeaders = (response, extra) => {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(extra)) if (!headers.has(name)) headers.set(name, value);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};
/** JSON response carrying the API security headers. */
var json = (value, init = {}) => withExtraHeaders(Response.json(value, init), SECURITY_HEADERS);
/** Client-error response — use for input validation, never for server failures. */
var apiError = (status, message) => json({ error: message }, { status });
var serverError = (error) => {
	const isProduction = process.env.NODE_ENV === "production";
	const cause = error instanceof Error ? error : new Error(String(error));
	return json({
		message: "Something went wrong!",
		...!isProduction && { error: {
			name: cause.name,
			message: cause.message,
			stack: cause.stack
		} }
	}, { status: 500 });
};
var runHandler = async (handler, args) => {
	const verdict = await consumeRateLimit(clientIdentifier(args.request));
	if (verdict.isLimited) return withExtraHeaders(apiError(429, "Too many requests, please try again later"), rateLimitHeaders(verdict));
	const extraHeaders = rateLimitHeaders(verdict);
	try {
		const result = await handler(args);
		return withExtraHeaders(result instanceof Response ? withExtraHeaders(result, SECURITY_HEADERS) : json(result ?? null), extraHeaders);
	} catch (error) {
		if (error instanceof Response) return withExtraHeaders(error, extraHeaders);
		logger.error(error instanceof Error ? error.message : error, error instanceof Error ? error.stack : void 0);
		return withExtraHeaders(serverError(error), extraHeaders);
	}
};
/**
* Wraps a resource route `loader` / `action`. Rate limits the caller, adds
* security headers, logs the request, and turns any thrown error into the shared
* 500 shape — so handlers can `throw new Error(...)` instead of building error
* responses.
*/
var withApi = (handler) => {
	return async (args) => {
		const startedAt = Date.now();
		const response = await runHandler(handler, args);
		const { pathname } = new URL(args.request.url);
		logger.info(`${args.request.method} ${pathname} ${response.status} ${Date.now() - startedAt}ms`);
		return response;
	};
};
// src/routes/api.health.ts
var api_health_exports = /* @__PURE__ */ __exportAll({
	action: () => action$1,
	loader: () => loader$1
});
var health = withApi(async () => json({ ok: true }));
var loader$1 = health;
var action$1 = health;
// src/routes/api.$.ts
var api_$_exports = /* @__PURE__ */ __exportAll({
	action: () => action,
	loader: () => loader
});
/**
* Unmatched `/api/*` paths answer with JSON instead of React Router's HTML
* error document. More specific `/api/...` routes always win over this one.
*/
var notFound = withApi(async () => apiError(404, "Route not found"));
var loader = notFound;
var action = notFound;
// \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-moNwhJrv.js",
		"imports": [
			"/assets/rolldown-runtime-XKyaHtl9.js",
			"/assets/jsx-runtime-afkERV6J.js",
			"/assets/_virtual_horizons-runtime-DS3T_2uP.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-e-iWA5o7.js",
			"imports": [
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/_virtual_horizons-runtime-DS3T_2uP.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-Dtqdf7iU.js",
			"imports": [
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/monaco": {
			"id": "routes/monaco",
			"parentId": "root",
			"path": "monaco",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/monaco-zDMMN-hE.js",
			"imports": [
				"/assets/cannes-Bop5MODc.js",
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/cannes": {
			"id": "routes/cannes",
			"parentId": "root",
			"path": "cannes",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cannes-zDMMN-hE.js",
			"imports": [
				"/assets/cannes-Bop5MODc.js",
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"nice": {
			"id": "nice",
			"parentId": "root",
			"path": "nice",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cannes-zDMMN-hE.js",
			"imports": [
				"/assets/cannes-Bop5MODc.js",
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"saint-tropez": {
			"id": "saint-tropez",
			"parentId": "root",
			"path": "saint-tropez",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cannes-zDMMN-hE.js",
			"imports": [
				"/assets/cannes-Bop5MODc.js",
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"courchevel": {
			"id": "courchevel",
			"parentId": "root",
			"path": "courchevel",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cannes-zDMMN-hE.js",
			"imports": [
				"/assets/cannes-Bop5MODc.js",
				"/assets/rolldown-runtime-XKyaHtl9.js",
				"/assets/jsx-runtime-afkERV6J.js",
				"/assets/seo-Bjh2fhqD.js",
				"/assets/site-Daj9kvbj.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/sitemap.xml": {
			"id": "routes/sitemap.xml",
			"parentId": "root",
			"path": "sitemap.xml",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/sitemap.xml-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/robots.txt": {
			"id": "routes/robots.txt",
			"parentId": "root",
			"path": "robots.txt",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/robots.txt-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/api.health": {
			"id": "routes/api.health",
			"parentId": "root",
			"path": "api/health",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/api.health-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/api.$": {
			"id": "routes/api.$",
			"parentId": "root",
			"path": "api/*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/api._-BvRk9kiK.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-21586da3.js",
	"version": "21586da3",
	"sri": void 0
};
// \0virtual:react-router/server-build
var assetsBuildDirectory = "..\\..\\dist\\apps\\web\\client";
var basename = "/";
var future = {
	"unstable_customRouteDiscovery": false,
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var unstable_apiOnly = false;
var unstable_apiServerOrigin = void 0;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/monaco": {
		id: "routes/monaco",
		parentId: "root",
		path: "monaco",
		index: void 0,
		caseSensitive: void 0,
		module: monaco_exports
	},
	"routes/cannes": {
		id: "routes/cannes",
		parentId: "root",
		path: "cannes",
		index: void 0,
		caseSensitive: void 0,
		module: cannes_exports
	},
	"nice": {
		id: "nice",
		parentId: "root",
		path: "nice",
		index: void 0,
		caseSensitive: void 0,
		module: cannes_exports
	},
	"saint-tropez": {
		id: "saint-tropez",
		parentId: "root",
		path: "saint-tropez",
		index: void 0,
		caseSensitive: void 0,
		module: cannes_exports
	},
	"courchevel": {
		id: "courchevel",
		parentId: "root",
		path: "courchevel",
		index: void 0,
		caseSensitive: void 0,
		module: cannes_exports
	},
	"routes/sitemap.xml": {
		id: "routes/sitemap.xml",
		parentId: "root",
		path: "sitemap.xml",
		index: void 0,
		caseSensitive: void 0,
		module: sitemap_xml_exports
	},
	"routes/robots.txt": {
		id: "routes/robots.txt",
		parentId: "root",
		path: "robots.txt",
		index: void 0,
		caseSensitive: void 0,
		module: robots_txt_exports
	},
	"routes/api.health": {
		id: "routes/api.health",
		parentId: "root",
		path: "api/health",
		index: void 0,
		caseSensitive: void 0,
		module: api_health_exports
	},
	"routes/api.$": {
		id: "routes/api.$",
		parentId: "root",
		path: "api/*",
		index: void 0,
		caseSensitive: void 0,
		module: api_$_exports
	}
};
var allowedActionOrigins = false;
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr, unstable_apiOnly, unstable_apiServerOrigin };
