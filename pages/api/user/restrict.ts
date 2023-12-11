import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

export default async function restrict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userId: string = req.body.userId;

    const userHasCreatedPost: number = await Post.countDocuments({
      user: userId,
    });

    // If not created a single post
    if (userHasCreatedPost < 1) {
      // This will allow the client to create a post
      return res.status(200).json({
        userHasCreatedPost: false,
      });
    } else {
      // If yes
      return res.status(200).json({
        userHasCreatedPost: true,
        redirect: "/",
        message: "You're restricted to create another post!",
      });
    }
  } catch (error: any) {
    return res.status(500).json({ message: "User restriction error" });
  }
}
