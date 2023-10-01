import Post from "@/models/Post";
import User from "@/models/User";

export default async function FindOne(postId) {
  const id = postId;
  const selectedResult = await Post.findById(id); // Get the post data

  const user = selectedResult.user.toString(); // Get the user id from the post data
  const selectedUser = await User.findById(user); // Get the user data

  return { selectedResult, selectedUser };
}
