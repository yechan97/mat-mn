// api/addEntry.js
const { MongoClient } = require("mongodb");

module.exports = async (req, res) => {
  const uri = "mongodb+srv://admin:aw0909@cluster0.mongodb.net/mat-management?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mat-management");
    const collection = database.collection("entries");

    if (req.method === "POST") {
      const entry = req.body;
      const result = await collection.insertOne(entry);
      res.status(200).json({ message: "Entry added successfully!", result });
    } else {
      res.status(405).json({ message: "Only POST requests are allowed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding entry", error });
  } finally {
    await client.close();
  }
};
