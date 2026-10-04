import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { ensureSchema } from './migrate.js';
import { seedIfNeeded } from './seed.js';
import { publicRouter, adminRouter } from './routes/index.js';

let bootPromise = null;

export async function boot() {
  if (!bootPromise) {
    bootPromise = (async () => {
      await ensureSchema();
      await seedIfNeeded();
    })().catch((err) => {
      bootPromise = null;
      throw err;
    });
  }
  return bootPromise;
}

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(
    cors({
      // CORS_ORIGIN=* → reflect request origin (works with credentials)
      origin:
        !config.corsOrigin || config.corsOrigin.trim() === '*'
          ? true
          : config.corsOrigin.split(',').map((s) => s.trim()),
      credentials: true,
    })
  );
  // Collaborate uploads arrive as base64 JSON (2 files × 2.5 MB max).
  app.use(express.json({ limit: '8mb' }));

  app.get('/api/health', async (_req, res) => {
    try {
      await boot();
      res.json({ ok: true, service: 'dhvani-api' });
    } catch (e) {
      res.status(500).json({ ok: false, error: e.message });
    }
  });

  app.use(async (_req, res, next) => {
    try {
      await boot();
      next();
    } catch (e) {
      console.error('Boot failed:', e);
      res.status(500).json({ success: false, error: 'Database initialization failed: ' + e.message });
    }
  });

  app.use('/api', publicRouter);
  app.use('/api/admin', adminRouter);

  app.use('/api', (_req, res) => res.status(404).json({ success: false, error: 'Not found' }));

  app.use((err, _req, res, _next) => {
    console.error(err);
    const status = err.type === 'entity.too.large' ? 413 : 500;
    res.status(status).json({
      success: false,
      error: status === 413 ? 'Upload too large — please keep files under 2.5 MB' : err.message || 'Server error',
    });
  });

  return app;
}
