import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dropdown = (props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [dropdown, setDropdown] = useState(false);

  const [activeSession, setActiveSession] = useState(false);

  // Deletes the post
  const deleteHandler = async (e) => {
    e.preventDefault();
    const postId = props.user.postId;

    try {
      const response = await fetch(`/api/post/delete`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const res = await response.json();
        console.log(res.message);
        router.push(res.redirect);
      } else {
        const res = await response.json();
        throw new Error(res.message);
      }
    } catch (error) {
      throw new Error("Error in Delete Post Handler, ", error);
    }
  };

  // Check if the user has already active
  useEffect(() => {
    if (session && session.user._id === props.user.userId) {
      setActiveSession(true);
    }
  }, [session, props.user.userId]);

  // Close the dropdown when clicked outside the element
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
  return (
    <>
      <img
        src="/horizontal-dots.svg"
        alt="lel"
        height={23}
        width={23}
        className="hover:bg-gray-200 cursor-pointer"
        ref={buttonRef}
        onClick={() => setDropdown(!dropdown)}
      />
      {dropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-8 lg:top-10 lg:right-14 bg-white rounded border w-32 z-[9999]"
        >
          {activeSession ? (
            <ul className="text-sm text-slate-700">
              <Link href={`/edit/${props.user.postId}`}>
                <li className="cursor-pointer hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300">
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
                className="cursor-pointer hover:bg-gray-200 hover:text-black py-1.5 pl-2 flex duration-300"
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
            <ul className="cursor-pointer text-sm text-slate-700">
              <li className="hover:bg-gray-200 hover:text-black py-1.5 pl-4">
                Save
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
