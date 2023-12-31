import { FC } from "react";
import { getSession } from "next-auth/react";
import Post from "@/models/Post";

import OverviewPage from "@/components/turistaPosts/ManagePost/OverviewPage";

type TPostsProps = {
  posts: {
    id: string;
    title: string;
    location: string;
    image: string;
  }[];
};

const ManagePostPage: FC<TPostsProps> = ({ posts }) => {
  return (
    <>
      <OverviewPage posts={posts} />
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const userId = (session?.user as { _id: string })?._id as string;

  if (!userId && !session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const userPosts = await Post.find({ user: userId }).sort({ _id: -1 });

  const posts = await Promise.all(
    userPosts.map(async (post) => {
      return {
        id: post._id.toString(),
        title: post.title,
        location: post.location,
        image: post.image[0].image,
      };
    })
  );
  return {
    props: { posts },
  };
}

export default ManagePostPage;
