import React from "react";

const PostsItem = (props) => {
  const test = () => {
    console.log("Test");
  };
  return (
    <div className="text-white border bg-gray-700 rounded mb-3" onClick={test}>
      <img src={props.image} alt="" />
      <div className="p-3">
        <h1 className="text-gray-200 text-2xl">{props.title}</h1>
        <p className="text-sm text-gray-400">{props.location}</p>
        <p className="text-sm text-gray-400">{props.description}</p>
      </div>
    </div>
  );
};

export default PostsItem;
