import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

type TProps = {
  image: string;
  public_id: string;
  userId: string;
  imageType: string;
};

export default async function Update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image, public_id, userId, imageType }: TProps = req.body;
  try {
    // Check if theres a id and image exists
    if (image && userId) {
      // Profile image update
      if (imageType === "profile_image") {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $set: {
              image: {
                image: image,
                public_id: public_id,
              },
            },
          },
          { new: true }
        );
      }
      // Cover photo update
      else if (imageType === "cover_photo") {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $set: {
              cover_photo: {
                image: image,
                public_id: public_id,
              },
            },
          },
          { new: true }
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: `Done!`,
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
