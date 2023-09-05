import { connectMongoDB } from "@/lib/connectMongoDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const POST = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB();
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, message: "User created: " + result });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User creation failed: " + error });
  }
};

export default POST;
