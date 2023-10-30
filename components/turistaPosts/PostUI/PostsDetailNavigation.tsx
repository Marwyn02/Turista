import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";

type PostsDetailNavigationProps = {
  userId: string;
  postId: string;
  likes: string[];
};

const PostsDetailNavigation: FC<PostsDetailNavigationProps> = ({
  userId,
  postId,
  likes,
}) => {
  const { data: session } = useSession();

  // Store the session.user._id here to a constant so I can use it globally.
  const user_in_session = (session?.user as { _id: string })?._id as string;

  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  // Add likes to the post function handler
  const handleLikesHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // If the client is not authenticated, re-route to sign in page
    if (!session) {
      console.log("Not signed in.");
      router.push("/account/login");
      return;
    }

    const response = await fetch("/api/like/like", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postId: postId, userId: user_in_session }),
    }).then((r) => r.json());

    console.log(response.message);
    setLiked(response.liked); // false if already liked
    setTotalLikes(response.total_likes);
  };

  // This checks of how many likes does the post have
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch("/api/like/check", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ postId: postId, userId: user_in_session }),
        }).then((r) => r.json());

        setLiked(response.liked);
        setTotalLikes(response.total_likes);
      } catch (error: any) {
        console.error(error);
      }
    };

    checkLikeStatus();
  }, [postId, user_in_session]);

  // This function checks if the user active is same with post creator
  // To show the edit and delete buttons, only for the creator
  useEffect(() => {
    if (session && user_in_session === userId) {
      setActiveSession(true);
    }

    // Simple liking checker, if the client liked or unliked the post
    if (likes.includes(user_in_session)) {
      setLiked(true);
    }
  }, [session, userId, user_in_session]);

  // Deletes the post in the database
  const deleteHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      }).then((r) => r.json());

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log(response.message);
      router.push(response.redirect);
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <section className="flex justify-between items-center pb-1 md:pb-2 px-1">
      <div className="flex items-center">
        <button
          onClick={handleLikesHandler}
          className="px-2 py-2 md:px-2.5 bg-violet-100 duration-300 rounded hover:bg-violet-400"
        >
          {!liked && (
            <img src="/heart-white.svg" height={18} width={18} alt="No-Like" />
          )}
          {liked && (
            <img src="/heart-fill.svg" height={18} width={18} alt="Liked" />
          )}
        </button>
        <span className="ml-2 text-sm text-gray-600 font-bold">
          {totalLikes > 1 ? `${totalLikes} likes` : `${totalLikes} like`}
        </span>
      </div>

      {activeSession && (
        <div className="flex gap-x-1 md:gap-x-2">
          <button
            onClick={deleteHandler}
            className="px-2 py-2 md:px-2.5 bg-violet-400 duration-300 rounded hover:bg-violet-400"
          >
            <img src="/trash.svg" height={18} width={18} alt="Delete" />
          </button>

          <Link href={`/edit/${postId}`}>
            <button className="px-2 py-2 md:px-2.5 bg-violet-400 duration-300 rounded hover:bg-violet-400">
              <img src="/pencil-white.svg" height={18} width={18} alt="Edit" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default PostsDetailNavigation;
