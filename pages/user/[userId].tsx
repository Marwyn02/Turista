import { GetStaticPropsContext } from "next";
import { connectMongoDB } from "@/lib/connectMongoDB";
import mongoose from "mongoose";
import React, { FC, Suspense } from "react";

import Post from "@/models/Post";
import Review from "@/models/Review";
import UserModel from "@/models/User";

import CountData from "../api/user/count";
import FindUser from "../api/user/find";

import User from "../../components/profile/User";

interface UserData {
  userData: {
    userId: string;
    name: string;
    image: string;
    postCount: number;
    reviewCount: number;
    posts: {
      id: string;
      title: string;
      location: string;
      image: string;
    }[];
    reviews: {
      id: string;
      username: string;
      description: string;
      post: string;
      user: string;
      image: string;
    }[];
    followers: string[];
  };
}

interface IUser {
  id: string;
  name: string;
  image: string;
  followers: string[];
}

interface Count {
  PostCount: number;
  ReviewCount: number;
}

const userId: FC<UserData> = (props) => {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <User
        userId={props.userData.userId}
        name={props.userData.name}
        image={props.userData.image}
        postCount={props.userData.postCount}
        reviewCount={props.userData.reviewCount}
        posts={props.userData.posts}
        reviews={props.userData.reviews}
        followers={props.userData.followers}
      />
    </Suspense>
  );
};

export default userId;

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
  } catch (error: any) {
    throw new Error("Error in users getStaticPaths: ", error);
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: UserData; revalidate: number } | { notFound: boolean }> {
  try {
    if (!context.params) {
      throw new Error("No params in context");
    }

    const userId: string = context.params.userId as string;

    // Fetching user data
    const { id, name, image, followers }: IUser = await FindUser(userId);

    // Fetching post annd review count or number
    const PostReviewCount: Count = await CountData(userId);

    // Fetch user's post created
    const userPosts = await Post.find({ user: userId }).sort({ _id: -1 });

    // Fetch user's reviews created
    const userReviews = await Review.find({ user: userId }).sort({ _id: -1 });

    if (!name && !image) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    // Fetch all user's posts
    const posts = await Promise.all(
      userPosts.map(async (post) => {
        return {
          id: post._id.toString(),
          title: post.title,
          location: post.location,
          image: post.image[0].image,
        };
      })
    );

    // Fetch all user's reviews
    const reviews = await Promise.all(
      userReviews.map(async (review) => {
        const user = await UserModel.findById(review.user);
        const { name }: { name: string } = user;
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
          userId: id,
          name: name,
          image: image,
          postCount: PostReviewCount.PostCount,
          reviewCount: PostReviewCount.ReviewCount,
          posts: posts,
          reviews: reviews,
          followers: followers,
        },
      },
      revalidate: 1,
    };
  } catch (error: any) {
    return {
      props: {
        userData: {
          userId: "",
          name: "",
          image: "",
          postCount: 0,
          reviewCount: 0,
          posts: [],
          reviews: [],
          followers: [],
        },
      },
      revalidate: 1,
    };
  }
}
