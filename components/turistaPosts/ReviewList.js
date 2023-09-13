import ReviewCard from "../ui/ReviewCard";

const ReviewList = (props) => {
  return (
    <>
      {props.reviewData.map((review) => (
        <ReviewCard
          key={review.id}
          id={review.id}
          postId={review.postId}
          title={review.title}
          description={review.description}
          name={review.name}
        />
      ))}
    </>
  );
};

export default ReviewList;
