import { connectMongoDB } from "@/lib/connectMongoDB";
import User from "@/models/User";

const GETONE = async (userId) => {
  try {
    await connectMongoDB();
    const user = await User.findById(userId); // Find the user by their userId

    const Username = user.name; // Returns a user name from user.name

    return Username;
  } catch (error) {
    console.log("Error in review find: ", error);
  }
};

export default GETONE;
