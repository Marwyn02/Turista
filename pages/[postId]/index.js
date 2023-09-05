import { Fragment } from "react";
import { connectMongoDB } from "../../lib/connectMongoDB";
import mongoose from "mongoose";
import FindOne from "../api/post/findOne";
import PostsDetail from "@/components/turistaPosts/PostsDetail";

const index = (props) => {
  return (
    <Fragment>
      <PostsDetail
        id={props.postData.id}
        title={props.postData.title}
        location={props.postData.location}
        image={props.postData.image}
        description={props.postData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  await connectMongoDB();
  const postsCollection = mongoose.connection.db.collection("posts");
  const posts = await postsCollection.find({}).toArray();
  return {
    fallback: "blocking",
    paths: posts.map((post) => ({
      params: { postId: post._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  try {
    const postId = context.params.postId;
    const selectedResult = await FindOne(postId);
    if (!selectedResult) {
      return {
        notFound: true, // Return a 404 page
      };
    }
    return {
      props: {
        postData: {
          id: selectedResult._id.toString(),
          title: selectedResult.title,
          location: selectedResult.location,
          image: selectedResult.image,
          description: selectedResult.description,
        },
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        postData: [],
      },
      revalidate: 1,
    };
  }
}

export default index;
