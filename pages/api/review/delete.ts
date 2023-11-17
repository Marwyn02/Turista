import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";
import Review from "@/models/Review";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id: reviewId, postId: postId } = req.body;
  // const reviewId: string = req.body.id;
  // const postId: string = req.body.postId;
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
      path: `/${postId}`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Deleting Review ID:${reviewId} failed, ` + error,
    });
  }
}
