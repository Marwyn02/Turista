import { connectMongoDB } from "@/lib/connectMongoDB";
import Post from "@/models/Post";

const Edit = async (req, res) => {
  try {
    const { id, title, location, description, amenities } = req.body;
    await connectMongoDB();
    const result = await Post.findByIdAndUpdate(id, {
      $set: {
        title: title,
        location: location,
        description: description,
        amenities: amenities,
      },
    });
    await result.save();
    return res.status(201).json({ success: true, message: "Post updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Post updation failed: " + error });
  }
};

export default Edit;
