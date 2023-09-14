import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

const PostReview = (props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [inputError, setInputError] = useState(false);

  const reviewDescriptionRef = useRef();

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    const enteredDescription = reviewDescriptionRef.current.value;

    if (reviewDescriptionRef.current.value.trim() === "") {
      let showError = setInterval(() => {
        setInputError(true);
      });

      setTimeout(() => {
        clearInterval(showError);
        setInputError(false);
      }, 5000);
    } else {
      const reviewData = {
        post: props.postId,
        description: enteredDescription,
        user: session.user._id,
      };

      try {
        const response = await fetch("/api/post/create", {
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

      reviewDescriptionRef.current.value = "";
    }
  };
  return (
    <>
      <form
        onSubmit={submitReviewHandler}
        className="border-2 border-gray-500 lg:border-none rounded-lg lg:rounded-none px-4 md:px-2 py-2 mb-5 lg:mb-2"
      >
        <h2 className="font-semibold text-gray-700">Review:</h2>
        <textarea
          type="text"
          rows="2"
          cols="30"
          className={
            !inputError
              ? `border border-gray-300 p-2 text-sm w-full mt-1 rounded-xl`
              : `border border-red-500 p-2 text-sm w-full mt-1 rounded-xl`
          }
          placeholder="Write your review here..."
          ref={reviewDescriptionRef}
        ></textarea>
        {inputError && (
          <span
            id="reviewError"
            className="text-xs text-white bg-red-600/70 rounded-lg px-1.5 py-0.5 mb-0.5"
          >
            I think you forgot to enter a review.
          </span>
        )}
        <button
          type="submit"
          className="border rounded-lg border-gray-400 text-sm px-2 py-1 w-full my-2 tracking-wide hover:bg-gray-400 hover:text-gray-50 duration-300"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PostReview;
