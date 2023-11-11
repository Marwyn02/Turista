import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = new Post(req.body);

    if (!result) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Something wrong with the request",
          redirect: "/",
        });
    }

    // Save the result of the request
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
