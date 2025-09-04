// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection()
  .then(conn => {
    console.log(`✅ MySQL: conexión establecida con ${process.env.DB_HOST || 'localhost'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL: no pudo conectar vía TCP:', err);
  });

module.exports = {
  query: (sql, params) => pool.execute(sql, params),
};
