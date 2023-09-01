import { connectMongoDB } from "./connectMongoDB";

const insertToDatabase = async (collectionName, data) => {
  try {
    const { client, db } = await connectMongoDB();
    const dbCollection = db.collection(collectionName);
    const result = await dbCollection.insertOne(data);

    client.close();
    return result;
  } catch (err) {
    throw new Error("Error in insert to database: ", err);
  }
};

export { insertToDatabase };
