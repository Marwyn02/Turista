import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";
import User from "@/models/User";

const FindOne = async (postId) => {
  const Id = postId;
  await connectMongoDB();
  const selectedResult = await Post.findById(Id); // Get the post data

  const user = selectedResult.user.toString(); // Get the user id from the post data
  const selectedUser = await User.findById(user); // Get the user data

  return { selectedResult, selectedUser };
};

export default FindOne;
