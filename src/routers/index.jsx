import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomeMenu from "../pages/HomeMenu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomeMenu />,
  },
]);
