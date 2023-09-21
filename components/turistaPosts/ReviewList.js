import ReviewCard from "../ui/ReviewCard";

const ReviewList = (props) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1 lg:gap-x-8 lg:gap-y-4  px-1 lg:px-4 border-t pt-3 lg:pt-6 mt-5">
        {props.reviewData.map((review) => (
          <ReviewCard
            key={review.id}
            id={review.id}
            postId={review.postId}
            description={review.description}
            name={review.name}
            userId={review.userId}
          />
        ))}
      </div>
    </>
  );
};

export default ReviewList;
