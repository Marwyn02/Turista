import User from "@/models/User";

export default async function GetOne(userId) {
  try {
    const user = await User.findById(userId); // Find the user by their userId

    const { name, image } = user; // Returns a user name from user.name

    return { name, image };
  } catch (error) {
    console.log("Error in review find: ", error);
  }
}
