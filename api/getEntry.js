const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();

module.exports = (req, res) => {
  cors(req, res, async () => {
    if (req.method === 'GET') {
      try {
        const snapshot = await db.collection('entries').get();
        const entries = snapshot.docs.map(doc => doc.data());
        res.status(200).json(entries);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching entries' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
};
