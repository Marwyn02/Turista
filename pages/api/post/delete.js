import Post from "@/models/Post";
import Review from "@/models/Review";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgzsmdvo4",
  api_key: "298783929249649",
  api_secret: "F_DuneWNgxWGN_-cX3MfRHQ-RT4",
});

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
