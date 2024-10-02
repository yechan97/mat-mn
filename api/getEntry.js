// api/getEntries.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // 동일한 파일을 사용합니다.

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const snapshot = await db.collection('entries').get();
      const entries = snapshot.docs.map(doc => doc.data());
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching entries' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
