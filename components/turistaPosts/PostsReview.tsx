import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";

import { SubmitButton } from "../UI/Buttons/Button";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reviewDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const submitReviewHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    // If the client is not authenticated, re-route to sign in page
    if (!session) {
      console.log("Not signed in.");
      setIsLoading(false);
      router.push("/account/login");
      return;
    }

    const enteredDescription = reviewDescriptionRef.current?.value;

    if (reviewDescriptionRef.current?.value.trim() === "") {
      let showError = setInterval(() => {
        setInputError(true);
        setIsLoading(false);
      });

      // Timing the review validation
      setTimeout(() => {
        clearInterval(showError);
        setInputError(false);
      }, 5000);
    } else {
      const reviewData = {
        post: props.postId,
        description: enteredDescription,
        image: session?.user?.image,
        user: (session?.user as { _id: string })._id as string,
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

      setIsLoading(false);
      reviewDescriptionRef.current!.value = "";
    }
  };
  return (
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
      {/* Input error warning */}
      {inputError && (
        <p
          id="reviewError"
          className="text-xs text-white bg-red-600/70 rounded-md px-1.5 py-0.5 mb-1.5"
        >
          I think you forgot to enter a review.
        </p>
      )}
      <SubmitButton disabled={isLoading}>
        {isLoading ? "Sending..." : "Send review"}
      </SubmitButton>
    </form>
  );
};

export default PostsReview;
