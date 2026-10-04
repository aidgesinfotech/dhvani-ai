import { createApp, boot } from './app.js';
import { config } from './config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`Dhvani.ai API listening on http://localhost:${config.port}`);
});

// Warm up schema/seed in the background; if the remote DB is briefly unreachable,
// every request retries boot() so the server recovers without a restart.
boot().catch((err) => {
  console.error('Database not reachable yet — will retry on next request:', err.code || err.message);
});
