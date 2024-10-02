const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async (req, res) => {
  const dbPath = path.resolve('data.db');
  const db = new sqlite3.Database(dbPath);

  try {
    db.all(`SELECT * FROM entries`, [], (error, rows) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching entries', error });
      } else {
        res.status(200).json(rows);
      }
    });
  } finally {
    db.close();
  }
};
