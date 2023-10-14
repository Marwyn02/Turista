import Post from "@/models/Post";
import User from "@/models/User";

interface FindOneResponse {
  selectedResult: any;
  selectedUser: any;
}

export default async function FindOne(
  postId: string
): Promise<FindOneResponse> {
  const id: string = postId;

  // Get the post data
  const selectedResult = await Post.findById(id);

  // Get the user id from the post data
  const user: string = selectedResult.user.toString();

  // Get the user data
  const selectedUser = await User.findById(user);

  return { selectedResult, selectedUser };
}
