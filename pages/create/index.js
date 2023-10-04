import FormLayout from "@/components/layout/FormLayout";
import AddPost from "@/components/form/AddPost";
import Head from "next/head";

export default function index() {
  return (
    <FormLayout>
      <Head>
        <title>Create your post</title>
      </Head>
      <AddPost />
    </FormLayout>
  );
}
