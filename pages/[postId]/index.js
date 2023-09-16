import { Fragment } from "react";
import { connectMongoDB } from "../../lib/connectMongoDB";
import mongoose from "mongoose";
import FindOne from "../api/post/findOne";
import GetOne from "../api/review/getOne";

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
        amenities={props.postData.amenities}
        user={props.postData.user}
        userId={props.postData.userId}
        reviews={props.postData.reviews}
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
    const { selectedResult, selectedUser } = await FindOne(postId);

    if (!selectedResult && !selectedUser) {
      return {
        notFound: true, // Return a 404 page
      };
    }
    // Return a user name of every review in a specific post
    const reviewUser = await Promise.all(
      selectedResult.reviews.map(async (review) => {
        const user = await GetOne(review.user);
        return {
          id: review._id.toString(),
          postId: review.post.toString(),
          description: review.description,
          name: user,
          userId: review.user.toString(),
        };
      })
    );

    return {
      props: {
        postData: {
          id: selectedResult._id.toString(),
          title: selectedResult.title,
          location: selectedResult.location,
          image: selectedResult.image,
          description: selectedResult.description,
          amenities: selectedResult.amenities.map((amenity) => ({
            name: amenity.name,
            checked: amenity.checked,
            id: amenity.id,
          })),
          user: selectedUser.name,
          userId: selectedUser._id.toString(),
          reviews: reviewUser ? reviewUser : [], // If there are no reviews then just return empty array
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
