const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async (req, res) => {
  const dbPath = path.resolve('data.db');
  const db = new sqlite3.Database(dbPath);

  // 모든 데이터 조회
  db.all(`SELECT * FROM entries`, [], (error, rows) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching data', error });
    }
    res.status(200).json(rows);
  });
};
