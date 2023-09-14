import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";

const FindOne = async (reviewId) => {
  await connectMongoDB();
  const selectedReview = await Review.findById(reviewId); // Get the post data

  return selectedReview;
};

export default FindOne;
