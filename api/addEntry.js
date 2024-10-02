// api/addEntry.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Firebase 콘솔에서 이 파일을 다운로드해야 합니다.

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const entry = req.body;

    try {
      await db.collection('entries').add(entry);
      res.status(200).json({ message: 'Entry added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding entry' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
