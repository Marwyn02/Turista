import type { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";
import cloudinary from "@/utils/cloudinary/cloudinary";

type TRequestObject = {
  id: string;
  image: { public_id: string };
};

export default async function remove(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, image }: TRequestObject = req.body;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const imageIndex: number = post.image.findIndex(
      (img: { public_id: string }) => img.public_id === image.public_id
    );

    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found in the post" });
    }

    post.image.splice(imageIndex, 1);
    await post.save();

    await cloudinary.uploader.destroy(image.public_id);

    console.log("Image deleted");
    return res
      .status(200)
      .json({ message: `Image: ${image.public_id} deleted successfully` });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Image deletion failed: " + error });
  }
}
