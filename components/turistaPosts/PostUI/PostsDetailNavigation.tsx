import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import router from "next/router";

type PostsDetailNavigationProps = {
  userId: string;
  postId: string;
};

const PostsDetailNavigation: FC<PostsDetailNavigationProps> = ({
  userId,
  postId,
}) => {
  const { data: session } = useSession();

  console.log(userId);

  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>();

  const handleLikesHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/api/post/like", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    }).then((r) => r.json());
    // user havent liked the post yet

    setLiked(response.success); // false if already liked
    console.log(response.message);

    console.log("Liked!");
  };

  // useEffect(() => {
  //   const liking = async () => {
  //     try {
  //       const response = await fetch("/api/post/like", {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({ postId, userId }),
  //       }).then((r) => r.json());

  //       console.log(response.message);
  //     } catch (error: any) {
  //       console.error(error);
  //     }
  //   };

  //   liking();
  // }, [userId]);

  // This function checks if the user active is same with post creator
  // To show the edit and delete buttons, only for the creator
  useEffect(() => {
    if (session && (session.user as { _id: string })._id === userId) {
      setActiveSession(true);
    }
  }, [session, userId]);

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
      throw new Error("Error in Delete Post Handler, ", error);
    }
  };

  return (
    <section className="flex justify-between items-center pb-2">
      <button
        onClick={handleLikesHandler}
        className="px-4 py-3.5 bg-violet-100 duration-300 rounded hover:bg-violet-400"
      >
        <img src="/heart-white.svg" height={18} width={18} alt="Edit" />
        {liked && <p>Liked</p>}
      </button>

      {activeSession && (
        <div className="flex gap-x-2">
          <button
            onClick={deleteHandler}
            className="px-4 py-3.5 bg-violet-400 duration-300 rounded hover:bg-violet-500"
          >
            <img src="/trash.svg" height={18} width={18} alt="Delete" />
          </button>

          <Link href={`/edit/${postId}`}>
            <button className="px-4 py-3.5 bg-violet-400 duration-300 rounded hover:bg-violet-500">
              <img src="/pencil-white.svg" height={18} width={18} alt="Edit" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default PostsDetailNavigation;
