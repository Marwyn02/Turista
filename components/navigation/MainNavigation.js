import React from "react";
import Link from "next/link";

const MainNavigation = () => {
  return (
    <nav className="w-full py-2 bg-white">
      <h1 className="text-blue-200 font-extrabold text-2xl italic text-center">
        <Link href="/">Turista</Link>
      </h1>
    </nav>
  );
};

export default MainNavigation;
