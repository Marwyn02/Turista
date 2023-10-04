import mongoose from "mongoose";
import Head from "next/head";
import { connectMongoDB } from "@/lib/connectMongoDB";
import FindOne from "@/pages/api/post/findOne";

import EditPost from "@/components/form/EditPost";
import FormLayout from "@/components/layout/FormLayout";
import { Suspense } from "react";

export default function index(props) {
  try {
    return (
      <Suspense fallback={<p>Loading content...</p>}>
        <Head>
          <title>Edit post</title>
        </Head>
        <FormLayout>
          <EditPost
            id={props.postData.id}
            title={props.postData.title}
            location={props.postData.location}
            image={props.postData.image}
            description={props.postData.description}
            amenities={props.postData.amenities}
          />
        </FormLayout>
      </Suspense>
    );
  } catch (error) {
    throw new Error("Error fetching edit post data: ", error);
  }
}

export async function getStaticPaths() {
  try {
    await connectMongoDB();
    const postsCollection = mongoose.connection.db.collection("posts");
    const posts = await postsCollection.find({}).toArray();
    return {
      fallback: "blocking",
      paths: posts.map((post) => ({
        params: { id: post._id.toString() },
      })),
    };
  } catch (error) {
    throw new Error("Error in update-post getStaticPaths: ", error);
  }
}

export async function getStaticProps(context) {
  try {
    const postId = context.params.id;
    const { selectedResult, selectedUser } = await FindOne(postId);

    if (!selectedResult && !selectedUser) {
      return { notFound: true }; // Return a 404 page
    }
    return {
      props: {
        postData: {
          id: selectedResult._id.toString(),
          title: selectedResult.title,
          location: selectedResult.location,
          image: selectedResult.image.map((i) => ({
            image: i.image,
            public_id: i.public_id,
          })),
          description: selectedResult.description,
          amenities: selectedResult.amenities.map((item) => ({
            name: item.name,
            description: item.description,
            checked: item.checked,
          })),
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
