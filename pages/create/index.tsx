import React, { FC } from "react";
import FormLayout from "@/components/layout/FormLayout";
import AddPost from "@/components/form/AddPost";
import Head from "next/head";

const index: FC = () => {
  return (
    <FormLayout>
      <Head>
        <title>Create your post</title>
      </Head>
      <AddPost />
    </FormLayout>
  );
};

export default index;
