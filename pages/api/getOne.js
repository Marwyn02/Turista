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
    console.log(err, " Error in getOne");
    return null;
  }
};

export default getOne;
