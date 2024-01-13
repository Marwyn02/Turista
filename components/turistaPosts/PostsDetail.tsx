import React, { FC, Suspense } from "react";
import Link from "next/link";

import PostImages from "./PostUI/PostImages";
import PostsDetailNavigation from "./PostUI/PostsDetailNavigation";
import ReviewList from "../review/ReviewList";
import { Icon } from "../UI/Images/Image";
import PostsAside from "./PostsAside";

type TImages = {
  image: string;
  public_id: string;
};

type TAmenities = {
  name: string;
  description: string;
  checked: boolean;
  id: string;
};

type TReviews = {
  id: string;
  date: string;
  name: string;
  image: string;
  description: string;
  postId: string;
  userId: string;
};

type TPostsDetailProps = {
  id: string;
  loves: string[];
  title: string;
  coordinate: {
    lng: number;
    lat: number;
  };
  location: string;
  image: TImages[];
  description: string;
  amenities: TAmenities[];
  user: string;
  userId: string;
  userImage: string;
  reviews: TReviews[];
  date: string;
};

const PostsDetail: FC<TPostsDetailProps> = (props) => {
  return (
    <section key={props.id} className="md:px-32 pt-10 md:pt-20">
      <main>
        {/* Post navigations, Love, Delete, and Edit */}
        <PostsDetailNavigation
          userId={props.userId}
          postId={props.id}
          loves={props.loves}
        />

        {/* Image */}
        <PostImages images={props.image} />

        {/* Post text details */}
        <div className="lg:flex lg:flex-row pt-4 md:pt-6 px-5 md:px-0 lg:pt-3">
          <div className="basis-auto lg:basis-7/12 lg:pr-14 relative">
            {/* Title and Dropdown */}
            <h1 className="post_title">{props.title}</h1>

            {/* Location   */}
            <p className="post_location">{props.location}</p>

            {/* User */}
            <div className="flex items-center mt-5 border-y py-5">
              <Link href={`/user/${props.userId}`}>
                <img
                  className="rounded-full h-8 w-8 md:h-10 md:w-10"
                  src={props.userImage}
                  alt="Profile"
                />
              </Link>
              <p className="text-sm md:text-base font-medium text-black/80 ml-2 md:ml-4">
                Posted by{" "}
                <Link href={`/user/${props.userId}`}>
                  <span className="text-violet-500 hover:underline">
                    {props.user ? props.user : "Anonymous"}
                  </span>
                </Link>
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6">
              <h3 className="font-medium text-lg">This place has</h3>
              <div className="mt-2">
                {props.amenities.length > 0 ? (
                  props.amenities
                    .filter((item) => item.checked)
                    .map((item) => (
                      <div key={item.id} className="flex items-center py-1">
                        <Icon
                          src={`/Amenities/${item.name}.svg`}
                          alt="Liked"
                          height={18}
                          width={18}
                        />
                        <p className="text-black/90 font-light ml-2">
                          {item.name}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-gray-400">No amenities to offer</p>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="post_description">{props.description}</p>
          </div>

          {/* Map and Create Review */}

          <PostsAside
            postId={props.id}
            checkLat={props.coordinate.lat}
            checkLng={props.coordinate.lng}
          />
        </div>
      </main>

      <aside className="bg-white py-3 px-5 md:px-0 rounded-b-xl md:rounded-none overflow-y-auto">
        <Suspense fallback={<p className="text-center">Loading reviews...</p>}>
          <ReviewList reviews={props.reviews} />
        </Suspense>
      </aside>
    </section>
  );
};

export default PostsDetail;
