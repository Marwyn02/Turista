import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";
import User from "@/models/User";

export default async function route(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const result = await User.create({
    //   username,
    //   email,
    //   password: hashedPassword,
    // });
    return res.status(201).json({ success: true, message: "User created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User creation failed: " + error });
  }
}
