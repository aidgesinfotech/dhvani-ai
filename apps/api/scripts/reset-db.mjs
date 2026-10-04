/**
 * Drops every table and re-seeds fresh Dhvani.ai content.
 * DESTRUCTIVE: deletes all leads and CMS edits. Usage: npm run db:reset -- --yes
 */
import { query, getPool } from '../src/db.js';
import { config } from '../src/config.js';
import { ALL_TABLES, ensureSchema } from '../src/migrate.js';
import { seedIfNeeded } from '../src/seed.js';

if (!process.argv.includes('--yes')) {
  console.log(`This will DELETE all data in "${config.db.database}" and re-seed it.`);
  console.log('Re-run with:  npm run db:reset -- --yes');
  process.exit(1);
}

// ALL_TABLES is ordered children-first, so foreign keys never block the drops.
for (const t of ALL_TABLES) {
  await query(`DROP TABLE IF EXISTS \`${t}\``);
}
console.log(`✓ Dropped all tables in ${config.db.database}`);

await ensureSchema();
await seedIfNeeded();
await getPool().end();
console.log('✓ Reset complete');
