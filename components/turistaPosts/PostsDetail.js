import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import PostReview from "./PostReview";
import ReviewList from "./ReviewList";
import Dropdown from "../ui/Dropdown";
import Link from "next/link";

const PostsDetail = (props) => {
  const { data: session } = useSession();

  const [hasImage, setHasImage] = useState(true);

  // Check if the user has already active
  useEffect(() => {
    if (props.image === "") {
      setHasImage(false);
    }
  }, [props.image]);

  const Map = dynamic(() => import("@/pages/map/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });

  return (
    <section key={props.id} className="md:px-32 pt-5 md:pt-20">
      <div className="bg-white rounded-t-xl lg:rounded-xl">
        {/* Image */}
        {hasImage && (
          <div className="md:grid md:grid-rows-4 md:grid-cols-3 md:gap-4">
            <div className="md:row-span-4 md:col-span-2">
              <img
                className="animated-slide md:rounded-lg h-full w-full hover:brightness-90 duration-100"
                src={props.image}
                alt={props.title}
              />
            </div>

            {/* Dummy extra images */}
            <div className="hidden md:block md:row-span-2">
              <img
                className="md:rounded-lg w-full h-full hover:brightness-90 duration-100"
                src="https://images.unsplash.com/photo-1695453463057-aa5d48d9e3d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80"
                alt={props.title}
              />
            </div>
            <div className="hidden md:block md:row-span-2">
              <img
                className="md:rounded-lg w-full h-full hover:brightness-90 duration-100"
                src="https://images.unsplash.com/photo-1695065906720-19e9c4d4644e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2988&q=80"
                alt={props.title}
              />
            </div>
          </div>
        )}

        {/* Post text details */}
        <div className="lg:flex lg:flex-row pt-4 md:pt-6 px-5 md:px-0 lg:pt-3">
          <div className="basis-auto lg:basis-7/12 lg:pr-14 relative">
            {/* Title and Dropdown */}
            <div className="flex justify-between">
              <h1 className="capitalize text-zinc-700 font-semibold text-2xl lg:text-4xl lg:tracking-wide">
                {props.title}
              </h1>
              <Dropdown user={{ userId: props.userId, postId: props.id }} />
            </div>

            {/* Location   */}
            <p className="capitalize text-sm lg:text-xl mt-2 text-black font-medium">
              {props.location}
            </p>

            {/* User */}
            <div className="flex items-center mt-5 border-y py-5">
              <Link href={`/user/${props.userId}`}>
                <img src={props.userImage} alt="lel" className="rounded-full" />
              </Link>
              <p className="text-base font-medium text-black/80 ml-4">
                Posted by{" "}
                <span className="text-indigo-600">
                  {props.user ? props.user : "Anonymous"}
                </span>
              </p>
            </div>

            {/* Amenities */}
            <div className="py-6">
              <h3 className="font-medium text-lg">This place has</h3>
              <ul className="mt-2">
                {props.amenities &&
                  props.amenities
                    .filter((item) => item.checked)
                    .map((item) => (
                      <li
                        key={item.id}
                        className="text-black/80 font-light text-base py-1"
                      >
                        - {item.name}
                      </li>
                    ))}
              </ul>
            </div>

            {/* Description */}
            <p className="capitalize text-black text-base font-light border-t py-5 mb-8">
              {props.description}
            </p>
          </div>

          {/* Map and Create Review */}
          <div className="basis-auto lg:basis-5/12">
            <Map
              checkLat={props.coordinate.lat}
              checkLng={props.coordinate.lng}
            />
            {session && <PostReview postId={props.id} />}
          </div>
        </div>
      </div>

      <aside className="bg-white py-3 px-5 md:px-0 rounded-b-xl md:rounded-none overflow-y-auto">
        <Suspense fallback={<p className="text-center">Loading reviews...</p>}>
          <ReviewList reviewData={props.reviews} />
        </Suspense>
      </aside>
    </section>
  );
};

export default PostsDetail;
