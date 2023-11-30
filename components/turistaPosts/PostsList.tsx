import { FC } from "react";
import PostsItem from "./PostsItem";

interface PostsItemProps {
  posts: {
    id: string;
    location: string;
    image: string;
    userId: string;
    userName: string;
    userImage: string;
  }[];
}

const PostsList: FC<PostsItemProps> = (props) => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-3.5 md:px-0">
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

// const userImage = await Promise.all(
//   user.map(async (img) => {
//     return {
//       image: img.image,
//     };
//   })
// );
