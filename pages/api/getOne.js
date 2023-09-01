import { ObjectId } from "mongodb";
import { connectMongoDB } from "./connectMongoDB";

const getOne = async (postId) => {
  try {
    const { client, db } = await connectMongoDB();
    const selectedResult = await db.collection("post_collection").findOne({
      _id: new ObjectId(postId),
    });
    client.close();
    return selectedResult;
  } catch (err) {
    throw new Error("ERROR in GETONE: " + err);
  }
};

export default getOne;
