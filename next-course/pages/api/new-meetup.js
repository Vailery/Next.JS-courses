import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const url = "mongodb://localhost:27017";
    const client = await MongoClient.connect(url);

    const dbName = "next-meetups";
    const db = client.db(dbName);

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
