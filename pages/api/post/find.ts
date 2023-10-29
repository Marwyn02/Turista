import Post from "@/models/Post";
import User from "@/models/User";

interface FindOneResponse {
  selectedPost: any;
  selectedUser: any;
}

export default async function FindOne(
  postId: string
): Promise<FindOneResponse> {
  const id: string = postId;

  // Get the post data
  const selectedPost = await Post.findById(id);

  // Get the user id from the post data
  const user: string = selectedPost.user.toString();

  // Get the user data
  const selectedUser = await User.findById(user);

  return { selectedPost, selectedUser };
}
