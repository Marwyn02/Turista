import { FC } from "react";
import { useSession } from "next-auth/react";

import PostOverview from "./Components/PostOverview";

type PostsProps = {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
};

// Implement more reusable buttons
// Manage post grid columns

const OverviewPage: FC<PostsProps> = ({ posts }) => {
  const { data: session } = useSession();
  return (
    <section className="pt-24 pb-12 px-8 lg:pt-32 lg:px-32">
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome, {session?.user?.name}!
      </h1>
      <PostOverview posts={posts} />
    </section>
  );
};

export default OverviewPage;
