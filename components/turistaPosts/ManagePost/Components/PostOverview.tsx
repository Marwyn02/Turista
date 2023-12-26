import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "./PostCard";
import { useSession } from "next-auth/react";

type TPostsProps = {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
};

const PostOverview: FC<TPostsProps> = ({ posts }) => {
  const { data: session } = useSession();
  const [userHasCreatedPost, setUserHasCreatedPost] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      const fetchUserPostStatus = async () => {
        try {
          const response = await fetch("/api/user/restrict", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userId: (session?.user as { _id: string })?._id as string,
            }),
          }).then((r) => r.json());

          setUserHasCreatedPost(response.userHasCreatedPost);
        } catch (error: any) {
          console.error("Main navigation error:", error);
        }
      };

      fetchUserPostStatus();
    }
  }, [session]);
  return (
    <>
      <div className="mt-10 mb-5 flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-medium">Your posts</h1>
        <div className="flex items-center">
          {userHasCreatedPost && (
            <img
              src="/Warnings/exclamation-mark.svg"
              height={18}
              width={18}
              alt=""
              className="mr-2"
            />
          )}
          <Link href={"/create"}>
            <button
              type="button"
              className={`border-2 px-4 py-1.5 rounded-md 
              tracking-wide text-sm font-medium duration-300 focus:outline-none ${
                userHasCreatedPost
                  ? "text-violet-100 border-violet-200"
                  : "border-violet-500 text-violet-500 hover:border-transparent hover:text-white hover:bg-violet-500"
              }`}
              disabled={userHasCreatedPost}
            >
              Create your new post
            </button>
          </Link>
        </div>
      </div>
      {posts.length !== 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              location={post.location}
              image={post.image}
            />
          ))}
        </section>
      ) : (
        <p className="text-gray-400 text-center text-sm mt-32">
          You haven't posted anything...
          <br />
          <Link
            href={"/create"}
            className="text-violet-400 underline hover:text-violet-600 pt-2 font-semibold"
          >
            Create post here.
          </Link>
        </p>
      )}
    </>
  );
};

export default PostOverview;
