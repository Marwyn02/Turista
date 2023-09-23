import UserProfile from "@/components/profile/UserProfile";

import { connectMongoDB } from "@/lib/connectMongoDB";
import mongoose from "mongoose";
import { useRouter } from "next/router";

import FindUser from "../api/user/findUser";

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

    if (!name && !image) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    // Return a user name of every review in a specific post
    // const reviewUser = await Promise.all(
    //   selectedResult.reviews.map(async (review) => {
    //     const { name, image } = await GetOne(review.user);
    //     return {
    //       id: review._id.toString(),
    //       postId: review.post.toString(),
    //       description: review.description,
    //       image: image,
    //       name: name,
    //       userId: review.user.toString(),
    //     };
    //   })
    // );

    return {
      props: {
        userData: {
          name: name,
          image: image,
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
  // const router = useRouter();
  // const { userId } = router.query;

  // console.log(userId);
  // const user = await FindUser(userId);
  // console.log(user);
  // console.log("This is the user details: ", userDetails);

  return (
    <UserProfile name={props.userData.name} image={props.userData.image} />
  );
};

export default userId;
