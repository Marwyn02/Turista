import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

export default async function love(req: NextApiRequest, res: NextApiResponse) {
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

    // If the user unloved the post, then this will run
    // to filter the user id and remove the user id from the post database
    if (post.loves.includes(userId)) {
      // This will remove the user id from the loves array of the client
      post.loves = post.loves.filter((love: string) => love !== userId);

      await post.save();

      const count: number = post.loves.length;

      // if user already loved the post
      return res.status(200).json({
        // it returns boolean false to display unloved post status
        success: true,
        loves: false,
        total_loves: count,
        message: "User unloved the post",
      });
    }

    // Push the user's user id to the post.loves. array
    post.loves.push(userId);
    await post.save(); // save it here

    const count: number = post.loves.length;

    return res.status(200).json({
      success: true,
      loves: true,
      total_loves: count,
      message: `Love has been successfully sent!`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      loves: false,
      message: "Failed to send a love",
      error,
    });
  }
}
