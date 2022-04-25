import { MongoClient } from "mongodb";
const dbName = "events";

export async function connectDatabase() {
  const url = "mongodb://localhost:27017";
  const client = await MongoClient.connect(url);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(dbName);

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db(dbName);

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
