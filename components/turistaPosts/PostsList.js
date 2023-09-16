import { Fragment } from "react";

import PostsItem from "./PostsItem";

const PostsList = (props) => {
  return (
    <Fragment>
      {props.posts.map((item) => (
        <PostsItem
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          location={item.location}
          description={item.description}
        />
      ))}
    </Fragment>
  );
};

export default PostsList;
