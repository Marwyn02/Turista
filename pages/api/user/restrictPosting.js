import Post from "@/models/Post";

export default async function restrictPosting(req, res) {
  try {
    const userId = req.body.userId;

    const userHasCreatedPost = await Post.countDocuments({ user: userId });

    if (userHasCreatedPost < 1) {
      return res.status(200).json({ userHasCreatedPost: true });
    } else {
      return res
        .status(200)
        .json({
          userHasCreatedPost: false,
          redirect: "/",
          message: "You're restricted to create another post!",
        });
    }
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
