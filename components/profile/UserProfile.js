import React from "react";

const UserProfile = ({ name, image }) => {
  console.log("PROPS: ", image);
  return (
    <section className="bg-[#0D0F1D]">
      <div className="w-full h-28 lg:h-[250px] bg-gradient-to-b from-indigo-700 to-[#0D0F1D]" />
      <div className="px-5 lg:px-32">
        <div className="-mt-5 grid justify-items-center md:items-start ">
          <img
            src={image}
            alt="lel"
            className="h-14 md:h-20 rounded-full mx-auto"
          />
          <p className="text-lg md:text-xl ml-4 mt-2 text-white font-medium tracking-wide">
            {name}
          </p>
        </div>
        <div className="bg-[#1B1D2A] p-5 my-5 md:my-8 rounded-lg">
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>UserProfile</h1>
          <h1>THis is a props: {name}</h1>
          <h1>UserProfile</h1>
          <h1>Yes</h1>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
