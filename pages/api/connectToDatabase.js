import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db();
  return { client, db };
};

export { connectToDatabase };
