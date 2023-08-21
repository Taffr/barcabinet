import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'api_user',
  password: 'secret',
  database: 'cocktails',
});

console.log(await pool.execute('SELECT * FROM recipes;'))
