import Post from "@/models/Post";

export default async function edit(req, res) {
  try {
    const { id, image, title, location, description, amenities } = req.body;
    const result = await Post.findByIdAndUpdate(id, {
      $set: {
        title: title,
        image: image,
        location: location,
        description: description,
        amenities: amenities,
      },
    });

    await result.save();
    return res.status(200).json({
      success: true,
      message: `Post ID:${id} has been updated successfully!`,
      redirect: `/${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Post ID:${id} updation failed, `,
      error,
    });
  }
}
