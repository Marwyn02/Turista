import { connectMongoDB } from "@/lib/connectMongoDB";
import mongoose from "mongoose";
import { Suspense } from "react";

import Post from "@/models/Post";
import Review from "@/models/Review";
import User from "@/models/User";

import CountData from "../api/user/countData";
import FindUser from "../api/user/findUser";

import UserProfile from "@/components/profile/UserProfile";

export async function getStaticPaths() {
  try {
    await connectMongoDB();
    const usersCollection = mongoose.connection.db.collection("users");
    const users = await usersCollection.find({}).toArray();
    return {
      fallback: "blocking",
      paths: users.map((user) => ({
        params: { userId: user._id.toString() },
      })),
    };
  } catch (error) {
    throw new Error("Error in users getStaticPaths: ", error);
  }
}

export async function getStaticProps(context) {
  try {
    const userId = context.params.userId;
    const { name, image } = await FindUser(userId);

    const PostReviewCount = await CountData(userId);

    const userPosts = await Post.find({ user: userId }).sort({ _id: -1 });

    const userReviews = await Review.find({ user: userId }).sort({ _id: -1 });

    if (!name && !image) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    const posts = await Promise.all(
      userPosts.map(async (post) => {
        return {
          id: post._id.toString(),
          title: post.title,
          location: post.location,
          image: post.image[0].url,
        };
      })
    );

    const reviews = await Promise.all(
      userReviews.map(async (review) => {
        const user = await User.findById(review.user);
        const { name } = user;
        return {
          id: review._id.toString(),
          username: name,
          description: review.description,
          post: review.post.toString(),
          user: review.user.toString(),
          image: review.image,
        };
      })
    );

    return {
      props: {
        userData: {
          name: name,
          image: image,
          postCount: PostReviewCount.PostCount,
          reviewCount: PostReviewCount.ReviewCount,
          posts: posts,
          reviews: reviews,
        },
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        userData: [],
      },
      revalidate: 1,
    };
  }
}

export default function userId(props) {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <UserProfile
        name={props.userData.name}
        image={props.userData.image}
        postCount={props.userData.postCount}
        reviewCount={props.userData.reviewCount}
        posts={props.userData.posts}
        reviews={props.userData.reviews}
      />
    </Suspense>
  );
}
