import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";

const DELETE = async (req, res) => {
  try {
    await connectMongoDB();

    const Id = req.body.postId;
    await Post.findByIdAndDelete(Id); // Delete the post

    return res.status(201).json({ success: true, message: "Post deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Post deletion failed: " + error });
  }
};

export default DELETE;
