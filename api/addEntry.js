const sqlite3 = require('sqlite3').verbose();
const path = require('path');

module.exports = async (req, res) => {
  const dbPath = path.resolve('data.db');
  const db = new sqlite3.Database(dbPath);

  if (req.method === 'POST') {
    const { name, type, color, quantity, comment } = req.body;

    // 데이터베이스에 테이블 생성 (한 번만 실행)
    db.run(
      `CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        color TEXT,
        quantity INTEGER,
        comment TEXT
      )`,
      (error) => {
        if (error) {
          return res.status(500).json({ message: 'Error creating table', error });
        }

        // 데이터 삽입
        const query = `INSERT INTO entries (name, type, color, quantity, comment) VALUES (?, ?, ?, ?, ?)`;
        db.run(query, [name, type, color, quantity, comment], function (error) {
          if (error) {
            return res.status(500).json({ message: 'Error inserting data', error });
          }
          res.status(200).json({ message: 'Entry added successfully!', id: this.lastID });
        });
      }
    );
  } else {
    res.status(405).json({ message: 'Only POST requests are allowed' });
  }
};
