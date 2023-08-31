import { connectToDatabase } from "./connectToDatabase";
import getOne from "./getOne";

const updateFromDatabase = async (collectionName, postId, data) => {
  try {
    const { client, db } = await connectToDatabase();
    const response = await getOne(collectionName, postId); // we get the object from the database
    const dbCollection = db.collection(collectionName);

    const result = await dbCollection.updateOne(
      { _id: postId },
      { $set: data }
    );
    await client.close();
  } catch (error) {}
};

export default updateFromDatabase;
