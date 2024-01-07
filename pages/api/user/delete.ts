import { NextApiRequest, NextApiResponse } from "next";
import Post from "@/models/Post";
import Review from "@/models/Review";
import User from "@/models/User";
import cloudinary from "@/utils/cloudinary/cloudinary";

export default async function Delete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 0. Get the user id from the request
  const { userId }: { userId: string } = req.body;
  try {
    // 1. PostArray - will find the user of every post that match the user id
    const posts = await Post.find({ user: userId });

    if (posts) {
      // 2. After the posts has taken, It will loop every post
      for (const post of posts) {
        // 2.1 After getting the post, this will going to take the posts image
        // 2.2 After getting the post image, now it will loop every public_id of every post.image
        for (const image of post.image) {
          // 2.3. This should delete the image from cloudinary
          await cloudinary.uploader.destroy(image.public_id);
        }
      }
    }

    // 3. After deleting the images, now this will delete the whole document of post
    await Post.deleteMany({ user: userId });

    // 4. Delete all reviews that match the post._id
    await Review.deleteMany({ user: userId });

    // 5. Get the user document
    const user = await User.findById({ _id: userId });

    // 6. Removes the user image by getting the public_id
    await cloudinary.uploader.destroy(user.image.public_id);

    // 7. Removes the user cover photo
    await cloudinary.uploader.destroy(user.cover_photo.public_id);

    // 8. Delete the user document
    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      success: true,
      message: `User has been deleted successfully!`,
      redirect: "/",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Deleting User} failed, `,
      error,
    });
  }
}
