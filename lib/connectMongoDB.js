import { MongoClient } from "mongodb";
// import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI = process.env.MONGODB_URI;
const options = { useUnifiedTopology: true, useNewUrlParser: true };

// let client;
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(MONGODB_URI, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(MONGODB_URI, options);
//   clientPromise = client.connect();
// }

// export const connectMongoDB = async () => mongoose.connect(MONGODB_URI);

// export { clientPromise };

const connectMongoDB = async () => {
  const client = await MongoClient.connect(MONGODB_URI, options);
  const db = client.db();
  return { client, db };
};

export { connectMongoDB };
