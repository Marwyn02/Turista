import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/connectMongoDB";

// import CategoryNavigation from "@/components/navigation/CategoryNavigation";
import MainPageLayout from "../components/layout/MainPageLayout";
import PostsList from "@/components/turistaPosts/PostsList";
import { Suspense } from "react";
import Head from "next/head";

export default function Home(props) {
  return (
    <MainPageLayout>
      <Head>
        <title>Home</title>
        <meta property="og:title" content="Turista Home Page" key="homeTitle" />
      </Head>
      <Suspense fallback={<p className="text-center">Loading posts...</p>}>
        {/* <CategoryNavigation /> */}
        <PostsList posts={props.posts} />
      </Suspense>
    </MainPageLayout>
  );
}

export async function getStaticProps() {
  try {
    await connectMongoDB();
    const postsCollection = mongoose.connection.db.collection("posts");
    const posts = await postsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    return {
      props: {
        posts: posts.map((post) => ({
          id: post._id.toString(),
          location: post.location,
          image: post.image[0].image,
        })),
      },
      revalidate: 1,
    };
  } catch (err) {
    return {
      props: {
        posts: [],
      },
      revalidate: 1,
    };
  }
}
