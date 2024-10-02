// api/clearEntries.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // 동일한 파일을 사용합니다.

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const entries = await db.collection('entries').listDocuments();
      const deletePromises = entries.map(doc => doc.delete());
      await Promise.all(deletePromises);
      res.status(200).json({ message: 'Entries cleared successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error clearing entries' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
