import { GetStaticPropsContext } from "next";
import { connectMongoDB } from "../../lib/connectMongoDB";
import React, { FC, Suspense } from "react";
import mongoose from "mongoose";

import User from "@/models/User";

import Find from "../api/post/find";

import PostsDetail from "@/components/turistaPosts/PostsDetail";

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
  name: string;
  postId: string;
  description: string;
  image: string;
  userId: string;
}

interface IReview {
  _id: string;
  post: string;
  description: string;
  image: string;
  name: string;
  user: string;
}

interface IPostData {
  postData: {
    id: string;
    likes: string[];
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
  };
}

const index: FC<IPostData> = (props) => {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <PostsDetail
        id={props.postData.id}
        likes={props.postData.likes}
        title={props.postData.title}
        coordinate={props.postData.coordinate}
        location={props.postData.location}
        image={props.postData.image}
        description={props.postData.description}
        amenities={props.postData.amenities}
        user={props.postData.user}
        userId={props.postData.userId}
        userImage={props.postData.userImage}
        reviews={props.postData.reviews}
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
    const { selectedResult, selectedUser } = await Find(postId);

    if (!selectedResult && !selectedUser) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    // Return a user name of every review in a specific post
    const reviewUser = await Promise.all(
      selectedResult.reviews.map(async (review: IReview) => {
        const user = await User.findById(review.user);
        const { name, image } = user;
        return {
          id: review._id.toString(),
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
        postData: {
          id: selectedResult._id.toString(),
          likes: (selectedResult.likes || []).map((like: any) =>
            like.toString()
          ),
          title: selectedResult.title,
          coordinate: {
            lng: selectedResult.coordinate.lng,
            lat: selectedResult.coordinate.lat,
          },
          location: selectedResult.location,
          image: (selectedResult.image || []).map((img: IImageProps) => ({
            image: img.image,
            public_id: img.public_id,
          })),
          description: selectedResult.description,
          amenities: (selectedResult.amenities || []).map(
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
        },
      },
      revalidate: 1,
    };
  } catch (error: any) {
    return {
      props: {
        postData: {
          id: "",
          likes: [""],
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
        },
      },
      revalidate: 1,
    };
  }
}
