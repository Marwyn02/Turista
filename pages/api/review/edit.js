import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";
import Post from "@/models/Post";

const Edit = async (req, res) => {
  try {
    const { id, postId, description } = req.body;
    await connectMongoDB();

    await Review.updateOne(
      { _id: id },
      { $set: { description: description } },
      { new: true }
    );

    await Post.updateOne(
      { _id: postId, "reviews._id": id },
      { $set: { "reviews.$.description": description } },
      { new: true }
    );

    return res.status(201).json({ success: true, message: "Review updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Review updation failed: " + error });
  }
};

export default Edit;
