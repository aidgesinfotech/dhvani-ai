import { createApp } from '../apps/api/src/app.js';

/**
 * Vercel serverless entry for all `/api/*` routes.
 * vercel.json rewrites `/api/:path*` → `/api` so Express can route.
 */
const app = createApp();

export default app;
