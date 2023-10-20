import { GetStaticPropsContext } from "next";
import { connectMongoDB } from "@/lib/connectMongoDB";
import React, { Suspense, FC } from "react";
import mongoose from "mongoose";
import Head from "next/head";

import Find from "@/pages/api/post/find";

import EditPost from "@/components/form/EditPost";
import FormLayout from "@/components/layout/FormLayout";

interface PostData {
  postData: {
    id: string;
    title: string;
    coordinate: {
      lng: number;
      lat: number;
    };
    location: string;
    image: ImageArray[];
    description: string;
    amenities: AmenityArray[];
  };
}

interface ImageArray {
  image: string;
  public_id: string;
}

interface AmenityArray {
  name: string;
  description: string;
  checked: boolean;
}

const index: FC<PostData> = (props) => {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <Head>
        <title>Edit {props.postData.title}</title>
      </Head>
      <FormLayout>
        <EditPost
          id={props.postData.id}
          title={props.postData.title}
          coordinate={props.postData.coordinate}
          location={props.postData.location}
          image={props.postData.image}
          description={props.postData.description}
          amenities={props.postData.amenities}
        />
      </FormLayout>
    </Suspense>
  );
};

export default index;

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
  } catch (error: any) {
    throw new Error("Error in update-post getStaticPaths: ", error);
  }
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: PostData; revalidate: number } | { notFound: boolean }> {
  try {
    if (!context.params) {
      throw new Error("No params in context ");
    }
    const postId: string = context.params.id as string;
    const { selectedResult, selectedUser } = await Find(postId);

    if (!selectedResult && !selectedUser) {
      return { notFound: true }; // Return a 404 page
    }
    return {
      props: {
        postData: {
          id: selectedResult._id.toString(),
          title: selectedResult.title,
          coordinate: {
            lng: selectedResult.coordinate.lng,
            lat: selectedResult.coordinate.lat,
          },
          location: selectedResult.location,
          image: (selectedResult.image || []).map((i: ImageArray) => ({
            image: i.image,
            public_id: i.public_id,
          })),
          description: selectedResult.description,
          amenities: (selectedResult.amenities || []).map(
            (item: AmenityArray) => ({
              name: item.name,
              description: item.description,
              checked: item.checked,
            })
          ),
        },
      },
      revalidate: 1,
    };
  } catch (error: any) {
    return {
      props: {
        postData: {
          id: "",
          title: "",
          coordinate: {
            lng: 0,
            lat: 0,
          },
          location: "",
          image: [],
          description: "",
          amenities: [],
        },
      },
      revalidate: 1,
    };
  }
}
