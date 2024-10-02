// api/getEntries.js
const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  const uri = "YOUR_MONGODB_CONNECTION_STRING";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mat-management");
    const collection = database.collection("entries");

    // 데이터 조회
    const entries = await collection.find({}).toArray();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching entries", error });
  } finally {
    await client.close();
  }
};
