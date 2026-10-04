import { query, getPool } from '../src/db.js';
import { config } from '../src/config.js';

const tables = await query('SHOW TABLES');
console.log(`Database: ${config.db.database} @ ${config.db.host}`);
for (const row of tables) {
  const name = Object.values(row)[0];
  const [{ c }] = await query(`SELECT COUNT(*) AS c FROM \`${name}\``);
  console.log(`  ${name}: ${c} rows`);
}
if (!tables.length) console.log('  (no tables)');
await getPool().end();
