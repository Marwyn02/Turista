import React, { FC, ReactNode } from "react";

interface MainPageLayoutProps {
  children: ReactNode;
}

const MainPageLayout: FC<MainPageLayoutProps> = (props) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 pt-12 pb-5 lg:px-3 lg:pt-24 lg:pb-8">
      <div className="sm:col-start-2 sm:col-span-6 lg:col-start-2 lg:col-span-10">
        {props.children}
      </div>
    </section>
  );
};

export default MainPageLayout;
