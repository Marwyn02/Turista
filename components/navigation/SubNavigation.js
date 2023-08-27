import Link from "next/link";

const SubNavigation = () => {
  return (
    <nav className="py-1.5 px-5 text-neutral-950 text-sm rounded bg-indigo-200 w-max my-2 mb-5">
      <Link href="/new-post">Create new post</Link>
    </nav>
  );
};

export default SubNavigation;
