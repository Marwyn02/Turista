import React, { FC } from "react";

import FormLayout from "@/components/layout/FormLayout";
import AddPostForm from "@/components/form/AddPostForm";

const index: FC = () => {
  return (
    <FormLayout>
      <AddPostForm />
    </FormLayout>
  );
};

export default index;
