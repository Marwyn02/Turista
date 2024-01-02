import React, { FC, Suspense, useEffect, useState } from "react";
import Head from "next/head";
import router from "next/router";
import { useSession } from "next-auth/react";

import UserPostList from "./UI/UserPostList";
import UserReviewList from "./UI/UserReviewList";

interface IUserProps {
  userId: string;
  name: string;
  image: string;
  postCount: number;
  reviewCount: number;
  posts: any[];
  reviews: any[];
  followers: string[];
}

const User: FC<IUserProps> = ({
  userId,
  name,
  image,
  postCount,
  reviewCount,
  posts,
  reviews,
  followers,
}) => {
  const { data: session } = useSession();
  const [showPost, setShowPost] = useState<Boolean>(true);
  const [showReview, setShowReview] = useState<Boolean>(false);
  const [showFollowBtn, setShowFollowBtn] = useState<Boolean>(false);
  const [followed, setFollowed] = useState<Boolean>(false);

  // Toggler function of post and review
  const toggleHandler = (show: string): void => {
    setShowPost(show === "post");
    setShowReview(show === "review");
  };

  // Handles follow and unfollow actions
  const followingHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // If the client is not authenticated, re-route to sign in page
    if (!session) {
      console.log("Not signed in.");
      router.push("/account/login");
      return;
    }

    try {
      const response = await fetch("/api/user/follow", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          active_user: (session?.user as { _id: string })?._id as string,
        }),
      }).then((r) => r.json());

      console.log(response.message);
      setFollowed(response.followed); // set follow to true if followed
    } catch (error: any) {
      console.error("Failed to follow the user", error);
    }
  };

  useEffect(() => {
    // Show the follow button is the user is not on there profile account
    if (((session?.user as { _id: string })?._id as string) !== userId) {
      setShowFollowBtn(true);
    }

    // Simple following checker, if the client is followed or unfollowed
    if (followers.includes((session?.user as { _id: string })?._id as string)) {
      setFollowed(true);
    }
  }, [userId, session]);
  return (
    <section className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta property="og:title" content="Turista user" key="userTitle" />
      </Head>

      <div className="py-4 md:pt-10 md:pb-20 md:px-3 lg:px-32">
        <div className="md:mt-10" />
        <img
          src="https://res.cloudinary.com/dgzsmdvo4/image/upload/v1697977832/Turista-Uploads/rkfc41dbapg8gbaggfnz.jpg"
          alt="Cover Photo"
          className="w-full h-[200px] md:h-[350px] md:rounded-lg object-cover"
        />

        {/* User's profile image and name */}
        <div className="md:-mt-20 md:px-16 md:flex items-center md:justify-between md:items-end grid grid-cols-1 md:grid-cols-2">
          <section className="-mt-20 md:mt-2.5 flex justify-center items-center md:justify-start md:items-end col-span-1 md:col-span-3">
            <img
              src={image}
              alt={name}
              className="h-40 w-40 rounded-full mx-auto md:mx-0 border-4 border-white"
            />
            {/* Name in desktop device  */}
            <p className="hidden md:block text-3xl text-center ml-4 mt-0.5 md:mt-2 md:mb-5 text-gray-900 font-semibold tracking-wide">
              {name}
            </p>
          </section>
          {showFollowBtn && (
            <section className="py-3 grid col-span-2 md:col-span-1">
              {/* Name for mobile devices */}
              <p className="md:hidden text-2xl text-center -mt-0.5 mb-4 text-gray-900 font-semibold">
                {name}
              </p>

              <button
                type="button"
                onClick={followingHandler}
                className={`px-5 md:px-4 py-1.5 md:py-2 md:mb-2.5 w-fit mx-auto text-sm text-white ${
                  !followed
                    ? "bg-violet-400 hover:bg-violet-500"
                    : "bg-violet-500 hover:bg-violet-400"
                } rounded-md font-semibold`}
              >
                {!followed ? "Follow" : "Followed"}
              </button>
            </section>
          )}
        </div>

        {/* User's profile datas */}
        <div className="bg-violet-400 py-3 px-5 my-3 md:my-8 md:rounded-lg text-white text-xs ">
          <div className="grid grid-cols-4 gap-x-2 text-center font-semibold">
            <p>Posts</p>
            <p>Following</p>
            <p>Followers</p>
            <p>Reviews</p>
          </div>
          <div className="grid grid-cols-4 gap-x-2 mt-1 text-center font-semibold">
            <p>{postCount}</p>
            <p>0</p>
            <p>{followers.length}</p>
            <p>{reviewCount}</p>
          </div>
        </div>

        {/* Button group - Post and Review */}
        <div className="bg-[#1B1D2A] px-5 text-gray-200 md:rounded-lg text-sm grid grid-cols-5 gap-x-3">
          <button
            onClick={() => toggleHandler("post")}
            className={
              showPost
                ? "border-b-4 border-violet-600 text-white duration-200 py-3 font-semibold"
                : "border-b-4 border-transparent hover:border-violet-400 hover:text-white duration-200 py-3 font-semibold"
            }
          >
            Posts
          </button>
          <button
            onClick={() => toggleHandler("review")}
            className={
              showReview
                ? "border-b-4 border-violet-600 text-white duration-200 py-3 font-semibold"
                : "border-b-4 border-transparent hover:border-violet-400 hover:text-white duration-200 py-3 font-semibold"
            }
          >
            Reviews
          </button>
        </div>

        {/* User's posts section */}
        {showPost && (
          <Suspense fallback={<p>Loading posts...</p>}>
            {posts.length > 0 ? (
              <UserPostList posts={posts} />
            ) : (
              <div className="text-center font-medium my-20 text-gray-400">
                No posts yet.
              </div>
            )}
          </Suspense>
        )}

        {/* User's reviews section */}
        {showReview && (
          <Suspense fallback={<p>Loading reviews...</p>}>
            {reviews.length > 0 ? (
              <UserReviewList reviews={reviews} />
            ) : (
              <div className="text-center font-medium my-20 text-gray-400">
                No reviews yet.
              </div>
            )}
          </Suspense>
        )}
      </div>
    </section>
  );
};

export default User;
