import React, { FC, Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { useSession } from "next-auth/react";

import UserPostList from "./UI/UserPostList";
import UserReviewList from "./UI/UserReviewList";
import router from "next/router";

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

  const user_in_session = (session?.user as { _id: string })?._id as string;

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
        body: JSON.stringify({ userId: userId, active_user: user_in_session }),
      }).then((r) => r.json());

      console.log(response.message);
      setFollowed(response.followed); // set follow to true if followed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Show the follow button is the user is not on there profile account
    if (user_in_session !== userId) {
      setShowFollowBtn(true);
    }

    // Simple following checker, if the client is followed or unfollowed
    if (followers.includes(user_in_session)) {
      setFollowed(true);
    }
  }, [userId, user_in_session]);
  return (
    <section className="bg-gray-50">
      <Head>
        <title>{name}</title>
        <meta property="og:title" content="Turista user" key="userTitle" />
      </Head>
      <div className="py-16 md:py-32 px-3 lg:px-32">
        {/* User's profile image and name */}
        <div className="-mt-5 md:px-10 flex justify-between items-center">
          <section className="justify-items-center md:flex md:justify-items-start">
            <img
              src={image}
              alt={name}
              className="h-14 md:h-20 rounded-full mx-auto md:mx-0"
            />
            <p className="user_name">{name}</p>
          </section>
          {showFollowBtn && (
            <section>
              <button
                type="button"
                onClick={followingHandler}
                className="px-5 py-1.5 text-sm text-white bg-violet-500 rounded-full"
              >
                {!followed ? "Follow" : "Followed"}
              </button>
            </section>
          )}
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
            <p>{followers.length}</p>
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
