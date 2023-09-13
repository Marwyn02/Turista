import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";
import Review from "@/models/Review";

const DELETE = async (req, res) => {
  try {
    await connectMongoDB();

    const reviewId = req.body.id;
    const postId = req.body.postId;

    // Find the post then update the reviews array to by pulling out the review object
    await Post.findByIdAndUpdate(
      { _id: postId },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    await Review.findByIdAndDelete(reviewId); // Delete the review object

    return res.status(201).json({ success: true, message: "Review deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Review deletion failed: " + error });
  }
};

export default DELETE;
