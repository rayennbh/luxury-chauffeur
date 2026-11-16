import {
	type RouteConfig,
	index,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),

	route("monaco", "routes/monaco.tsx"),
	route("cannes", "routes/cannes.tsx"),

	route("nice", "routes/cannes.tsx", {
		id: "nice",
	}),

	route("saint-tropez", "routes/cannes.tsx", {
		id: "saint-tropez",
	}),

	route("courchevel", "routes/cannes.tsx", {
		id: "courchevel",
	}),

	route("sitemap.xml", "routes/sitemap.xml.ts"),
	route("robots.txt", "routes/robots.txt.ts"),

	route("api/health", "routes/api.health.ts"),
	route("api/*", "routes/api.$.ts"),
] satisfies RouteConfig;