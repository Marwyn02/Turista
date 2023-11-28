import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import AuthNavigation from "../auth/AuthNavigation";

const MainNavigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [userHasCreatedPost, setUserHasCreatedPost] = useState<boolean>(false);

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

          setUserHasCreatedPost(response.userHasCreatedPost);
        } catch (error: any) {
          console.error("Main navigation error:", error);
        }
      };

      fetchUserPostStatus();
    }
  }, [session]);
  return (
    <nav className="fixed z-40 w-full bg-white border-b h-[4.5rem]">
      <div
        className={`grid grid-cols-2 ${
          !userHasCreatedPost ? "lg:grid-cols-3 pt-5" : "pt-4 lg:pb-3"
        } items-center w-full px-3 lg:px-32 `}
      >
        {/* This block is the first block in the grid of threes */}
        {pathname.length > 1 ? (
          // If the pathname.length is greater than 1
          // If yes, the client is not the home page
          <h1
            className="text-xs lg:text-sm text-gray-500 font-semibold ml-5 lg:ml-0 
          flex items-center hover:text-black w-fit"
          >
            <Link href="/">Back to home</Link>
          </h1>
        ) : (
          // If not, then the client is in the home page
          <h1
            className="font-extrabold text-2xl hidden lg:block w-fit
           text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
          >
            <Link href="/">Turista</Link>
          </h1>
        )}
        {/* End of the first block  */}

        {/* This block is the second of the grid of threes  */}
        {/* Show create post if its only in the home page */}
        {pathname.length <= 1 && !userHasCreatedPost ? (
          // --- IF THE USER HAS NOT YET CREATED POST!! returns (true) ---
          // This will run if the client is on the home page and has no created post to true
          <div className="lg:grid lg:place-content-center flex lg:justify-center justify-start">
            {/* --- Check if the client is authenticated --- */}
            {/* If yes then show CREATE button  */}
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
              // If not
              // If Pathname.length is less than 1
              // Means that if the client is on the homepage only
              // Not on the other pages
              // This will display, the Turista logo
              <h1
                className="ml-2 font-extrabold text-2xl block lg:hidden w-fit text-transparent 
                  bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
              >
                <Link href="/">Turista</Link>
              </h1>
            ) : (
              // If still not
              // Then render this space on the navigation
              <div className="hidden sm:block"></div>
            )}
          </div>
        ) : pathname.length <= 1 ? (
          // If not Pathname.length is less than 1 and userHasCreatedPost to false
          // This will run, if only Pathname.length is less than 1
          // Means the client is on the home page
          // Displays the Turista logo
          // IN MOBILE VIEW
          <h1
            className="ml-3 font-extrabold text-2xl block lg:hidden w-fit text-transparent 
            bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300"
          >
            <Link href="/">Turista</Link>
          </h1>
        ) : !userHasCreatedPost ? (
          // If only the client has already created a post
          // Displays space for the purpose of the grid and layout of the nav
          <div className="hidden lg:block"></div>
        ) : (
          <div className="hidden"></div>
        )}
        {/* End of the second block  */}

        {/* This is third block of the grid of threes  */}
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
