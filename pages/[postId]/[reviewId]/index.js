import ReviewDetail from "@/components/turistaPosts/ReviewDetail";
import { connectMongoDB } from "@/lib/connectMongoDB";
import FindOne from "@/pages/api/review/findOne";
import mongoose from "mongoose";
import { Fragment } from "react";

export async function getStaticPaths() {
  await connectMongoDB();
  const reviewsCollection = mongoose.connection.db.collection("reviews");
  const reviews = await reviewsCollection.find({}).toArray();
  return {
    fallback: "blocking",
    paths: reviews.map((review) => ({
      params: {
        postId: review.post.toString(),
        reviewId: review._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  try {
    const Id = context.params.reviewId;
    const selectedReview = await FindOne(Id);

    console.log("FIND: ", selectedReview);

    if (!selectedReview) {
      return {
        notFound: true, // Return a 404 page
      };
    }

    return {
      props: {
        reviewData: {
          id: selectedReview._id.toString(),
          user: selectedReview.user.toString(),
          description: selectedReview.description,
          postId: selectedReview.post.toString(),
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

const index = (props) => {
  return (
    <Fragment>
      <ReviewDetail
        id={props.reviewData.id}
        user={props.reviewData.user}
        description={props.reviewData.description}
        postId={props.reviewData.postId}
      />
    </Fragment>
  );
};

export default index;
