import { connectToDatabase } from "./connectToDatabase";

const insertToDatabase = async (collectionName, data) => {
  try {
    const { client, db } = await connectToDatabase();
    const dbCollection = db.collection(collectionName);
    const result = await dbCollection.insertOne(data);
    client.close();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { insertToDatabase };
