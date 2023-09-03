import Link from "next/link";
import React from "react";

const MainLayout = (props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 lg:pt-12">
      <div className="md:col-start-2 md:col-span-2">{props.children}</div>

      {/* <div>
        <Link href="/">
          <div
            className="lg:mt-5 px-5 py-2 rounded-r-lg bg-gray-50 text-gray-700 h-max w-max fixed text-xs hidden lg:block
      hover:bg-white hover:text-gray-600 duration-300"
          >
            Back to Home
          </div>
        </Link>
      </div> */}
    </section>
  );
};

export default MainLayout;
