import {
	type RouteConfig,
	index,
	route,
} from "@react-router/dev/routes";

import { NICE_AIRPORT_TO_CANNES_PATH } from "./constants/transfer-routes";
import { airportTransfers } from "./data/airport-transfers";

export default [
	index("routes/home.tsx"),

	route("monaco", "routes/monaco.tsx"),
	route("cannes", "routes/cannes.tsx"),
	route(NICE_AIRPORT_TO_CANNES_PATH.slice(1), "routes/nice-airport-to-cannes.tsx"),

	route("nice", "routes/cannes.tsx", {
		id: "nice",
	}),

	route("saint-tropez", "routes/cannes.tsx", {
		id: "saint-tropez",
	}),

	route("courchevel", "routes/cannes.tsx", {
		id: "courchevel",
	}),

	...airportTransfers.map(({ slug }) =>
		route(slug, "routes/airport-transfer.tsx", { id: slug }),
	),

	route("sitemap.xml", "routes/sitemap.xml.ts"),
	route("robots.txt", "routes/robots.txt.ts"),

	route("api/health", "routes/api.health.ts"),
	route("api/*", "routes/api.$.ts"),
] satisfies RouteConfig;
