import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";
import Post from "@/models/Post";

const CREATE = async (req, res) => {
  try {
    await connectMongoDB();
    const postId = req.body.post;
    const review = new Review(req.body);

    const post = await Post.findById(postId); // Get the Post by the Id

    post.reviews.push(review); // Push the review document to the post document

    await review.save();
    await post.save();
    return res.status(201).json({ success: true, message: "Review created" });
  } catch (error) {
    console.log("Error creating review", error);
  }
};

export default CREATE;
