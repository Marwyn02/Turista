import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

interface UserPostsListProps {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
}

const UserPostList: FC<UserPostsListProps> = ({ posts }) => {
  return (
    <>
      <div className="pb-4 mt-4 my-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="relative bg-gray-200 pt-[100%]">
            <Link href={`/${post.id}`}>
              <Image
                className="displayed_image"
                src={post.image}
                width={200}
                height={200}
                alt={post.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPostList;
