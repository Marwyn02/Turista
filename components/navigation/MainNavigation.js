import Link from "next/link";
import { usePathname } from "next/navigation";

import Login from "../auth/loginSignin";

const MainNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-10 w-full bg-white border-b">
      <div className="flex justify-between items-center md:justify-around w-full py-4 rounded-br-md">
        {pathname.length > 1 ? (
          <h1 className="text-xs lg:text-sm text-gray-500 font-semibold ml-7 lg:ml-5 flex items-center hover:text-black">
            <Link href="/"> Back </Link>
          </h1>
        ) : (
          <h1 className="text-indigo-600 font-extrabold text-2xl italic ml-5 hover:text-indigo-500">
            <Link href="/">Turista</Link>
          </h1>
        )}
        {/* Show empty div if pathname is equal to /account/login page */}
        {pathname === "/account/login" ? <div></div> : <Login />}
      </div>
    </nav>
  );
};

export default MainNavigation;
