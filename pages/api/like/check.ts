import { Request, Response } from "express";
import Post from "@/models/Post";

export default async function Check(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);

    // get the likes number
    const count: number = post.likes.length;

    if (post.likes.includes(userId)) {
      // if user already liked the post
      return res.status(200).json({
        // it returns boolean true to display liked post status
        success: true,
        liked: true,
        total_likes: count,
        message: "User has already liked this post",
      });
    }

    return res.status(200).json({
      success: true,
      liked: false,
      total_likes: count,
      message: `User haven't liked this post`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      liked: false,
      message: "Failed to check if there's a like",
      error,
    });
  }
}
