import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";
import Review from "@/models/Review";

interface EditObject {
  id: string;
  postId: string;
  description: string;
}

export default async function Edit(req: NextApiRequest, res: NextApiResponse) {
  const { id, postId, description }: EditObject = req.body;
  try {
    await Review.updateOne(
      { _id: id },
      { $set: { description: description } },
      { new: true }
    );

    await Post.updateOne(
      { _id: postId, "reviews._id": id },
      { $set: { "reviews.$.description": description } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Review ID:${id} has been updated!`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Updating Review ID:${id} failed, `,
      error,
    });
  }
}
