import React, { Fragment } from "react";
import MainNavigation from "../navigation/MainNavigation";

const SiteLayout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div className="pt-5 lg:pt-0">{props.children}</div>
    </Fragment>
  );
};

export default SiteLayout;
