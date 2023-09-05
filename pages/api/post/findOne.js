import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";

const FindOne = async (postId) => {
  const Id = postId;
  await connectMongoDB();
  const selectedResult = await Post.findById(Id);
  return selectedResult;
};

export default FindOne;
