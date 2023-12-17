import React, { FC } from "react";
import PostCard from "./PostCard";

type TPostsProps = {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
};

const PostOverview: FC<TPostsProps> = ({ posts }) => {
  return (
    <>
      <div className="mt-10 mb-5 flex justify-between items-center">
        <h1 className="text-2xl text-gray-800 font-medium tracking-wider">
          Your posts
        </h1>
        <button
          className="border border-black px-4 py-1 rounded-md tracking-wide
          text-sm font-medium hover:border-gray-300 hover:text-gray-600 duration-300"
        >
          Create post
        </button>
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
