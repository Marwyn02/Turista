import { ObjectId } from "mongodb";
import { connectToDatabase } from "./connectToDatabase";

const getOneFromDatabase = async (collectionName, postId) => {
  try {
    const { client, db } = await connectToDatabase();
    const dbCollection = db.collection(collectionName);
    const selectedResult = await dbCollection.findOne({
      _id: new ObjectId(postId),
    });
    client.close();
    return selectedResult;
  } catch (err) {
    console.log(err, " Error in getOneFromDatabase");
    return null;
  }
};

export default getOneFromDatabase;
