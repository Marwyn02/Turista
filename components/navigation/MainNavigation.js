import Link from "next/link";

import Login from "../user/loginSignin";

const MainNavigation = () => {
  return (
    <nav className="fixed z-10 w-full bg-white border-b">
      <div className="flex justify-between md:justify-around w-full py-2 rounded-br-md">
        <h1 className="text-blue-400 font-extrabold text-2xl italic ml-2 hover:text-blue-500 duration-300">
          <Link href="/">Turista</Link>
        </h1>
        <Login />
      </div>
    </nav>
  );
};

export default MainNavigation;
