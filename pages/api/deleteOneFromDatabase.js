import { ObjectId } from "mongodb";
import { connectMongoDB } from "./connectMongoDB";

const deleteOneFromDatabase = async (collectionName, id) => {
  try {
    const { client, db } = await connectMongoDB();
    const dbCollection = db.collection(collectionName);
    const deletedPost = await dbCollection.findOneAndDelete({
      _id: new ObjectId(id),
    });
    await client.close();
    return deletedPost;
  } catch (err) {
    console.log("Error deleting post: ", err);
    throw err;
  }
};

export default deleteOneFromDatabase;
