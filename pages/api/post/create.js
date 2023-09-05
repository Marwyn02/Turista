import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";

const CREATE = async (req, res) => {
  try {
    await connectMongoDB();
    const result = new Post(req.body);
    await result.save();
    return res.status(201).json({ success: true, message: "Post created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Post creation failed: " + error });
  }
};

export default CREATE;
