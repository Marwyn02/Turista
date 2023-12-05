import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";

export default async function Edit(req: NextApiRequest, res: NextApiResponse) {
  const { name, id }: { name: string; id: string } = req.body;
  try {
    // Check if theres a id and name
    if (id && name) {
      await User.updateOne(
        {
          _id: id,
        },
        { $set: { name: name } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: `User: ${id} has been updated!`,
      path: `/user/settings`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Updating User ID:${id} failed! `,
      error,
    });
  }
}
