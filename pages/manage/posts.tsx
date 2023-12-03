import { useSession } from "next-auth/react";
import PostOverview from "@/components/turistaPosts/ManagePost/PostOverview";

export default function posts() {
  const { data: session } = useSession();

  return (
    <>
      <PostOverview name={session?.user?.name as string} />
    </>
  );
}
