import React, { FC } from "react";

type PostsProps = {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
};

const PostOverview: FC<PostsProps> = ({ posts }) => {
  return (
    <div>
      <h1>Post Overview</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.location}</p>
            <img src={post.image} alt={post.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostOverview;
