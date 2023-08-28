import { connectToDatabase } from "./connectToDatabase";

const getAllFromDatabase = async (collectionName) => {
  try {
    const { client, db } = await connectToDatabase();
    const dbCollection = db.collection(collectionName);
    const result = await dbCollection.find().toArray();
    client.close();
    return result;
  } catch (err) {
    console.log("Error in getFromDatabase", err);
  }
};

export { getAllFromDatabase };
