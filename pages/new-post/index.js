import MainLayout from "@/components/layout/MainLayout";
import NewPostsForm from "@/components/turistaPosts/NewPostsForm";
import { useRouter } from "next/router";
const NewPost = () => {
  const router = useRouter();
  const addDataHandler = async (enteredData) => {
    try {
      const response = await fetch("/api/dbConnection", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: { "Content-Type": "application/json" },
      });
      router.push("/");
    } catch (error) {
      console.log(error, "Error in new-post");
    }
  };
  return (
    <MainLayout>
      <NewPostsForm onAddPost={addDataHandler} />
    </MainLayout>
  );
};

export default NewPost;
