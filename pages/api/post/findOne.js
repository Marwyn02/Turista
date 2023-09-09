import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";
import User from "@/models/User";

const FindOne = async (postId) => {
  const Id = postId;
  await connectMongoDB();
  const selectedResult = await Post.findById(Id);

  const user = selectedResult.user.toString();
  const selectedUser = await User.findById(user);
  console.log(selectedUser);
  return selectedResult;
};

export default FindOne;
