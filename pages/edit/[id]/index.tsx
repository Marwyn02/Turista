import { GetStaticPropsContext } from "next";
import { connectMongoDB } from "@/lib/connectMongoDB";
import React, { Suspense, FC } from "react";
import mongoose from "mongoose";

import Find from "@/pages/api/post/find";

import EditPostForm from "@/components/form/EditPostForm";
import FormLayout from "@/components/layout/FormLayout";
import Loading from "@/components/fallbacks/Loading";

interface PostData {
  post: {
    id: string;
    title: string;
    coordinate: {
      lng: number;
      lat: number;
    };
    location: string;
    image: ImageArray[];
    description: string;
    amenities: IAmenityArray[];
    user: string;
  };
}

interface ImageArray {
  image: string;
  public_id: string;
}

interface IAmenityArray {
  name: string;
  description: string;
  checked: boolean;
}

const index: FC<PostData> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <FormLayout>
        <EditPostForm
          id={props.post.id}
          title={props.post.title}
          coordinate={props.post.coordinate}
          location={props.post.location}
          image={props.post.image}
          description={props.post.description}
          amenities={props.post.amenities}
          user={props.post.user}
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

    const { selectedPost, selectedUser } = await Find(postId);

    if (!selectedPost && !selectedUser) {
      return { notFound: true }; // Return a 404 page
    }

    return {
      props: {
        post: {
          id: selectedPost._id.toString(),
          title: selectedPost.title,
          coordinate: {
            lng: selectedPost.coordinate.lng,
            lat: selectedPost.coordinate.lat,
          },
          location: selectedPost.location,
          image: (selectedPost.image || []).map((i: ImageArray) => ({
            image: i.image,
            public_id: i.public_id,
          })),
          description: selectedPost.description,
          amenities: (selectedPost.amenities || []).map(
            (item: IAmenityArray) => ({
              name: item.name,
              description: item.description,
              checked: item.checked,
            })
          ),
          user: selectedPost.user.toString(),
        },
      },
      revalidate: 1,
    };
  } catch (error: any) {
    return {
      props: {
        post: {
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
          user: "",
        },
      },
      revalidate: 1,
    };
  }
}
