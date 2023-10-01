import Link from "next/link";

const UserPostList = ({ posts }) => {
  return (
    <>
      <div className="pb-4 mt-4 my-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="relative bg-gray-200 pt-[100%]">
            <Link href={`/${post.id}`}>
              <img
                src={post.image}
                alt="lel"
                className="rounded-lg absolute inset-0 w-full h-full object-cover"
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPostList;
