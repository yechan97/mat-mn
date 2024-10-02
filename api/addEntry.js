// api/addEntry.js
const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  // MongoDB 클라이언트 설정
  const uri = "YOUR_MONGODB_CONNECTION_STRING";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mat-management");
    const collection = database.collection("entries");

    // 요청 바디에서 데이터 가져오기
    const entry = req.body;

    // 데이터베이스에 데이터 삽입
    const result = await collection.insertOne(entry);
    res.status(200).json({ message: "Entry added successfully!", result });
  } catch (error) {
    res.status(500).json({ message: "Error adding entry", error });
  } finally {
    await client.close();
  }
};
