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
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "User has already liked this post",
      });
    }

    post.likes.push(userId);
    await post.save();

    console.log("Like: ", post.likes);

    // post.likess

    return res.status(200).json({
      success: true,
      message: `Like has been successfully sent!`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to send a Like",
      error,
    });
  }
}
