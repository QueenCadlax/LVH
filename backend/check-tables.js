const {Pool} = require('pg');

const p = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'lowveldhub',
  user: 'postgres',
  password: '@Queen000'
});

p.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
  .then(r => {
    console.log('Tables in lowveldhub database:');
    if (r.rows.length === 0) {
      console.log('  NO TABLES FOUND!');
    } else {
      r.rows.forEach(t => console.log('  -', t.table_name));
    }
    p.end();
  })
  .catch(e => {
    console.error('Error:', e.message);
    p.end();
  });
