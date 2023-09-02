import React from "react";
import Link from "next/link";

const MainNavigation = () => {
  return (
    <nav className="fixed z-10 w-full bg-white border-b">
      <div className="flex justify-between md:justify-around w-full py-2 rounded-br-md">
        <h1 className="text-blue-400 font-extrabold text-2xl italic ml-2 hover:text-blue-500 duration-300">
          <Link href="/">Turista</Link>
        </h1>
        <h1 className="mr-2 self-center py-1.5 px-2 text-sm text-indigo-400 hover:text-indigo-600 duration-300">
          {/* <Link href="/new-user">Log in</Link> */}
        </h1>
      </div>
    </nav>
  );
};

export default MainNavigation;
