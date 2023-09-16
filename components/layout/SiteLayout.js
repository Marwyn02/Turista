import { Fragment } from "react";

import MainNavigation from "../navigation/MainNavigation";

const SiteLayout = (props) => {
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
