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
    // > Get the user (userId) post details from POST COLLECTION
    const posts = await Post.find({ user: userId });

    if (posts.length !== 0) {
      // 2. After the posts has taken, It will loop every post
      for (const post of posts) {
        // 2.1 After getting the post, this will going to take the posts image
        // 2.2 After getting the post image, now it will loop every public_id of every post.image
        for (const image of post.image) {
          // 2.3. This should delete the image from cloudinary
          await cloudinary.uploader.destroy(image.public_id);
        }

        for (const review of post.reviews) {
          // 2.4 This will remove all reviews in the post
          await Review.findByIdAndDelete({ _id: review._id });
        }
      }

      // 3. After deleting the images, now this will delete all posts of the user
      // > Removes all the user (userId) posts in POST COLLECTION
      await Post.deleteMany({ user: userId });
    }

    // 4. Find the reviews that match the user property to userId
    // > These reviews if from other users posts
    // 4.1 This returns an array of posts
    const reviews = await Review.find({ user: userId });

    // 5. Finds the user of the reviews in the post that match the userId
    // > This will find the reviews that the user create a review to other users posts
    // 5.1 Returns an array of reviews in every posts
    const postReview = await Post.find({ "reviews.user": userId });

    for (const post of postReview) {
      // 6. Filters the reviews in the postReview
      // > Filters the reviews in other user post and removes the review that this user (userId) created
      // > Only leaves the reviews that didnt matched the userId
      // 6.1 Exclude the reviews that dont match the userId
      post.reviews = post.reviews.filter(
        (review: any) => review.user.toString() !== userId
      );
      await post.save();
    }

    if (reviews.length !== 0) {
      // 7. Delete all reviews that match the post._id
      // > Removes all this user (userId) reviews in the REVIEW COLLECTION
      await Review.deleteMany({ user: userId });
    }

    // 8. Get the user details from the USER COLLECTION
    const user = await User.findById({ _id: userId });

    if (user.image.public_id !== "") {
      // 9. Removes the user (userId) profile image by getting the public_id
      await cloudinary.uploader.destroy(user.image.public_id);
    }

    if (user.cover_photo.public_id !== "") {
      // 10. Removes the user (userId) cover photo
      await cloudinary.uploader.destroy(user.cover_photo.public_id);
    }

    // 11. Finally, removes the user (userId) document from the USER COLLECTION
    await User.findByIdAndDelete({ _id: userId });

    return res.status(200).json({
      success: true,
      message: `User has been deleted successfully!`,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: `Deleting User} failed, `,
      error,
    });
  }
}
