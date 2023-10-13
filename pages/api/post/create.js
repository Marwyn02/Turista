import Post from "@/models/Post";

export default async function create(req, res) {
  // But if it dont have post id, then it will create a post. But of course
  // this is a post create api call because creating a post doesn't request a post id
  // CREATE POST
  try {
    const result = new Post(req.body);
    await result.save();
    return res
      .status(200)
      .json({ success: true, message: "Post created", redirect: "/" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Post creation failed: " + error });
  }
}
