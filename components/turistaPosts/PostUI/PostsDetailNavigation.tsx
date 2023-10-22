import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type PostsDetailNavigationProps = {
  userId: string;
  postId: string;
};

const PostsDetailNavigation: FC<PostsDetailNavigationProps> = ({
  userId,
  postId,
}) => {
  const { data: session } = useSession();

  const [activeSession, setActiveSession] = useState<boolean>(false);

  // This function checks if the user active is same with post creator
  // To show the edit and delete buttons, only for the creator
  useEffect(() => {
    if (session && (session.user as { _id: string })._id === userId) {
      setActiveSession(true);
    }
  }, [session, userId]);

  return (
    <section className="flex justify-between items-center pb-2">
      <button className="px-4 py-3.5 bg-violet-100 duration-300 rounded hover:bg-violet-400">
        <img src="/heart-white.svg" height={18} width={18} alt="Edit" />
      </button>

      {activeSession && (
        <div className="flex gap-x-2">
          <Link href={`/edit/${postId}`}>
            <button className="px-4 py-3.5 bg-violet-400 duration-300 rounded hover:bg-violet-500">
              <img src="/pencil-white.svg" height={18} width={18} alt="Edit" />
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default PostsDetailNavigation;
