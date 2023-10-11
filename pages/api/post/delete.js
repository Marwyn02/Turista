import Post from "@/models/Post";
import Review from "@/models/Review";
import cloudinary from "@/utils/cloudinary/cloudinary";

export default async function Delete(req, res) {
  const id = req.body.postId;
  try {
    const post = await Post.findById(id);
    const { image } = post;

    for (const img of image) {
      // This should delete the image from cloudinary
      await cloudinary.uploader.destroy(img.public_id);
    }
    // Delete the post
    await Post.findByIdAndDelete(id);

    // Delete the reviews in a post
    await Review.deleteMany({ post: id });

    return res.status(200).json({
      success: true,
      message: `Post ID:${id} has been deleted successfully!`,
      redirect: "/",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Deleting Post ID:${id} failed, `,
      error,
    });
  }
}
