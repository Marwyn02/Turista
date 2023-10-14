import Review from "@/models/Review";
import User from "@/models/User";

// This api is inside the [reviewId] which is not being used by the system
export default async function FindOne(reviewId) {
  const selectedReview = await Review.findById(reviewId); // Get the post data

  const userId = selectedReview.user.toString();
  const selectedUser = await User.findById(userId);

  return { selectedReview, selectedUser };
}
