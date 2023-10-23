import React, { FC, Suspense, useState } from "react";
import Head from "next/head";
import UserPostList from "./UI/UserPostList";
import UserReviewList from "./UI/UserReviewList";

interface UserProps {
  name: string;
  image: string;
  postCount: number;
  reviewCount: number;
  posts: any[];
  reviews: any[];
}

const User: FC<UserProps> = ({
  name,
  image,
  postCount,
  reviewCount,
  posts,
  reviews,
}) => {
  const [showPost, setShowPost] = useState<Boolean>(true);
  const [showReview, setShowReview] = useState<Boolean>(false);

  // Toggler function of post and review
  const toggleHandler = (show: string): void => {
    setShowPost(show === "post");
    setShowReview(show === "review");
  };

  return (
    <section className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta property="og:title" content="Turista user" key="userTitle" />
      </Head>
      <div className="py-16 md:py-32 px-3 lg:px-32">
        {/* User's profile image and name */}
        <div className="-mt-5 md:px-10 justify-items-center md:flex md:justify-items-start">
          <img
            src={image}
            alt={name}
            className="h-14 md:h-20 rounded-full mx-auto md:mx-0"
          />
          <p className="user_name">{name}</p>
        </div>

        {/* User's profile datas */}
        <div className="bg-violet-400 py-3 px-5 my-3 md:my-8 rounded-lg text-white text-xs ">
          <div className="grid grid-cols-4 gap-x-2 text-center font-semibold">
            <p>Posts</p>
            <p>Following</p>
            <p>Followers</p>
            <p>Reviews</p>
          </div>
          <div className="grid grid-cols-4 gap-x-2 mt-1 text-center font-semibold">
            <p>{postCount}</p>
            <p>0</p>
            <p>0</p>
            <p>{reviewCount}</p>
          </div>
        </div>

        {/* Button group - Post and Review */}
        <div className="bg-[#1B1D2A] px-5 text-gray-200 rounded-lg text-sm grid grid-cols-5 gap-x-3">
          <button
            onClick={() => toggleHandler("post")}
            className={
              showPost
                ? "border-b-4 border-violet-600 text-white duration-200 py-3"
                : "border-b-4 border-transparent hover:border-violet-400 hover:text-white duration-200 py-3"
            }
          >
            Posts
          </button>
          <button
            onClick={() => toggleHandler("review")}
            className={
              showReview
                ? "border-b-4 border-violet-600 text-white duration-200 py-3"
                : "border-b-4 border-transparent hover:border-violet-400 hover:text-white duration-200 py-3"
            }
          >
            Reviews
          </button>
        </div>

        {/* User's posts section */}
        {showPost && (
          <Suspense fallback={<p>Loading posts...</p>}>
            <UserPostList posts={posts} />
          </Suspense>
        )}

        {/* User's reviews section */}
        {showReview && (
          <Suspense fallback={<p>Loading reviews...</p>}>
            <UserReviewList reviews={reviews} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default User;
