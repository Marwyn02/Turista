import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";

interface PostsReviewProps {
  postId: string;
}

//
//
// * This component serves for creating a review to a certain post
//
//

const PostsReview = (props: PostsReviewProps) => {
  const { data: session } = useSession();

  const [inputError, setInputError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const reviewDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitReviewHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    const enteredDescription = reviewDescriptionRef.current?.value;

    if (reviewDescriptionRef.current?.value.trim() === "") {
      let showError = setInterval(() => {
        setInputError(true);
      });

      setTimeout(() => {
        clearInterval(showError);
        setInputError(false);
        setLoading(false);
      }, 5000);
    } else {
      const reviewData = {
        post: props.postId,
        description: enteredDescription,
        image: session?.user?.image,
        user: (session?.user as { _id: string })._id,
      };

      try {
        const response = await fetch("/api/review/create", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }).then((r) => r.json());

        if (!response.success) {
          throw new Error(response.message);
        }

        location.reload();
        console.log(response.message);
      } catch (error: any) {
        throw new Error("Error in create review: " + error);
      }

      setLoading(false);
      reviewDescriptionRef.current!.value = "";
    }
  };
  return (
    <>
      <form
        onSubmit={submitReviewHandler}
        className="lg:border-none rounded-lg lg:rounded-none px-1 md:px-2 mt-6 lg:my-8 lg:mb-2"
      >
        <h2 className="font-semibold text-gray-700">Write your review</h2>
        <textarea
          rows={4}
          cols={30}
          className={
            !inputError
              ? `resize-none border border-gray-300 p-2 text-sm w-full mt-1 rounded-xl`
              : `resize-none border border-red-500 p-2 text-sm w-full mt-1 rounded-xl`
          }
          placeholder="Is it fun right?"
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
          className="border rounded-lg border-gray-400 text-sm px-2 py-1 w-full 
          my-2 tracking-wide hover:bg-indigo-400 hover:text-white duration-300"
          disabled={loading}
        >
          {loading ? "Submitting your review..." : "Submit"}
        </button>
      </form>
    </>
  );
};

export default PostsReview;
