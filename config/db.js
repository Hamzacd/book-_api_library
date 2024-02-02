const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '',
  database: 'book_library',
});

module.exports = pool;
