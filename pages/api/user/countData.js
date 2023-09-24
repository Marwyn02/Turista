import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";
import Review from "@/models/Review";

const countData = async (userId) => {
  try {
    await connectMongoDB();
    const PostCount = await Post.countDocuments({ user: userId });
    const ReviewCount = await Review.countDocuments({ user: userId });

    return { PostCount, ReviewCount };
  } catch (error) {
    throw new Error("Error made in countData", error);
  }
};

export default countData;
