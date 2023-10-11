import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import LoginNavProfile from "../auth/LoginNavProfile";
import { useEffect } from "react";

const MainNavigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      const userId = session.user._id;
      console.log(userId);
      const restrictPosting = async () => {
        try {
          const response = await fetch("/api/user/restrictPosting", {
            method: "POST", // Specify the HTTP method as POST
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Okay", data);
          } else {
            console.log("Not okay");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      restrictPosting();
    }
  }, [session]);

  return (
    <nav className="fixed z-10 w-full bg-white border-b">
      <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full px-3 lg:px-32 py-3 lg:py-4">
        {/* Show back button if its not in the home page */}
        {pathname.length > 1 ? (
          <h1 className="text-xs lg:text-sm text-gray-500 font-semibold ml-5 lg:ml-0 flex items-center hover:text-black">
            <Link href="/">Back</Link>
          </h1>
        ) : (
          <h1 className="text-indigo-600 font-extrabold text-2xl italic hover:text-indigo-500 hidden md:block">
            <Link href="/">Turista</Link>
          </h1>
        )}

        {/* Show create post if its only in the home page */}
        {pathname.length <= 1 ? (
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
            ) : (
              <h1 className="ml-2 text-indigo-600 font-extrabold text-2xl italic hover:text-indigo-500 block md:hidden">
                <Link href="/">Turista</Link>
              </h1>
            )}
          </div>
        ) : (
          <div className="hidden md:block"></div>
        )}

        {/* Show empty div if pathname is equal to /account/login page */}
        {pathname === "/account/login" ? (
          <div></div>
        ) : (
          <div className="grid place-content-end">
            <LoginNavProfile />
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
