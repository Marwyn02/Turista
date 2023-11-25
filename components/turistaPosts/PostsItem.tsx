import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface PostsItemProps {
  id: string;
  image: string;
  location: string;
}

const PostsItem: FC<PostsItemProps> = ({ id, image, location }) => {
  const router = useRouter();
  return (
    <section>
      <main
        key={id}
        className="pt-[100%] relative rounded-lg duration-300 group"
      >
        {/* Main image of the post item  */}
        <Image
          className="displayed_image"
          src={image}
          fill={true}
          alt={location}
          onClick={() => router.push(`/${id}`)}
        />
      </main>

      {/* Post location information */}
      <p className="text-gray-900 font-medium text-sm py-1 ml-1">{location}</p>
    </section>
  );
};

export default PostsItem;
