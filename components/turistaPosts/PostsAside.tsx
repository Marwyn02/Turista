import React, { FC } from "react";
import PostRating from "./PostUI/PostRating";
import PostsMap from "./PostUI/PostsMap";
import PostsReview from "./PostsReview";

type TPostsAside = {
  postId: string;
  checkLat: number;
  checkLng: number;
};

const PostsAside: FC<TPostsAside> = ({ postId, checkLat, checkLng }) => {
  return (
    <section className="basis-auto lg:basis-5/12 border-2 rounded-t-[20px] rounded-b-lg pb-5">
      {/* Post Map display  */}
      <PostsMap checkLat={checkLat} checkLng={checkLng} />
      {/* 
      <PostRating title={"Facilities and Activities"} />

      <PostRating title={"Service and Staff"} />

      <PostRating title={"Value for Money"} /> */}

      {/* Post review create  */}
      <PostsReview postId={postId} />
    </section>
  );
};

export default PostsAside;
