import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export default async function follower(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, active_user } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User: ${userId} not found`,
      });
    }

    if (user.followers.includes(active_user)) {
      user.followers = user.followers.filter(
        (follow: string) => follow !== active_user
      );

      await user.save();

      return res.status(200).json({
        // it returns boolean false to display unfollowed user status
        success: true,
        followed: false,
        message: `You have unfollowed this user: ${userId}`,
      });
    }

    user.followers.push(active_user);
    await user.save();

    return res.status(200).json({
      success: true,
      followed: true,
      message: `Followed`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      followed: false,
      message: `Failed to follow a user: ${userId}`,
      error: error,
    });
  }
}
