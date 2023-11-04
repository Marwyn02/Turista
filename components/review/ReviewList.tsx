import React, { FC } from "react";
import ReviewCard from "./ReviewCard";

interface TReviewListProps {
  reviews: {
    id: string;
    date: string;
    name: string;
    image: string;
    description: string;
    postId: string;
    userId: string;
  }[];
}

//
//
// - This component is responsible for listing or mapping the reviews to a review card
//
//

const ReviewList: FC<TReviewListProps> = (props) => {
  return (
    <>
      <div
        className="grid md:grid-cols-2 gap-x-2 gap-y-1 lg:gap-x-8 lg:gap-y-4 
                    px-1 pb-5 md:pb-10 lg:px-4 border-t pt-3 lg:pt-6 mt-5"
      >
        {props.reviews.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            date={review.date}
            name={review.name}
            image={review.image}
            description={review.description}
            postId={review.postId}
            userId={review.userId}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
