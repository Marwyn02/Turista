import React, { FC } from "react";

import FormLayout from "@/components/layout/FormLayout";
import AddPost from "@/components/form/AddPost";

const index: FC = () => {
  return (
    <FormLayout>
      <AddPost />
    </FormLayout>
  );
};

export default index;
