import { Request, Response } from "express";
import Post from "@/models/Post";

export default async function like(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      // check if there's an existing post
      return res.status(404).json({
        success: false,
        liked: false,
        message: "Post not found",
      });
    }

    // If the user disliked the post, then this will run
    // to filter the user id and remove the user id from the post database
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((like: string) => like !== userId);

      await post.save();

      // if user already liked the post
      return res.status(400).json({
        // it returns boolean true to display liked post status
        success: false,
        liked: false,
        message: "User unliked the post",
      });
    }

    // Push the user's user id to the post.likes. array
    post.likes.push(userId);
    await post.save(); // save it here

    return res.status(200).json({
      success: true,
      liked: true,
      message: `Like has been successfully sent!`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      liked: false,
      message: "Failed to send a Like",
      error,
    });
  }
}
