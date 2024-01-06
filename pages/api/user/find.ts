import User from "@/models/User";

interface UserFindResponse {
  id: string;
  name: string;
  image: string;
  followers: string[];
  cover_photo: {
    image: string;
    public_id: string;
  };
}

export default async function Find(userId: string): Promise<UserFindResponse> {
  const user = await User.findById(userId); // Find the user by their userId

  const { id, name, image, followers, cover_photo }: UserFindResponse = user; // Returns a user name from user.name

  return { id, name, image, followers, cover_photo };
}
