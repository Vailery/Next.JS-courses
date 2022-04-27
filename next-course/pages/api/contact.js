import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      const url = "mongodb://localhost:27017";
      client = await MongoClient.connect(url);
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Could not connect to database." });
      return;
    }

    const dbName = "next-blog";
    const db = client.db(dbName);

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ message: error.message || "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfuly stored message!", message: newMessage });
  }
}

export default handler;
