const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.RAILWAY_PRIVATE_DOMAIN || '127.0.0.1',
  user: process.env.MYSQLUSER || 'savauser',
  password: process.env.MYSQL_ROOT_PASSWORD || 'savapassword',
  database: process.env.MYSQL_DATABASE || 'savamovies',
  port: 3306,
});

db.connect(err => {
  if (err) throw err;
  console.log('MariaDB connected');
});

module.exports = db;
