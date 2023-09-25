import { connectMongoDB } from "@/lib/connectMongoDB";
import mongoose from "mongoose";
import { Suspense } from "react";

import CountData from "../api/user/countData";
import FindUser from "../api/user/findUser";

import UserProfile from "@/components/profile/UserProfile";
import Post from "@/models/Post";

export async function getStaticPaths() {
  try {
    await connectMongoDB();
    const usersCollection = mongoose.connection.db.collection("users");
    const users = await usersCollection.find({}).toArray();
    return {
      fallback: "blocking",
      paths: users.map((user) => ({
        params: { userId: user._id.toString() },
      })),
    };
  } catch (error) {
    throw new Error("Error in users getStaticPaths: ", error);
  }
}

export async function getStaticProps(context) {
  try {
    const userId = context.params.userId;
    const { name, image } = await FindUser(userId);

    const PostReviewCount = await CountData(userId);

    const find = await Post.find({ user: userId }).sort({ _id: -1 });

    if (!name && !image) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    const posts = await Promise.all(
      find.map(async (posts) => {
        return {
          id: posts._id.toString(),
          title: posts.title,
          location: posts.location,
          image: posts.image,
        };
      })
    );

    // Return a user name of every review in a specific post
    // const reviewUser = await Promise.all(
    //   find.title.map(async (titles) => {
    //     // const { name, image } = await GetOne(review.user);
    //     return {
    //       // id: review._id.toString(),
    //       // postId: review.post.toString(),
    //       // description: review.description,
    //       // image: image,
    //       // name: name,
    //       // userId: review.user.toString(),
    //       title: titles.title,
    //     };
    //   })
    // );

    return {
      props: {
        userData: {
          name: name,
          image: image,
          postCount: PostReviewCount.PostCount,
          reviewCount: PostReviewCount.ReviewCount,
          posts: posts,
          // find: reviewUser,
          // id: selectedResult._id.toString(),
          // title: selectedResult.title,
          // coordinate: {
          //   lng: selectedResult.coordinate.lng,
          //   lat: selectedResult.coordinate.lat,
          // },
          // location: selectedResult.location,
          // image: selectedResult.image,
          // description: selectedResult.description,
          // amenities: selectedResult.amenities.map((amenity) => ({
          //   name: amenity.name,
          //   checked: amenity.checked,
          //   id: amenity.id,
          // })),
          // user: selectedUser.name,
          // userId: selectedUser._id.toString(),
          // userImage: selectedUser.image,
          // reviews: reviewUser ? reviewUser : [], // If there are no reviews then just return empty array
        },
      },
      revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        userData: [],
      },
      revalidate: 1,
    };
  }
}

const userId = (props) => {
  return (
    <Suspense fallback={<p>Loading content...</p>}>
      <UserProfile
        name={props.userData.name}
        image={props.userData.image}
        postCount={props.userData.postCount}
        reviewCount={props.userData.reviewCount}
        posts={props.userData.posts}
      />
    </Suspense>
  );
};

export default userId;
