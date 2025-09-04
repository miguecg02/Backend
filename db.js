// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || '127.0.0.1',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
  database: process.env.MYSQLDATABASE ||  'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


pool.getConnection()
  .then(conn => {
    console.log(`✅ MySQL: conexión establecida con ${process.env.MYSQLHOST || 'localhost'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL: no pudo conectar vía TCP:', err);
  });

module.exports = {
  query: (sql, params) => pool.execute(sql, params),
};
