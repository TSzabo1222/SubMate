const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'submate'
});

db.connect(err => {
  if (err) {
    console.error('Adatbázis hiba:', err);
  } else {
    console.log('MySQL csatlakozva');
  }
});

module.exports = db;
