import { useState } from "react";

const UserProfile = ({ name, image, postCount, reviewCount, posts }) => {
  const [toggler, setToggler] = useState(false);

  return (
    <section className="bg-gray-50">
      <div className="py-20 md:py-32 px-3 lg:px-32">
        <div className="-mt-5 md:px-10 justify-items-center md:flex md:justify-items-start">
          <img
            src={image}
            alt="lel"
            className="h-14 md:h-20 rounded-full mx-auto md:mx-0"
          />
          <p className="text-lg md:text-xl text-center ml-4 mt-0.5 md:mt-2 text-indigo-600 font-semibold tracking-wide">
            {name}
          </p>
        </div>
        <div className="bg-indigo-600 py-3 px-5 my-3 md:my-8 rounded-lg text-white text-xs text-center font-semibold">
          <div className="grid grid-cols-4 gap-x-2">
            <p>Posts</p>
            <p>Following</p>
            <p>Followers</p>
            <p>Reviews</p>
          </div>
          <div className="grid grid-cols-4 gap-x-2 mt-1 ">
            <p>{postCount}</p>
            <p>0</p>
            <p>0</p>
            <p>{reviewCount}</p>
          </div>
        </div>

        <div className="bg-[#1B1D2A] px-5 text-white rounded-lg text-sm grid grid-cols-5 gap-x-3">
          <button
            onClick={() => setToggler(!toggler)}
            className="border-b-4 border-transparent hover:border-indigo-600 duration-200 py-3"
          >
            Posts
          </button>
          <p className="border-b-4 border-transparent hover:border-indigo-600 duration-200 py-3">
            Reviews
          </p>
        </div>
        {toggler ? (
          <div className="pb-4 mt-4 my-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <div className="relative bg-gray-200 pt-[100%]">
                <img
                  key={post.id}
                  src={post.image}
                  alt="lel"
                  className="rounded-lg absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default UserProfile;
