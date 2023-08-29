import NewUsersForm from "@/components/user/NewUsersForm";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const addUserHandler = async (enteredData) => {
    try {
      const response = await fetch("/api/dbConnection", {
        method: "POST",
        body: JSON.stringify(enteredData),
        headers: { "Content-Type": "application/json" },
      });
      router.push("/");
    } catch (e) {
      console.log(e, "Error in new-user");
    }
  };
  return <NewUsersForm onAddUser={addUserHandler} />;
};

export default index;
