import React, { FC } from "react";
import Image from "next/image";
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
      <main key={id} className="pt-[100%] relative rounded-lg duration-300">
        <Image
          className="displayed_image"
          src={image}
          fill={true}
          alt={location}
          onClick={() => router.push(`/${id}`)}
        />
      </main>

      <section className="py-0.5 md:py-1.5">
        <p className="font-medium text-gray-900 text-sm">{location}</p>
      </section>
    </section>
  );
};

export default PostsItem;
