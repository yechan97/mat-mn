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
    if (req.method === 'POST') {
      const entry = req.body;

      try {
        await db.collection('entries').add(entry);
        res.status(200).json({ message: 'Entry added successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding entry' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  });
};
