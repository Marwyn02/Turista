import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface PostsItemProps {
  id: string;
  image: string;
  location: string;
}

const PostsItem: FC<PostsItemProps> = ({ id, image, location }) => {
  return (
    <section>
      <Link key={id} href={`/${id}`}>
        <div className="pt-[100%] relative rounded-lg duration-300 group">
          {/* Main image of the post item  */}
          <Image
            className="displayed_image"
            src={image}
            width={700}
            height={700}
            alt={location}
          />
        </div>
        {/* Post location information */}
        <p className="text-gray-900 font-medium text-sm py-1 ml-1">
          {location}
        </p>
      </Link>
    </section>
  );
};

export default PostsItem;
