const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  // 올바른 MongoDB 연결 문자열 설정
  const uri = "mongodb+srv://admin:aw0909@cluster0.ugndf.mongodb.net/mat-management?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();  // MongoDB 연결 시도
    const database = client.db("mat-management");  // 데이터베이스 이름 설정
    const collection = database.collection("entries");

    if (req.method === "POST") {
      const entry = req.body;
      const result = await collection.insertOne(entry);  // 데이터 삽입
      res.status(200).json({ message: "Entry added successfully!", result });
    } else {
      res.status(405).json({ message: "Only POST requests are allowed" });
    }
  } catch (error) {
    console.error("Error adding entry:", error);
    res.status(500).json({ message: "Error adding entry", error: error.message });
  } finally {
    await client.close();
  }
};
