const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'win-server',
  user: 'cs2302017',
  password: 'cs2302017',
  database: 'cs2302017',
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err.stack);
    process.exit(1);
  } else {
    console.log('Connected to MySQL DB');
  }
});

module.exports = db;
