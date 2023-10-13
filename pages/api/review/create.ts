import { Request, Response } from "express";
import Post from "@/models/Post";
import Review from "@/models/Review";

export default async function create(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const postId: string = req.body.post; // The post id

    const review = new Review(req.body);
    const post = await Post.findById(postId); // Get the Post by the Id

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    post.reviews.push(review); // Push the review document to the post document

    // Save the review into the post and review collection
    await review.save();
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Review created",
      redirect: `/${postId}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Review creation failed: ", error });
  }
}
