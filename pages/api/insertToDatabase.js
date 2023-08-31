import { connectMongoDB } from "./connectMongoDB";

const insertToDatabase = async (collectionName, data) => {
  try {
    const { client, db } = await connectMongoDB();
    const dbCollection = db.collection(collectionName);
    const result = await dbCollection.insertOne(data);
    console.log("INSERT: ", data);
    client.close();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { insertToDatabase };
