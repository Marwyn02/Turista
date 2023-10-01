import User from "@/models/User";

export default async function FindUser(userId) {
  try {
    const user = await User.findById(userId); // Find the user by their userId

    const { name, image } = user; // Returns a user name from user.name

    return { name, image };
  } catch (error) {
    throw new Error("Error in user find: ", error);
  }
}
