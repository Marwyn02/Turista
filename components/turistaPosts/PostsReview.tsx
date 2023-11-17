import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";

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

    // If the client is not authenticated, re-route to sign in page
    if (!session) {
      console.log("Not signed in.");
      setLoading(false);
      router.push("/account/login");
      return;
    }

    const enteredDescription = reviewDescriptionRef.current?.value;

    if (reviewDescriptionRef.current?.value.trim() === "") {
      let showError = setInterval(() => {
        setInputError(true);
      });

      // Timing the review validation
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

        console.log(response.message);
        router.push(response.path);
      } catch (error: any) {
        console.error("Failed to create a review in this post, ", error);
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
          name="description"
          className={
            !inputError
              ? `resize-none border border-gray-300 p-2 text-sm w-full mt-1 rounded-xl 
              focus:ring-1 focus:ring-violet-500 focus:border-violet-500 focus:outline-none`
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
          className="rounded text-sm px-2 py-2.5 w-full my-2 tracking-wide bg-violet-400 
           text-white hover:bg-violet-500 duration-300"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send review"}
        </button>
      </form>
    </>
  );
};

export default PostsReview;
