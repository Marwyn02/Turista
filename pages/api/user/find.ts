import User from "@/models/User";

interface UserFindResponse {
  name: string;
  image: string;
}

export default async function Find(userId: string): Promise<UserFindResponse> {
  const user = await User.findById(userId); // Find the user by their userId

  const { name, image }: UserFindResponse = user; // Returns a user name from user.name

  return { name, image };
}
