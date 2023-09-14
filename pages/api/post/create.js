import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";
import Review from "@/models/Review";

const CREATE = async (req, res) => {
  const reviewPermission = req.body.post; // This will confirm if the request has a post id
  if (reviewPermission) {
    // If the request has a post id then it will run this code for creating a new review
    try {
      await connectMongoDB();
      const postId = reviewPermission;
      const review = new Review(req.body);

      const post = await Post.findById(postId); // Get the Post by the Id

      post.reviews.push(review); // Push the review document to the post document

      await review.save();
      await post.save();
      return res.status(201).json({ success: true, message: "Review created" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Review creation failed: " + error });
    }
  }
  // But if it dont have post id, then it will create a post. But of course
  // this is a post create api call because creating a post doesn't request a post id
  else {
    try {
      await connectMongoDB();
      const result = new Post(req.body);
      await result.save();
      return res.status(201).json({ success: true, message: "Post created" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Post creation failed: " + error });
    }
  }
};

export default CREATE;
