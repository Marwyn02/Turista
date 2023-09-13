import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";

const GET = async (postId) => {
  try {
    await connectMongoDB();
    const result = await Review.find({ post: postId });

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default GET;
