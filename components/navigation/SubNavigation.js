import { useRouter } from "next/router";

const SubNavigation = () => {
  const router = useRouter();
  const createPostHandler = () => {
    router.push("/new-post");
  };
  return (
    <section className="bg-gray-100 my-4 rounded-lg border hover:bg-gray-200 duration-200">
      <nav
        className="flex mx-5 md:w-1/2 md:mx-auto py-5 "
        onClick={createPostHandler}
      >
        <input
          type="text"
          id="website-admin"
          className="rounded-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 
        block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 py-1.5  
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        hover:border-blue-500 hover:bg-gray-100 duration-300"
          placeholder="Create your post here"
        />
      </nav>
    </section>
  );
};

export default SubNavigation;
