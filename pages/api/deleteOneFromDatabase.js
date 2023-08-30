import { ObjectId } from "mongodb";
// import mongoose from "mongoose";
import { connectToDatabase } from "./connectToDatabase";

const deleteOneFromDatabase = async (collectionName, id) => {
  try {
    const { client, db } = await connectToDatabase();
    const dbCollection = db.collection(collectionName);
    console.log("Delete this: ", id);
    const deletedPost = await dbCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    console.log(deletedPost);
    await client.close();
    return deletedPost;
  } catch (err) {
    console.log("Error deleting post: ", err);
    throw err;
  }
};

export default deleteOneFromDatabase;
