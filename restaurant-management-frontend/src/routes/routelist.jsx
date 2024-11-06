/* eslint-disable react/react-in-jsx-scope */
import LoginPage from "../pages/AuthPages/LoginPage";
import SignUpPage from "../pages/AuthPages/SignupPage";

export const privateRoutes = [
  {
    path: "/rm/login",
    component: <LoginPage />,
  },
];

export const publicRoutes = [
  {
    path: "/rm/sign-up",
    component: <SignUpPage />,
  },
  {
    path: "/rm/login",
    component: <LoginPage />,
  },
];
