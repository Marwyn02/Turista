import React, { FC, ReactNode } from "react";

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout: FC<MainPageLayoutProps> = (props) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 pt-12 pb-5 lg:pt-24 lg:pb-8">
      <div className="md:col-start-2 md:col-span-2 lg:col-start-2 lg:col-span-10">
        {props.children}
      </div>
    </section>
  );
};

export default MainPageLayout;
