import Review from "@/models/Review";
import Post from "@/models/Post";

export default async function Edit(req, res) {
  try {
    const { id, postId, description } = req.body;
    await Review.updateOne(
      { _id: id },
      { $set: { description: description } },
      { new: true }
    );

    await Post.updateOne(
      { _id: postId, "reviews._id": id },
      { $set: { "reviews.$.description": description } },
      { new: true }
    );

    return res
      .status(200)
      .json({
        success: true,
        message: `Review ID:${id} has been updated!`,
        redirect: `/${postId}`,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: `Updating Review ID:${id} failed, `,
        error,
      });
  }
}
