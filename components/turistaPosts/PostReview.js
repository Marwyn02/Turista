import { useSession } from "next-auth/react";
import { useRef } from "react";
import { useRouter } from "next/router";
import ReviewList from "./ReviewList";

const PostReview = (props) => {
  const { data: session } = useSession();

  const router = useRouter();

  const reviewTitleRef = useRef();
  const reviewDescriptionRef = useRef();

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    const enteredTitle = reviewTitleRef.current.value;
    const enteredDescription = reviewDescriptionRef.current.value;

    const reviewData = {
      post: props.postId,
      title: enteredTitle,
      description: enteredDescription,
      user: session.user._id,
    };

    try {
      const response = await fetch("api/review/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to create review.");
      } else {
        router.push(`/${props.postId}`);
      }
    } catch (error) {
      throw new Error("Error in create review: " + error);
    }
  };
  return (
    <aside className="md:col-span-3 bg-white p-3 rounded-b-xl md:rounded-none">
      <form onSubmit={submitReviewHandler}>
        <h2 className="font-bold">Review:</h2>
        <input
          type="text"
          placeholder="Review title"
          className="my-2 border border-gray-300 rounded text-sm px-2 py-1"
          ref={reviewTitleRef}
        />
        <textarea
          type="text"
          rows="1"
          cols="30"
          className="border border-gray-300 mb-5 p-2 text-sm"
          placeholder="Write your review here..."
          ref={reviewDescriptionRef}
        ></textarea>
        <button type="submit" className="border text-sm px-2 py-1">
          Submit
        </button>
      </form>
      <hr></hr>
      <ReviewList />
    </aside>
  );
};

export default PostReview;
