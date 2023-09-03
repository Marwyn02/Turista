import { connectMongoDB } from "../../lib/connectMongoDB";

const getAll = async (collectionName) => {
  try {
    const { client, db } = await connectMongoDB();
    const dbCollection = db.collection(collectionName);
    const result = await dbCollection.find().toArray();
    client.close();
    return result;
  } catch (err) {
    throw new Error("Error in getFromDatabase: ", err);
  }
};

export { getAll };
