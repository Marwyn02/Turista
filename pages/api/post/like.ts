import { Request, Response } from "express";
import Post from "@/models/Post";

export default async function like(
  req: Request,
  res: Response
): Promise<Response> {
  const { postId, userId, likeCount } = req.body;

  //   console.log(req.body);

  // Post like + 1

  const post = await Post.findById(postId);

  // post.likes

  return res.status(200).json({
    success: true,
    message: `Like has been successfully sent!`,
  });
}
