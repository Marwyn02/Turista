import Post from "@/models/Post";
import cloudinary from "@/utils/cloudinary/cloudinary";

export default async function remove(req, res) {
  try {
    const { id, image } = req.body;

    const post = await Post.findById(id);

    const imageIndex = post.image.findIndex(
      (img) => img.public_id === image.public_id
    );
    post.image.splice(imageIndex, 1);
    post.save();

    await cloudinary.uploader.destroy(image.public_id);

    console.log("Image deleted");
    res
      .status(200)
      .json({ message: `Image: ${image.public_id} deleted successfully` });
  } catch (error) {
    throw new Error(error);
  }
}
