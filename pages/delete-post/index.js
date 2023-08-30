// import PostsDetail from "@/components/turistaPosts/PostsDetail";
// import { useRouter } from "next/router";

// const index = () => {
//   const router = useRouter();
//   const deletePostHandler = async (postId) => {
//     try {
//       const response = await fetch(`/api/dbConnection/${postId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });
//       router.push("/");
//     } catch (e) {
//       console.log(e, "Error in delete-post");
//     }
//   };
//   return <PostsDetail onDeletePost={deletePostHandler} />;
// };

// export default index;
