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
    throw new Error("Error deleting post: ", err);
  }
};

export default deleteOneFromDatabase;
