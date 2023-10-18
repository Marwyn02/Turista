import Head from "next/head";
import React, { FC } from "react";

import FormLayout from "@/components/layout/FormLayout";
import AddPost from "@/components/form/AddPost";

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
