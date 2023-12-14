import { connectMongoDB } from "@/lib/connectMongoDB";
import React, { FC, Suspense } from "react";
import Head from "next/head";
import mongoose from "mongoose";

// import CategoryNavigation from "@/components/navigation/CategoryNavigation";
import MainPageLayout from "../components/layout/MainPageLayout";
import PostsList from "@/components/turistaPosts/PostsList";
import Loading from "@/components/fallbacks/Loading";

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
      <Suspense fallback={<Loading />}>
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

    // Combine all data to send it as one
    const postsData = posts.map((post) => ({
      id: post._id.toString(),
      location: post.location,
      image: post.image[0].image,
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
