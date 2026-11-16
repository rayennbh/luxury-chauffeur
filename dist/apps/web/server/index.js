import { a as logger, t as addressBucket } from "./assets/rate-limit.server-CBw0EuCw.js";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { randomUUID } from "node:crypto";
import { WebSocket, WebSocketServer } from "ws";
var ROOM_PARAM_PATTERN = /^[A-Za-z0-9_-]{1,32}(?::[A-Za-z0-9_.-]{1,64})?$/;
var MAX_PAYLOAD_BYTES = 16384;
var PING_INTERVAL_MS = 25e3;
var MESSAGE_RATE_WINDOW_MS = 1e3;
var MAX_TICK_HZ = 60;
var WEBSOCKET_PROTOCOL_HEADER = "sec-websocket-protocol";
var VITE_HMR_PROTOCOLS = /* @__PURE__ */ new Set(["vite-hmr", "vite-ping"]);
/** RFC 6455 "unexpected condition": the room could not be set up after the handshake. */
var ROOM_UNAVAILABLE_CLOSE_CODE = 1011;
/** Close codes the client helper understands; 4xxx is the application range. */
var RealtimeCloseCode = {
	codeChanged: 4e3,
	roomFull: 4001,
	rateLimited: 4003,
	serverStopping: 4004
};
var CLOSE_CODE_BY_REASON = {
	"code changed": RealtimeCloseCode.codeChanged,
	"server stopping": RealtimeCloseCode.serverStopping
};
/** Message types the transport itself sends; app messages use any other `type`. */
var RealtimeSystemMessage = {
	welcome: "welcome",
	joined: "joined",
	left: "left"
};
var SYSTEM_MESSAGE_TYPES = new Set(Object.values(RealtimeSystemMessage));
var DEFAULT_ROOM_LIMITS = {
	maxClientsPerRoom: 16,
	maxMessagesPerSecond: 60
};
var DEFAULT_SERVER_LIMITS = {
	maxRooms: 200,
	maxConnectionsPerAddress: 16
};
var serialize = (message) => JSON.stringify(message);
var parseMessage = (raw) => {
	let parsed;
	try {
		parsed = JSON.parse(String(raw));
	} catch {
		return null;
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
	const { type } = parsed;
	return typeof type === "string" && type.length > 0 ? parsed : null;
};
/** `X-Real-IP` is set by the proxy; `X-Forwarded-For` is appended to, so its left-most entry is visitor-controlled. */
var clientAddress = (request) => request.headers["x-real-ip"]?.toString().trim() || request.socket.remoteAddress || "unknown";
/** Browsers always send `Origin` on a WebSocket handshake; it must be this site. */
var isSameOrigin = (request) => {
	const origin = request.headers.origin;
	const host = request.headers.host;
	if (!origin || !host) return false;
	try {
		return new URL(origin).host === host;
	} catch {
		return false;
	}
};
var rejectUpgrade = (socket, status, reason) => {
	socket.end(`HTTP/1.1 ${status} ${reason}\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);
};
var logHandlerFailure = (name, error) => {
	logger.error(`realtime ${name} handler failed`, error instanceof Error ? error.stack : error);
};
var runHandler = (name, run) => {
	try {
		run();
	} catch (error) {
		logHandlerFailure(name, error);
	}
};
var logSocketError = (error) => {
	logger.warn("realtime socket error", error instanceof Error ? error.message : error);
};
/** The handlers a room id selects, or null when the id names no known channel. */
var resolveHandlers = (definition, roomId) => {
	const single = definition.channels.get(null);
	if (single) return {
		channel: null,
		handlers: single
	};
	const separatorIndex = roomId.indexOf(":");
	if (separatorIndex <= 0) return null;
	const channel = roomId.slice(0, separatorIndex);
	const handlers = definition.channels.get(channel);
	return handlers ? {
		channel,
		handlers
	} : null;
};
var createRealtimeServer = ({ definition }) => {
	const serverLimits = {
		...DEFAULT_SERVER_LIMITS,
		...definition?.limits
	};
	const webSocketServer = new WebSocketServer({
		noServer: true,
		maxPayload: MAX_PAYLOAD_BYTES
	});
	const rooms = /* @__PURE__ */ new Map();
	const connections = /* @__PURE__ */ new Map();
	const connectionsPerAddress = /* @__PURE__ */ new Map();
	const sendTo = (socket, message) => {
		if (socket.readyState === WebSocket.OPEN) socket.send(serialize(message));
	};
	const broadcast = (room, message, except) => {
		const payload = serialize(message);
		for (const [clientId, socket] of room.sockets) if (clientId !== except && socket.readyState === WebSocket.OPEN) socket.send(payload);
	};
	const stopTick = (room) => {
		if (room.tickTimer) {
			clearInterval(room.tickTimer);
			room.tickTimer = void 0;
		}
	};
	const startTick = (room) => {
		const { tick } = room.handlers;
		if (!tick || room.tickTimer) return;
		const hz = Math.min(Math.max(tick.hz, 1), MAX_TICK_HZ);
		room.lastTickAt = Date.now();
		room.tickTimer = setInterval(() => {
			const now = Date.now();
			const dt = (now - room.lastTickAt) / 1e3;
			room.lastTickAt = now;
			runHandler("tick", () => tick.run(room, dt));
		}, 1e3 / hz);
	};
	const getOrCreateRoom = (roomId, channel, handlers) => {
		const existing = rooms.get(roomId);
		if (existing) return existing;
		let state = {};
		if (handlers.createState) try {
			state = handlers.createState({
				id: roomId,
				channel
			});
		} catch (error) {
			logHandlerFailure("createState", error);
			return null;
		}
		const room = {
			id: roomId,
			channel,
			handlers,
			limits: {
				...DEFAULT_ROOM_LIMITS,
				...handlers.limits
			},
			state,
			clients: /* @__PURE__ */ new Map(),
			sockets: /* @__PURE__ */ new Map(),
			lastTickAt: Date.now(),
			broadcast: (message, options) => broadcast(room, message, options?.except)
		};
		rooms.set(roomId, room);
		return room;
	};
	const removeConnection = (socket) => {
		const connection = connections.get(socket);
		if (!connection) return;
		connections.delete(socket);
		const addressCount = (connectionsPerAddress.get(connection.addressKey) ?? 1) - 1;
		if (addressCount > 0) connectionsPerAddress.set(connection.addressKey, addressCount);
		else connectionsPerAddress.delete(connection.addressKey);
		const room = rooms.get(connection.roomId);
		if (!room || !room.clients.has(connection.client.id)) return;
		room.clients.delete(connection.client.id);
		room.sockets.delete(connection.client.id);
		runHandler("onLeave", () => room.handlers.onLeave?.(room, connection.client));
		broadcast(room, {
			type: RealtimeSystemMessage.left,
			clientId: connection.client.id
		});
		if (room.clients.size === 0) {
			stopTick(room);
			rooms.delete(room.id);
		}
	};
	const isWithinMessageRate = (connection, room, now) => {
		if (now - connection.messageWindowStartedAt >= MESSAGE_RATE_WINDOW_MS) {
			connection.messageWindowStartedAt = now;
			connection.messagesInWindow = 0;
		}
		connection.messagesInWindow += 1;
		return connection.messagesInWindow <= room.limits.maxMessagesPerSecond;
	};
	const handleMessage = (socket, raw) => {
		const connection = connections.get(socket);
		const room = connection && rooms.get(connection.roomId);
		if (!connection || !room) return;
		if (!isWithinMessageRate(connection, room, Date.now())) {
			socket.close(RealtimeCloseCode.rateLimited, "Too many messages");
			return;
		}
		const message = parseMessage(raw);
		if (!message || SYSTEM_MESSAGE_TYPES.has(message.type)) return;
		if (room.handlers.onMessage) {
			runHandler("onMessage", () => room.handlers.onMessage?.(room, connection.client, message));
			return;
		}
		broadcast(room, {
			...message,
			from: connection.client.id
		}, connection.client.id);
	};
	const acceptConnection = (socket, room, address, addressKey) => {
		socket.on("error", logSocketError);
		if (room.clients.size >= room.limits.maxClientsPerRoom) {
			socket.close(RealtimeCloseCode.roomFull, "Room is full");
			if (room.clients.size === 0) rooms.delete(room.id);
			return;
		}
		const client = {
			id: randomUUID(),
			address,
			data: {},
			send: (message) => sendTo(socket, message),
			close: (code, reason) => socket.close(code, reason)
		};
		const connection = {
			socket,
			client,
			roomId: room.id,
			addressKey,
			isAlive: true,
			messageWindowStartedAt: Date.now(),
			messagesInWindow: 0
		};
		connections.set(socket, connection);
		connectionsPerAddress.set(addressKey, (connectionsPerAddress.get(addressKey) ?? 0) + 1);
		room.clients.set(client.id, client);
		room.sockets.set(client.id, socket);
		socket.on("pong", () => {
			connection.isAlive = true;
		});
		socket.on("message", (raw) => handleMessage(socket, raw));
		socket.on("close", () => removeConnection(socket));
		sendTo(socket, {
			type: RealtimeSystemMessage.welcome,
			clientId: client.id,
			roomId: room.id,
			channel: room.channel,
			clients: [...room.clients.keys()].filter((id) => id !== client.id)
		});
		runHandler("onJoin", () => room.handlers.onJoin?.(room, client));
		broadcast(room, {
			type: RealtimeSystemMessage.joined,
			clientId: client.id
		}, client.id);
		startTick(room);
	};
	const keepaliveTimer = setInterval(() => {
		for (const [socket, connection] of connections) {
			if (!connection.isAlive) {
				socket.terminate();
				continue;
			}
			connection.isAlive = false;
			socket.ping();
		}
	}, PING_INTERVAL_MS);
	const handleUpgrade = ({ request, socket, head }) => {
		let url;
		try {
			url = new URL(request.url ?? "/", "http://localhost");
		} catch {
			socket.on("error", logSocketError);
			rejectUpgrade(socket, 400, "Bad Request");
			return true;
		}
		const protocol = request.headers[WEBSOCKET_PROTOCOL_HEADER]?.toString() ?? "";
		if (url.pathname !== "/ws" || VITE_HMR_PROTOCOLS.has(protocol)) return false;
		socket.on("error", logSocketError);
		if (!definition) {
			rejectUpgrade(socket, 404, "Not Found");
			return true;
		}
		const roomId = url.searchParams.get("room") ?? "";
		const address = clientAddress(request);
		const addressKey = addressBucket(address);
		if (!isSameOrigin(request)) {
			rejectUpgrade(socket, 403, "Forbidden");
			return true;
		}
		if (!ROOM_PARAM_PATTERN.test(roomId)) {
			rejectUpgrade(socket, 400, "Bad Request");
			return true;
		}
		const resolved = resolveHandlers(definition, roomId);
		if (!resolved) {
			rejectUpgrade(socket, 404, "Not Found");
			return true;
		}
		if ((connectionsPerAddress.get(addressKey) ?? 0) >= serverLimits.maxConnectionsPerAddress) {
			rejectUpgrade(socket, 429, "Too Many Requests");
			return true;
		}
		if (!rooms.has(roomId) && rooms.size >= serverLimits.maxRooms) {
			rejectUpgrade(socket, 503, "Service Unavailable");
			return true;
		}
		webSocketServer.handleUpgrade(request, socket, head, (webSocket) => {
			const room = getOrCreateRoom(roomId, resolved.channel, resolved.handlers);
			if (!room) {
				webSocket.on("error", logSocketError);
				webSocket.close(ROOM_UNAVAILABLE_CLOSE_CODE, "Room unavailable");
				return;
			}
			acceptConnection(webSocket, room, address, addressKey);
		});
		return true;
	};
	const close = ({ reason }) => {
		clearInterval(keepaliveTimer);
		const code = CLOSE_CODE_BY_REASON[reason];
		for (const room of rooms.values()) stopTick(room);
		for (const socket of connections.keys()) socket.close(code, reason);
		rooms.clear();
		connections.clear();
		connectionsPerAddress.clear();
		webSocketServer.close();
	};
	return {
		handleUpgrade,
		close
	};
};
// server/app.ts
/**
* The Express app React Router runs in, and the realtime server next to it.
*
* `server.ts` loads this module through Vite in development and from the
* server build in production, so everything that should reload with the
* app's code is imported from here, not from `server.ts`.
*/
var app = express();
app.disable("x-powered-by");
app.use(createRequestHandler({
	build: () => import("./assets/server-build-CZPvXm2u.js"),
	mode: process.env.NODE_ENV
}));
var realtime = createRealtimeServer({ definition: null });
export { app, realtime };
