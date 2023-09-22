import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

import PostReview from "./PostReview";
import ReviewList from "./ReviewList";

const PostsDetail = (props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [dropdown, setDropdown] = useState(false);

  const [hasImage, setHasImage] = useState(true);
  const [activeSession, setActiveSession] = useState(false);

  useEffect(() => {
    if (props.image === "") {
      setHasImage(false);
    }

    if (session && session.user._id === props.userId) {
      setActiveSession(true);
    }
  }, [props.image, session, props.userId]);

  // Deletes the post
  const deleteHandler = async (event) => {
    event.preventDefault();
    const postId = props.id;

    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      } else {
        router.push("/");
      }
    } catch (error) {
      throw new Error("Error in delete Post: " + error);
    }
  };

  // Hide the dropdown when the user clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Map = dynamic(() => import("@/pages/map/Map"), {
    loading: () => "Loading...",
    ssr: false,
  });
  return (
    <section key={props.id} className="md:px-28 pt-5 md:pt-20">
      <div className="bg-white rounded-t-xl lg:rounded-xl">
        {/* Image */}
        {hasImage && (
          <img
            className="animated-slide md:rounded-lg md:h-[30em]"
            src={props.image}
            alt={props.title}
          />
        )}

        <div className="lg:flex lg:flex-row px-5 pt-6 lg:pt-6">
          {/* Title */}
          <div className="basis-auto lg:basis-7/12 lg:pr-20 relative">
            <div className="flex justify-between">
              <h1 className="text-zinc-700 font-semibold text-2xl lg:text-4xl lg:tracking-wide">
                {props.title}
              </h1>
              <img
                src="/horizontal-dots.svg"
                alt="lel"
                height={23}
                width={23}
                className="hover:bg-gray-200"
                ref={buttonRef}
                onClick={() => setDropdown(!dropdown)}
              />
            </div>

            {/* Dropdown  */}
            {dropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-1 lg:right-20 bg-white rounded border w-32 z-[9999]"
              >
                {activeSession ? (
                  <ul className="text-sm text-slate-700">
                    <Link href={`/edit/${props.id}`}>
                      <li className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300">
                        <img
                          src="/pen.svg"
                          height={18}
                          width={18}
                          alt="lel"
                          className="mr-1.5"
                        />
                        Edit
                      </li>
                    </Link>
                    <li
                      onClick={deleteHandler}
                      className="hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300"
                    >
                      <img
                        src="/trash.svg"
                        height={18}
                        width={18}
                        alt="lel"
                        className="mr-1.5"
                      />{" "}
                      Delete
                    </li>
                  </ul>
                ) : (
                  <ul className="text-sm text-slate-700">
                    <li className="hover:bg-gray-200 hover:text-black py-1.5 pl-4">
                      Save
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Location   */}
            <p className="text-sm lg:text-xl mt-2 text-black font-medium">
              {props.location}
            </p>

            {/* User */}
            <div className="flex items-center mt-5 border-y py-5">
              <img src={props.userImage} alt="lel" className="rounded-3xl" />
              <p className="text-base font-medium text-black/80 ml-4">
                Posted by {props.user ? props.user : "Anonymous"}
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
            <p className="text-black text-base font-light border-t py-5 mb-8">
              {props.description}
            </p>
          </div>

          {/* Map and Create Review */}
          <div className="basis-auto lg:basis-5/12 lg:px-8">
            <Map
              checkLat={props.coordinate.lat}
              checkLng={props.coordinate.lng}
            />
            {activeSession && <PostReview postId={props.id} />}
          </div>
        </div>
      </div>
      <aside className="bg-white px-5 py-3 rounded-b-xl md:rounded-none overflow-y-auto">
        <Suspense fallback={<p className="text-center">Loading reviews...</p>}>
          <ReviewList reviewData={props.reviews} />
        </Suspense>
      </aside>
    </section>
  );
};

export default PostsDetail;
