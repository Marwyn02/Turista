import React, { FC } from "react";
import Link from "next/link";

type TPostCardProps = {
  id: string;
  title: string;
  location: string;
  image: string;
};

const PostCard: FC<TPostCardProps> = ({ id, title, location, image }) => {
  return (
    <section>
      <Link key={id} href={`/${id}`}>
        <div className="relative group">
          <Link href={`/edit/${id}`}>
            <button
              className="absolute opacity-0 top-2.5 right-2.5 
                bg-violet-500 p-2 hover:bg-violet-600
                rounded-lg group-hover:opacity-100 duration-300 focus:outline-none "
            >
              <img
                src="/pencil-white.svg"
                height={18}
                width={18}
                alt=""
                className="z-20"
              />
            </button>
          </Link>
          <img src={image} alt={title} className="rounded-lg" />
          <div className="flex justify-between items-center mt-1 px-2">
            <p className="font-semibold text-gray-700 text-sm">{title}</p>
            <p className="text-xs text-gray-500 font-bold">{location}</p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default PostCard;
