import { Request, Response } from "express";
import Post from "@/models/Post";
import Review from "@/models/Review";
import cloudinary from "@/utils/cloudinary/cloudinary";

interface Image {
  image: string;
  public_id: string;
}

export default async function Delete(
  req: Request,
  res: Response
): Promise<Response> {
  const id: string = req.body.postId;
  try {
    const post = await Post.findById(id);
    const { image }: { image: Image[] } = post;

    for (const img of image) {
      // This should delete the image from cloudinary
      await cloudinary.uploader.destroy(img.public_id);
    }

    console.log("Image deleted successfully");

    // Delete the post
    await Post.findByIdAndDelete(id);

    // Delete the reviews in a post
    await Review.deleteMany({ post: id });

    return res.status(200).json({
      success: true,
      message: `Post ID:${id} has been deleted successfully!`,
      redirect: "/",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Deleting Post ID:${id} failed, `,
      error,
    });
  }
}
