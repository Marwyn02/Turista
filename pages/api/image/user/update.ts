import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    image,
    userId,
    imageType,
  }: { image: string; userId: string; imageType: string } = req.body;
  try {
    // Check if theres a id and image exists
    if (image && userId) {
      if (imageType === "profile_image") {
        await User.updateOne(
          {
            _id: userId,
          },
          { $set: { image: image } },
          { new: true }
        );
      } else if (imageType === "cover_photo") {
        await User.updateOne(
          {
            _id: userId,
          },
          { $set: { cover_photo: image } },
          { new: true }
        );
      }
    }

    console.log(req.body);

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
