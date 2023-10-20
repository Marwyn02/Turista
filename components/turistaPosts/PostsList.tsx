import { FC } from "react";
import PostsItem from "./PostsItem";

interface PostsItemProps {
  posts: {
    id: string;
    image: string;
    location: string;
  }[];
}

const PostsList: FC<PostsItemProps> = (props) => {
  return (
    <section className="grid md:grid-cols-4 gap-4 px-5 md:px-0">
      {props.posts.map((item) => (
        <PostsItem
          key={item.id}
          id={item.id}
          image={item.image}
          location={item.location}
        />
      ))}
    </section>
  );
};

export default PostsList;