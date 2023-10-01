import Post from "@/models/Post";
import Review from "@/models/Review";

export default async function Delete(req, res) {
  const reviewId = req.body.id;
  const postId = req.body.postId;
  try {
    // Find the post then update the reviews array to by pulling out the review object
    await Post.findByIdAndUpdate(
      { _id: postId },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    await Review.findByIdAndDelete(reviewId); // Delete the review object

    return res.status(200).json({
      success: true,
      message: `Review ID:${reviewId} is deleted!`,
      redirect: `/${postId}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Deleting Review ID:${reviewId} failed, ` + error,
    });
  }
}
