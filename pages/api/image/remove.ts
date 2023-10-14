import { Request, Response } from "express";
import Post from "@/models/Post";
import cloudinary from "@/utils/cloudinary/cloudinary";

interface RequestObject {
  id: string;
  image: { public_id: string };
}

export default async function remove(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id, image }: RequestObject = req.body;

    const post = await Post.findById(id);

    const imageIndex: number = post.image.findIndex(
      (img: { public_id: string }) => img.public_id === image.public_id
    );
    post.image.splice(imageIndex, 1);
    post.save();

    await cloudinary.uploader.destroy(image.public_id);

    console.log("Image deleted");
    return res
      .status(200)
      .json({ message: `Image: ${image.public_id} deleted successfully` });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Post creation failed: " + error });
  }
}
