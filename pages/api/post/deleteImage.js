import Post from "@/models/Post";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dgzsmdvo4",
  api_key: "298783929249649",
  api_secret: "F_DuneWNgxWGN_-cX3MfRHQ-RT4",
});

export default async function Delete(req, res) {
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
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
}
