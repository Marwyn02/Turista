import User from "@/models/User";

type TUserFindResponse = {
  id: string;
  name: string;
  image: {
    image: string;
    public_id: string;
  };
  followers: string[];
  cover_photo: {
    image: string;
    public_id: string;
  };
};

export default async function Find(userId: string): Promise<TUserFindResponse> {
  const user = await User.findById(userId); // Find the user by their userId

  const { id, name, image, followers, cover_photo }: TUserFindResponse = user; // Returns a user name from user.name

  return { id, name, image, followers, cover_photo };
}
