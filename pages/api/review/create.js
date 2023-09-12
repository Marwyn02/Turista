import { connectMongoDB } from "@/lib/connectMongoDB";
import Review from "@/models/Review";

const CREATE = async (req, res) => {
  try {
    await connectMongoDB();
    const result = new Review(req.body);
    await result.save();
    return res.status(201).json({ success: true, message: "Post created" });
  } catch (error) {
    console.log("Error creating review", error);
  }
};

export default CREATE;
