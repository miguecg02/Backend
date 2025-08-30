// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'myUserBD',
  password: process.env.DB_PASSWORD || '2002',
  database: process.env.DB_NAME || 'GestionEnMovilidad_BD',
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
