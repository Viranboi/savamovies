const mysql = require('mysql2');
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'savauser',
  password: 'savapassword',
  database: 'savamovies'
});

db.connect(err => {
  if (err) throw err;
  console.log('MariaDB connected');
});

module.exports = db;
