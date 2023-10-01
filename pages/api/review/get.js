import Review from "@/models/Review";

const GET = async (postId) => {
  try {
    const result = await Review.find({ post: postId });

    return result;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default GET;
