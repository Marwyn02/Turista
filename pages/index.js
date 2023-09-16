import mongoose from "mongoose";
import { connectMongoDB } from "@/lib/connectMongoDB";

import MainLayout from "@/components/layout/MainLayout";
import PostsList from "@/components/turistaPosts/PostsList";
import SubNavigation from "@/components/navigation/SubNavigation";

const Home = (props) => {
  return (
    <MainLayout>
      <SubNavigation />
      <PostsList posts={props.posts} />
    </MainLayout>
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
    return {
      props: {
        posts: posts.map((post) => ({
          title: post.title,
          location: post.location,
          image: post.image,
          description: post.description,
          amenities: post.amenities.map((amenity) => ({
            name: amenity.name,
            checked: amenity.checked,
          })),
          id: post._id.toString(),
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

export default Home;
