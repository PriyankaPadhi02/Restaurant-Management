import React from "react";
import Error404 from "../pages/404ErrorPage/404";
import { isEmpty } from "lodash";

const CheckPagePermission = ({ pathname, children }) => {
  return <>{!isEmpty(pathname) ? children : <Error404 />}</>;
};

export default CheckPagePermission;
