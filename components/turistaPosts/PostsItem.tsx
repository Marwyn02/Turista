import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface PostsItemProps {
  id: string;
  image: string;
  location: string;
  userId: string;
  userName: string;
  userImage: string;
}

const PostsItem: FC<PostsItemProps> = ({
  id,
  image,
  location,
  userId,
  userName,
  userImage,
}) => {
  const router = useRouter();
  return (
    <section>
      <main
        key={id}
        className="pt-[100%] relative rounded-lg duration-300 group"
      >
        <Image
          className="displayed_image"
          src={image}
          fill={true}
          alt={location}
          onClick={() => router.push(`/${id}`)}
        />

        <Link href={`/user/${userId}`}>
          <img
            src={userImage}
            alt={id}
            className="h-[60px] w-[60px] rounded-full absolute z-20 -top-2 -left-2 border-[6px]
            bg-white border-white border-t-violet-500 border-l-pink-300
            group-hover:border-r-pink-300 duration-300 group-hover:border-white"
          />
        </Link>

        <Link href={`/user/${userId}`}>
          <p
            className="z-10 absolute top-0 left-2.5 pl-11 pr-0 py-0.5 bg-gradient-to-r from-white from-50% to-transparent 
            text-gray-700 font-medium text-sm truncate w-[250px] sm:w-[200px]
            lg:w-[180px] hover:underline group-hover:bg-white group-hover:rounded-full"
          >
            {userName}
          </p>
        </Link>
      </main>

      <p className="text-gray-700 text-sm py-1 ml-1">{location}</p>
    </section>
  );
};

export default PostsItem;
