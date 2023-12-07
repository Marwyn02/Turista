import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image, userId }: { image: string; userId: string } = req.body;
  try {
    // Check if theres a id and image exists
    if (image && userId) {
      await User.updateOne(
        {
          _id: userId,
        },
        { $set: { image: image } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: `User: ${userId} has been updated!`,
      path: `/user/settings`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Updating User ID:${userId} failed! `,
      error,
    });
  }
}
