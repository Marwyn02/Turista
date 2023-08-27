import React, { Fragment } from "react";
import MainNavigation from "../navigation/MainNavigation";

const SiteLayout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div className="pt-5">{props.children}</div>
    </Fragment>
  );
};

export default SiteLayout;
