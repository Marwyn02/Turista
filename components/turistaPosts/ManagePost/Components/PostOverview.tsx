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

  // Restrict the user to show the create post button
  // if the user has already created a post
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
        <h1 className="text-2xl text-gray-800 font-medium tracking-wider">
          Your posts
        </h1>
        <div className="flex items-center">
          <img
            src="/Warnings/exclamation-mark.svg"
            height={18}
            width={18}
            alt=""
            className="mr-2"
          />
          <Link href={"/create"} className="group">
            <button
              className={`border border-black px-4 py-1 rounded-md 
              tracking-wide text-sm font-medium duration-300 ${
                userHasCreatedPost
                  ? "text-gray-300 border-gray-300"
                  : "group-hover:border-gray-300 group-hover:text-gray-600"
              }`}
              disabled={userHasCreatedPost}
            >
              Create post
            </button>
          </Link>
        </div>
      </div>
      <section className="grid grid-cols-2 gap-x-4">
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
    </>
  );
};

export default PostOverview;
