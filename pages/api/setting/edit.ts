import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export default async function Edit(req: NextApiRequest, res: NextApiResponse) {
  const { name, userId }: { name: string; userId: string } = req.body;
  try {
    // Check if theres a userId and name
    if (userId && name) {
      await User.updateOne(
        {
          _id: userId,
        },
        { $set: { name: name } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: `Your name successfully changed to ${name}! Btw, nice name`,
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
