import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";

const DELETE = async (req, res) => {
  try {
    const Id = req.body.postId;
    await connectMongoDB();
    await Post.findByIdAndDelete(Id);
    return res.status(201).json({ success: true, message: "Post deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Post deletion failed: " + error });
  }
};

export default DELETE;
