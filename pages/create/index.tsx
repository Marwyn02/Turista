import React, { FC } from "react";

import FormLayout from "@/components/layout/FormLayout";
import AddPost from "@/components/form/AddPost";

type TAddPostProps = {
  cloudinary: string;
};

const index: FC<TAddPostProps> = () => {
  const URL: string = process.env.CLOUDINARY_URL ?? "";

  return (
    <FormLayout>
      <AddPost cloudinary={URL} />
    </FormLayout>
  );
};

export default index;
