import { connectMongoDB } from "@/lib/connectMongoDB";
import React, { FC, Suspense } from "react";
import Head from "next/head";
import mongoose from "mongoose";

// import CategoryNavigation from "@/components/navigation/CategoryNavigation";
import MainPageLayout from "../components/layout/MainPageLayout";
import PostsList from "@/components/turistaPosts/PostsList";
import User from "@/models/User";

interface IndexProps {
  posts: {
    id: string;
    location: string;
    image: string;
    userId: string;
    userName: string;
    userImage: string;
  }[];
}

const index: FC<IndexProps> = (props) => {
  return (
    <MainPageLayout>
      <Head>
        <title>Turista</title>
        <meta property="og:title" content="Turista Home Page" key="homeTitle" />
      </Head>
      <Suspense
        fallback={
          <p className="text-center pt-32 text-2xl">Loading posts...</p>
        }
      >
        {/* <CategoryNavigation /> */}
        <PostsList posts={props.posts} />
      </Suspense>
    </MainPageLayout>
  );
};

export async function getStaticProps() {
  try {
    await connectMongoDB();
    const postsCollection = mongoose.connection.db.collection("posts");
    const posts = await postsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    // Get the user ids of the every posts
    const users: { userId: string }[] = await Promise.all(
      posts.map(async (post) => ({
        userId: post.user.toString(),
      }))
    );
    // Then mapped
    const userIds: string[] = users.map((user) => user.userId);

    // Find the user details from the User collection
    const userDetails = await User.find({ _id: userIds });

    // Combine all data to send it as one
    const postsData = posts.map((post) => ({
      id: post._id.toString(),
      location: post.location,
      image: post.image[0].image,
      userId: post.user.toString(),
      // Match the user id from the User collection to post user id
      // To get the user name and user image
      userName:
        userDetails.find((user) => user._id.toString() === post.user.toString())
          ?.name || "",
      userImage:
        userDetails.find((user) => user._id.toString() === post.user.toString())
          ?.image || "",
    }));

    return {
      props: {
        posts: postsData,
      },
      revalidate: 1,
    };
  } catch (err: any) {
    return {
      props: {
        posts: [],
      },
      revalidate: 1,
    };
  }
}

export default index;
