import ipaddr from "ipaddr.js";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";
// src/lib/logger.server.ts
var logger = {
	error: (...args) => {
		console.log("[ERROR]", ...args);
	},
	fatal: (...args) => {
		console.error("[FATAL]", ...args);
	},
	info: (...args) => {
		console.log("[INFO]", ...args);
	},
	debug: (...args) => {
		console.log("[DEBUG]", ...args);
	},
	warn: (...args) => {
		console.log("[WARN]", ...args);
	}
};
// src/lib/rate-limit.server.ts
/**
* Fixed-window rate limiter for `/api/*` resource routes.
*
* Counters live in this server process only. Never apply this to page routes —
* a single page load fans out into many requests and would exhaust the window
* immediately.
*
* `rate-limiter-flexible` does the counting and `ipaddr.js` parses the address.
* What is left here is deciding which caller a request belongs to: the proxy's
* `X-Real-IP`, with IPv6 grouped by /56 so a caller cannot rotate addresses for
* a fresh window.
*/
var MS_PER_SECOND = 1e3;
var WINDOW_SECONDS = 300;
var MAX_REQUESTS_PER_WINDOW = 100;
/** 7 bytes of a 16-byte address make up the /56 prefix. */
var IPV6_PREFIX_BYTES = 7;
/** The bucket an address counts under; the realtime server keys its per-visitor cap on it too. */
var addressBucket = (address) => {
	if (!address) return "unknown";
	try {
		const parsed = ipaddr.parse(address);
		if (!(parsed instanceof ipaddr.IPv6)) return address;
		if (parsed.isIPv4MappedAddress()) return parsed.toIPv4Address().toString();
		return parsed.toByteArray().slice(0, IPV6_PREFIX_BYTES).join(".");
	} catch {
		return address;
	}
};
/**
* The proxy in front of this server sets `X-Real-IP` to the client it resolved.
* Never `X-Forwarded-For`: each hop appends to it, so its left-most entry is
* whatever the visitor sent. `undefined` for a direct request (no proxy).
*/
var clientAddress = (request) => request.headers.get("x-real-ip")?.trim() || void 0;
/** Direct requests (no proxy) share the `unknown` bucket. */
var clientIdentifier = (request) => addressBucket(clientAddress(request));
var sharedLimiter = new RateLimiterMemory({
	points: MAX_REQUESTS_PER_WINDOW,
	duration: WINDOW_SECONDS
});
/**
* Spending the budget rejects with the same result object a success resolves
* with; anything else is the store failing and must not pass as a verdict.
*/
var consume = async (limiter, identifier) => {
	try {
		return {
			result: await limiter.consume(identifier),
			isLimited: false
		};
	} catch (error) {
		if (error instanceof RateLimiterRes) return {
			result: error,
			isLimited: true
		};
		throw error;
	}
};
var consumeRateLimit = async (identifier) => {
	const { result, isLimited } = await consume(sharedLimiter, identifier);
	return {
		isLimited,
		limit: MAX_REQUESTS_PER_WINDOW,
		remaining: result.remainingPoints,
		resetSeconds: Math.max(0, Math.ceil(result.msBeforeNext / MS_PER_SECOND))
	};
};
/** IETF draft `RateLimit-*` headers. */
var rateLimitHeaders = (verdict) => {
	const headers = {
		"RateLimit-Policy": `${verdict.limit};w=${WINDOW_SECONDS}`,
		"RateLimit-Limit": String(verdict.limit),
		"RateLimit-Remaining": String(verdict.remaining),
		"RateLimit-Reset": String(verdict.resetSeconds)
	};
	if (verdict.isLimited) headers["Retry-After"] = String(verdict.resetSeconds);
	return headers;
};
export { logger as a, rateLimitHeaders as i, clientIdentifier as n, consumeRateLimit as r, addressBucket as t };
