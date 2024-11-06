import React from "react";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routelist";
import PrivateRoutes from "./PrivateRoutes";
import CheckPagePermission from "./CheckPagePermission";
import Error404 from "../pages/404ErrorPage/404";
import PublicRoutes from "./PublicRoutes";

const CustomRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route, indx) => (
        <Route
          key={indx}
          path={route.path}
          element={
            <PrivateRoutes>
              <CheckPagePermission pathname={route.path}>
                {route.component}
              </CheckPagePermission>
            </PrivateRoutes>
          }
        />
      ))}
      {publicRoutes.map((route, indx) => (
        <Route
          key={indx}
          path={route.path}
          element={<PublicRoutes>{route.component}</PublicRoutes>}
        />
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default CustomRouter;
