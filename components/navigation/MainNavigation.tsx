import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import AuthNavigation from "../auth/AuthNavigation";

const MainNavigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [userHasNoCreatedPost, setUserHasNoCreatedPost] =
    useState<boolean>(false);

  useEffect(() => {
    if (session) {
      const user_in_session = (session?.user as { _id: string })?._id as string;

      const fetchUserPostStatus = async () => {
        try {
          const response = await fetch("/api/user/restrict", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ userId: user_in_session }),
          }).then((r) => r.json());

          setUserHasNoCreatedPost(response.userHasNoCreatedPost);
        } catch (error: any) {
          console.error("Main navigation error:", error);
        }
      };

      fetchUserPostStatus();
    }
  }, [session]);
  return (
    <nav className="fixed z-50 w-full bg-white border-b">
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 ${
          userHasNoCreatedPost ? "lg:grid-cols-3" : ""
        } items-center w-full px-3 lg:px-32 py-3 lg:py-4`}
      >
        {/* Show back button if its not in the home page */}
        {pathname.length > 1 ? (
          <h1 className="text-xs lg:text-sm text-gray-500 font-semibold ml-5 lg:ml-0 flex items-center hover:text-black">
            <Link href="/">Back</Link>
          </h1>
        ) : (
          <h1
            className="font-extrabold text-2xl hidden lg:block w-fit
           text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
          >
            <Link href="/">Turista</Link>
          </h1>
        )}

        {/* Show create post if its only in the home page */}
        {pathname.length <= 1 && userHasNoCreatedPost ? (
          <div className="lg:grid lg:place-content-center flex lg:justify-center justify-start">
            {session ? (
              <Link href={"/create"}>
                <button
                  type="button"
                  className="border-[2px] border-x-violet-500 border-y-pink-300 rounded-full px-5 py-2 text-sm 
                font-medium text-center text-gray-600 hover:text-black
                hover:border-y-violet-500 hover:border-x-pink-300 duration-500"
                >
                  Create post
                </button>
              </Link>
            ) : pathname.length <= 1 ? (
              <h1
                className="ml-2 font-extrabold text-2xl hidden sm:block w-fit text-transparent 
                  bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
              >
                <Link href="/">Turista</Link>
              </h1>
            ) : (
              <div className="hidden sm:block"></div>
            )}
          </div>
        ) : pathname.length <= 1 ? (
          <h1
            className="ml-3 font-extrabold text-2xl block lg:hidden w-fit text-transparent 
            bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
          >
            <Link href="/">Turista</Link>
          </h1>
        ) : !userHasNoCreatedPost ? (
          <div className="hidden"></div>
        ) : (
          <div className="block"></div>
        )}

        {/* Show empty div if pathname is equal to /account/login page */}
        {pathname === "/account/login" ? (
          <div></div>
        ) : (
          <div className="grid place-content-end">
            <AuthNavigation />
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
