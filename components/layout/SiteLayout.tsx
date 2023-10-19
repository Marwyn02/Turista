import React, { FC, Fragment, ReactNode } from "react";

import MainNavigation from "../navigation/MainNavigation";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout: FC<SiteLayoutProps> = (props) => {
  return (
    <Fragment>
      <section className="relative">
        <MainNavigation />
        <section className="pt-10 lg:pt-0">{props.children}</section>
      </section>
    </Fragment>
  );
};

export default SiteLayout;
