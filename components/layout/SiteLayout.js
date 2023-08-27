import React, { Fragment } from "react";
import MainNavigation from "../navigation/MainNavigation";

const SiteLayout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div className="px-3 pt-5 md:px-20">{props.children}</div>
    </Fragment>
  );
};

export default SiteLayout;
