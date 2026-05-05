const {Pool} = require('pg');

const p = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'lowveldhub',
  user: 'postgres',
  password: '@Queen000'
});

p.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name='users' ORDER BY ordinal_position")
  .then(r => {
    console.log('Users table columns:');
    r.rows.forEach(col => console.log(`  - ${col.column_name} (${col.data_type})`));
    p.end();
  })
  .catch(e => {
    console.error('Error:', e.message);
    p.end();
  });
