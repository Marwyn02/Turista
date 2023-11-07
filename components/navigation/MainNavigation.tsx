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
    <nav className="fixed z-10 w-full bg-white border-b">
      <div
        className={`grid grid-cols-2 ${
          userHasNoCreatedPost ? "lg:grid-cols-3" : ""
        } items-center w-full px-3 lg:px-32 py-3 lg:py-4`}
      >
        {/* Show back button if its not in the home page */}
        {pathname.length > 1 ? (
          <h1 className="text-xs lg:text-sm text-gray-500 font-semibold ml-5 lg:ml-0 flex items-center hover:text-black">
            <Link href="/">Back</Link>
          </h1>
        ) : (
          <h1 className="text-violet-500 font-extrabold text-2xl italic hover:text-violet-600 hidden md:block">
            <Link href="/">Turista</Link>
          </h1>
        )}

        {/* Show create post if its only in the home page */}
        {pathname.length <= 1 && userHasNoCreatedPost ? (
          <div className="lg:grid lg:place-content-center">
            {session ? (
              <Link href={"/create"}>
                <button
                  type="button"
                  className="border rounded-full px-5 py-2 text-sm 
                font-medium text-center text-gray-600 hover:text-black 
                hover:border-black duration-500"
                >
                  Create post
                </button>
              </Link>
            ) : pathname.length <= 1 ? (
              <h1 className="ml-2 text-violet-500 font-extrabold text-2xl italic hover:text-violet-600">
                <Link href="/">Turista</Link>
              </h1>
            ) : (
              <div className="hidden md:block"></div>
            )}
          </div>
        ) : pathname.length <= 1 ? (
          <h1
            className="text-violet-500 font-extrabold text-2xl italic hover:text-violet-600
          md:hidden"
          >
            <Link href="/">Turista</Link>
          </h1>
        ) : !userHasNoCreatedPost ? (
          <div className="hidden"></div>
        ) : (
          <div className="hidden md:block"></div>
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
