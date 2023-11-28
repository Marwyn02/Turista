import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useSession } from "next-auth/react";

import DeletePostModal from "../../UI/DeletePostModal";
import LoadingPostModal from "@/components/UI/LoadingPostModal";

type TPostsDetailNavigationProps = {
  userId: string;
  postId: string;
  loves: string[];
};

const PostsDetailNavigation: FC<TPostsDetailNavigationProps> = ({
  userId,
  postId,
  loves,
}) => {
  const { data: session } = useSession();

  // Store the session.user._id here to a constant so I can use it globally.
  const user_in_session = (session?.user as { _id: string })?._id as string;

  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [postLove, setPostLove] = useState<boolean>(false);
  const [totalPostLove, setTotalPostLove] = useState<number>(0);

  // Add likes to the post function handler
  const handleLikesHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // If the client is not authenticated, re-route to sign in page
    if (!session) {
      console.log("Not signed in.");
      router.push("/account/login");
      return;
    }

    const response = await fetch("/api/love/love", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postId: postId, userId: user_in_session }),
    }).then((r) => r.json());

    console.log(response.message);
    setPostLove(response.loves); // false if already loved
    setTotalPostLove(response.total_loves);
  };

  // This checks of how many loves does the post have
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch("/api/love/check", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ postId: postId, userId: user_in_session }),
        }).then((r) => r.json());

        setPostLove(response.loves);
        setTotalPostLove(response.total_loves);
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

    // Simple loving checker, if the client loved or unloved the post
    if (loves.includes(user_in_session)) {
      setPostLove(true);
    }
  }, [session, userId, user_in_session]);
  return (
    <section className="flex justify-between items-center pb-2 md:pb-2 px-1">
      <div className="flex items-center">
        <button
          onClick={handleLikesHandler}
          className="px-2 py-2 md:px-2.5 bg-violet-100 duration-300 rounded hover:bg-violet-400"
        >
          {!postLove && (
            <img src="/heart-white.svg" height={18} width={18} alt="No-Like" />
          )}
          {postLove && (
            <img src="/heart-fill.svg" height={18} width={18} alt="Liked" />
          )}
        </button>
        <span className="ml-2 text-sm text-gray-600 font-bold">
          {totalPostLove > 1
            ? `${totalPostLove} loves`
            : `${totalPostLove} love`}
        </span>
      </div>

      {activeSession && (
        <div className="flex gap-x-1 md:gap-x-2">
          {/* <LoadingPostModal postId={postId} /> */}

          {/* Delete Action  */}
          <DeletePostModal postId={postId} />

          {/* Edit Action  */}
          <Link href={`/edit/${postId}`}>
            <button
              className="px-2 py-2 md:px-2.5 bg-violet-400 duration-300 
              flex items-center rounded hover:bg-violet-500"
            >
              <img src="/pencil-white.svg" height={18} width={18} alt="Edit" />
              <span className="ml-2 text-white font-semibold text-xs">
                Edit
              </span>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default PostsDetailNavigation;
