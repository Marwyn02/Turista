import Post from "@/models/Post";
import Review from "@/models/Review";

export default async function CountData(userId) {
  try {
    const PostCount = await Post.countDocuments({ user: userId });
    const ReviewCount = await Review.countDocuments({ user: userId });

    return { PostCount, ReviewCount };
  } catch (error) {
    throw new Error("Error made in countData", error);
  }
}
