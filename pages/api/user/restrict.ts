import { Request, Response } from "express";
import Post from "@/models/Post";

export default async function restrict(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const userId: string = req.body.userId;

    const userHasCreatedPost: number = await Post.countDocuments({
      user: userId,
    });

    if (userHasCreatedPost < 1) {
      return res.status(200).json({ userHasNoCreatedPost: true });
    } else {
      return res.status(200).json({
        userHasNoCreatedPost: false,
        redirect: "/",
        message: "You're restricted to create another post!",
      });
    }
  } catch (error: any) {
    return res.status(500).json({ error: "Server error" });
  }
}
