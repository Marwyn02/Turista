import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useSession } from "next-auth/react";

import { DeleteModal } from "@/components/UI/Modals/Modal";
import { ConfirmButton } from "@/components/UI/Buttons/Button";
import { Icon } from "@/components/UI/Images/Image";

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
  const [inSession, setInSession] = useState<boolean>(false);
  const [postLove, setPostLove] = useState<boolean>(false);
  const [totalPostLove, setTotalPostLove] = useState<number>(0);

  // Add likes to the post function handler
  const submitLoveHandler = async (e: { preventDefault: () => void }) => {
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
      body: JSON.stringify({
        postId: postId,
        userId: (session?.user as { _id: string })?._id as string,
      }),
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
          body: JSON.stringify({
            postId: postId,
            userId: (session?.user as { _id: string })?._id as string,
          }),
        }).then((r) => r.json());

        setPostLove(response.loves);
        setTotalPostLove(response.total_loves);
      } catch (error: any) {
        console.error(error);
      }
    };

    checkLikeStatus();
  }, [postId, session]);

  // This function checks if the user active is same with post creator
  // To show the edit and delete buttons, only for the creator
  useEffect(() => {
    if (
      session &&
      ((session?.user as { _id: string })?._id as string) === userId
    ) {
      setInSession(true);
    }

    // Simple loving checker, if the client loved or unloved the post
    if (loves.includes((session?.user as { _id: string })?._id as string)) {
      setPostLove(true);
    }
  }, [session, userId]);
  return (
    <section className="flex justify-between items-center pb-2 md:pb-2 px-1">
      <div className="flex items-center">
        <button
          onClick={submitLoveHandler}
          className="px-2 py-2 md:px-2.5 bg-violet-100 duration-300 rounded hover:bg-violet-400"
        >
          {!postLove && (
            <Icon src="/heart-white.svg" alt="heart" height={18} width={18} />
          )}
          {postLove && (
            <Icon src="/heart-fill.svg" alt="liked" height={18} width={18} />
          )}
        </button>
        <span className="ml-2 text-sm text-gray-600 font-bold">
          {totalPostLove > 1
            ? `${totalPostLove} loves`
            : `${totalPostLove} love`}
        </span>
      </div>

      {inSession && (
        <div className="flex gap-x-1 md:gap-x-2">
          {/* Delete Action  */}
          <DeleteModal postId={postId} />

          {/* Edit Action  */}
          <Link href={`/edit/${postId}`}>
            <ConfirmButton>
              <Icon
                src="/pencil-white.svg"
                alt="pencil"
                height={15}
                width={15}
              />
              <span className="ml-2 text-white font-semibold text-xs">
                Edit
              </span>
            </ConfirmButton>
          </Link>
        </div>
      )}
    </section>
  );
};

export default PostsDetailNavigation;
