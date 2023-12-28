import Link from "next/link";
import { usePathname } from "next/navigation";

import AuthNavigation from "../auth/AuthNavigation";

const MainNavigation = () => {
  const pathname = usePathname();
  return (
    <nav className="fixed z-40 w-full bg-white border-b h-[4.5rem]">
      <div
        className={`grid grid-cols-2 lg:grid-cols-3 pt-4 lg:pb-3 items-center w-full px-3 lg:px-32 `}
      >
        {/* This block is the first block in the grid of threes */}
        {pathname.length > 1 ? (
          // If the pathname.length is greater than 1
          // If yes, the client is not the home page
          <h1 className="text-xs lg:text-sm text-gray-500 font-semibold ml-5 lg:ml-0 flex items-center hover:text-black w-fit">
            <Link href="/">Back to home</Link>
          </h1>
        ) : (
          // If not, then the client is in the home page
          <h1 className="font-extrabold text-2xl block w-fit text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-300">
            <Link href="/">Turista</Link>
          </h1>
        )}
        {/* End of the first block  */}

        {/* Start of second block  */}
        <div className="hidden lg:block"></div>
        {/* End of second block  */}

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
