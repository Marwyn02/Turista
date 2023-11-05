import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

type TRequestObject = {
  postId: string;
  userId: string;
};

export default async function Check(req: NextApiRequest, res: NextApiResponse) {
  const { postId, userId }: TRequestObject = req.body;
  try {
    const post = await Post.findById(postId);

    // get the loves number
    const count: number = post.loves.length;

    if (post.loves.includes(userId)) {
      // if user already loved the post
      return res.status(200).json({
        // it returns boolean true to display loved post status
        success: true,
        loves: true,
        total_loves: count,
        message: "User has already loved this post",
      });
    }

    return res.status(200).json({
      success: true,
      loves: false,
      total_loves: count,
      message: `User haven't loves this post`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      loves: false,
      message: "Failed to check if there's a love",
      error,
    });
  }
}
