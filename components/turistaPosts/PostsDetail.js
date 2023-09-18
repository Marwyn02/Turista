import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import PostReview from "./PostReview";
import ReviewList from "./ReviewList";

// import dynamic from "next/dynamic";

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

  // const Map = dynamic(() => import("@/pages/map/Map"), {
  //   loading: () => "Loading...",
  //   ssr: false,
  // });
  return (
    <section
      key={props.id}
      className="flex flex-col lg:flex-row gap-x-2 drop-shadow-lg shadow-white/20 md:px-10 py-1 sm:py-8 md:py-10 lg:py-16"
    >
      <div className="md:basis-3/4 bg-white relative rounded-t-xl lg:rounded-xl lg:h-[51em]">
        {hasImage && (
          <img
            className="lg:col-span-3 lg:order-1 animated-slide rounded-t-xl"
            src={props.image}
            alt={props.title}
          />
        )}
        <div className="p-2.5">
          <div className="flex justify-between">
            <h1 className="text-zinc-700 font-semibold">{props.title}</h1>
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

          {dropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-2 bg-white rounded border w-32 z-[9999]"
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

          <p className="text-xs -mt-1 text-zinc-900/50 font-light">
            {props.location}
          </p>
          <div className="flex gap-x-2 mt-2">
            {props.amenities &&
              props.amenities
                .filter((item) => item.checked)
                .map((item) => (
                  <div
                    key={item.id}
                    className="text-gray-600 text-xs border-blue-300 bg-gray-50 border rounded-xl px-1.5 py-0.5"
                  >
                    {item.name}
                  </div>
                ))}
          </div>
          <p className="text-xs mt-2 mb-0.5 text-gray-500">
            - {props.user ? props.user : "Anonymous"}
          </p>
          <hr className="mt-3"></hr>
          <p className="mt-2 text-zinc-600 text-base font-light">
            {props.description}
          </p>
        </div>

        <div className="mt-14 px-2">
          <Link href="/">
            <button className="text-black w-20 md:w-28 md:px-6 py-1 rounded-lg text-sm border border-gray-600">
              Back
            </button>
          </Link>
        </div>
      </div>
      <aside className="md:basis-1/4 bg-white p-3 rounded-b-xl md:rounded-none overflow-y-auto md:h-[51em]">
        <PostReview postId={props.id} />
        <ReviewList reviewData={props.reviews} />
      </aside>
    </section>
  );
};

export default PostsDetail;
