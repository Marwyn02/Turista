import Post from "@/models/Post";

export default async function Delete(req, res) {
  const id = req.body.postId;
  try {
    await Post.findByIdAndDelete(id); // Delete the post

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
