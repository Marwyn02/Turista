import Post from "@/models/Post";
import Review from "@/models/Review";

interface CountDataResponse {
  PostCount: any;
  ReviewCount: any;
}

export default async function Count(
  userId: string
): Promise<CountDataResponse> {
  const PostCount: number = await Post.countDocuments({ user: userId });
  const ReviewCount: number = await Review.countDocuments({ user: userId });

  return { PostCount, ReviewCount };
}
