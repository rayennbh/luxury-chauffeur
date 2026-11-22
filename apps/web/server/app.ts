/**
 * The Express app React Router runs in, and the realtime server next to it.
 *
 * `server.ts` loads this module through Vite in development and from the
 * server build in production, so everything that should reload with the
 * app's code is imported from here, not from `server.ts`.
 */
import { createRequestHandler } from '@react-router/express';
import express from 'express';
import { createRealtimeServer } from '@/lib/realtime.server';
import { realtime as realtimeDefinition } from '@/realtime/handler.server';
import { siteOrigin } from '@/lib/site-origin.server';
import { renderHomepageMarkdown } from '@/lib/site-markdown';

export const app = express();

app.disable('x-powered-by');
app.get('/__horizons/health', (_req, res) => {
	res.status(200).json({ status: 'ok' });
});
app.get('/', (req, res, next) => {
	res.vary('Accept');
	if (req.accepts(['html', 'text/markdown']) !== 'text/markdown') return next();

	const origin = siteOrigin(new Request(`http://${req.get('host')}/`));
	res.type('text/markdown').send(renderHomepageMarkdown(origin));
});
app.use(
	createRequestHandler({
		build: () => import('virtual:react-router/server-build'),
		mode: process.env.NODE_ENV,
	}),
);

export const realtime = createRealtimeServer({ definition: realtimeDefinition });
