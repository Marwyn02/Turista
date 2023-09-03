import { connectMongoDB } from "../../lib/connectMongoDB";
import { ObjectId } from "mongodb";

const updateFromDatabase = async (updatedPost) => {
  try {
    const { client, db } = await connectMongoDB();
    const { id, title, location, description } = updatedPost;

    const result = await db
      .collection("post_collection")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { title: title, location: location, description: description } }
      );
    await client.close();

    return result;
  } catch (error) {
    throw new Error("Update failed: " + error.message);
  }
};

export default updateFromDatabase;
