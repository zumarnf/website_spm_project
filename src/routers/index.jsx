import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomeMenu from "../pages/HomeMenu";
import Penelitian from "../pages/Penelitian";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomeMenu />,
  },
  {
    path: "/penelitian",
    element: <Penelitian />,
  },
]);
