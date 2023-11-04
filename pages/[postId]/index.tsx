import { GetStaticPropsContext } from "next";
import { connectMongoDB } from "../../lib/connectMongoDB";
import React, { FC, Suspense } from "react";
import mongoose from "mongoose";

import User from "@/models/User";

import Find from "../api/post/find";

import PostsDetail from "@/components/turistaPosts/PostsDetail";

interface IReview {
  _id: string;
  createdAt: string;
  post: string;
  description: string;
  image: string;
  name: string;
  user: string;
}

interface IImageProps {
  image: string;
  public_id: string;
}

interface IAmenityProps {
  name: string;
  description: string;
  checked: boolean;
  id: string;
}

interface IReviewProps {
  id: string;
  date: string;
  name: string;
  postId: string;
  description: string;
  image: string;
  userId: string;
}

interface IPostData {
  post: {
    id: string;
    loves: string[];
    title: string;
    coordinate: {
      lng: number;
      lat: number;
    };
    location: string;
    image: IImageProps[];
    description: string;
    amenities: IAmenityProps[];
    user: string;
    userId: string;
    userImage: string;
    reviews: IReviewProps[];
    date: string;
  };
}

const index: FC<IPostData> = (props) => {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <PostsDetail
        id={props.post.id}
        loves={props.post.loves}
        title={props.post.title}
        coordinate={props.post.coordinate}
        location={props.post.location}
        image={props.post.image}
        description={props.post.description}
        amenities={props.post.amenities}
        user={props.post.user}
        userId={props.post.userId}
        userImage={props.post.userImage}
        reviews={props.post.reviews}
        date={props.post.date}
      />
    </Suspense>
  );
};

export default index;

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

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: IPostData; revalidate: number } | { notFound: boolean }> {
  try {
    if (!context.params) {
      throw new Error("No params in context");
    }

    // Take a param as context to postId
    const postId: string = context.params.postId as string;

    // Get the selected post and user's data
    const { selectedPost, selectedUser } = await Find(postId);

    // Fetch post created date
    // Day - Month - Year
    const date: string = new Date(selectedPost.createdAt).toLocaleString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

    if (!selectedPost && !selectedUser) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    // Return a user name of every review in a specific post
    const reviewUser = await Promise.all(
      selectedPost.reviews.map(async (review: IReview) => {
        const user = await User.findById(review.user);
        const { name, image } = user;
        return {
          id: review._id.toString(),
          date: new Date(review.createdAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          postId: review.post.toString(),
          description: review.description,
          image: image,
          name: name,
          userId: review.user.toString(),
        };
      })
    );

    return {
      props: {
        post: {
          id: selectedPost._id.toString(),
          loves: selectedPost.loves,
          title: selectedPost.title,
          coordinate: {
            lng: selectedPost.coordinate.lng,
            lat: selectedPost.coordinate.lat,
          },
          location: selectedPost.location,
          image: (selectedPost.image || []).map((img: IImageProps) => ({
            image: img.image,
            public_id: img.public_id,
          })),
          description: selectedPost.description,
          amenities: (selectedPost.amenities || []).map(
            (amenity: IAmenityProps) => ({
              name: amenity.name,
              description: amenity.description,
              checked: amenity.checked,
              id: amenity.id,
            })
          ),
          user: selectedUser.name,
          userId: selectedUser._id.toString(),
          userImage: selectedUser.image,
          reviews: reviewUser ? reviewUser : [], // If there are no reviews then just return empty array
          date: date,
        },
      },
      revalidate: 1,
    };
  } catch (error: any) {
    return {
      props: {
        post: {
          id: "",
          loves: [],
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
          userId: "",
          userImage: "",
          reviews: [],
          date: "",
        },
      },
      revalidate: 1,
    };
  }
}
