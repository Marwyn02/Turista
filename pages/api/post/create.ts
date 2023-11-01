import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = new Post(req.body);
    await result.save();

    return res
      .status(200)
      .json({ success: true, message: "Post created", redirect: "/" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Post creation failed: " + error });
  }
}
