import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex">
        <button
          onClick={() => signOut()}
          className="mr-5 self-center py-1.5 px-2 text-xs lg:text-sm text-indigo-400 hover:text-indigo-600 duration-300"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <>
      <Link
        href="/account/login"
        className="mr-5 self-center py-1.5 px-2 text-xs lg:text-sm text-indigo-400 hover:text-indigo-600 duration-300"
      >
        Sign in
      </Link>
    </>
  );
}
