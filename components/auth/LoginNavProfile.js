import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Component() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [dropdown, setDropdown] = useState(false);

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

  if (session) {
    return (
      <div className="flex relative">
        {/* User's image */}
        <img
          src={session.user.image}
          alt="Profile Image"
          ref={buttonRef}
          onClick={() => setDropdown(!dropdown)}
          className="rounded-full h-8 w-8 md:h-10 md:w-10 border-2 hover:opacity-90 duration-150 cursor-pointer"
        />

        {/* Show sign out button if user's logged in */}
        {dropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-2 top-10 lg:top-12 bg-white rounded-lg
                       border p-1.5 w-max z-[9999]"
          >
            {session && (
              <div>
                <Link href={`/user/${session.user._id}`}>
                  <button
                    className="flex py-2 px-4 font-semibold text-xs text-start
                               lg:text-sm text-indigo-400 hover:text-indigo-600 
                             hover:bg-gray-100 w-full duration-100 rounded-lg"
                  >
                    {session.user.name}
                  </button>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex py-2 px-4 font-semibold text-xs text-start lg:text-sm
                           text-indigo-400 hover:text-indigo-600 rounded-lg
                           hover:bg-gray-100 w-full duration-100"
                >
                  <img
                    src="/logout.svg"
                    alt="lel"
                    height={18}
                    width={18}
                    className="mr-2"
                  />
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
  // Show sign in button only if the user is not in the /account/login page
  if (pathname !== "/account/login") {
    return (
      <>
        <Link
          href="/account/login"
          className="md:mr-5 self-center py-1.5 px-4 font-semibold text-xs 
                     lg:text-sm text-indigo-400 hover:text-indigo-600 
                    hover:bg-gray-100 rounded-lg duration-300"
        >
          Sign in
        </Link>
      </>
    );
  }
}