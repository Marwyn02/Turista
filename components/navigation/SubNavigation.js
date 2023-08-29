import Link from "next/link";

const SubNavigation = () => {
  const thisClassName =
    "hover:opacity-80 duration-300 bg-indigo-200 py-1.5 px-5 rounded text-neutral-950 text-sm";
  return (
    <nav className="grid grid-cols-2 gap-2 my-2 mb-5">
      <button className={thisClassName}>
        <Link href="/new-post">Create new post</Link>
      </button>
      <button className={thisClassName}>
        <Link href="/new-user">Create new account</Link>
      </button>
    </nav>
  );
};

export default SubNavigation;
