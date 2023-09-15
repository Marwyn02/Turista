import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";
import User from "@/models/User";

const FindOne = async (reviewId) => {
  await connectMongoDB();
  const selectedReview = await Review.findById(reviewId); // Get the post data

  const userId = selectedReview.user.toString();
  const selectedUser = await User.findById(userId);

  return { selectedReview, selectedUser };
};

export default FindOne;
