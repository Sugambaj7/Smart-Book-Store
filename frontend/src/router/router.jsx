import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import ShopComponent from "../components/ShopComponent";
import HomePage from "../pages/HomePage";
import MainLayout from "../pages/MainLayout";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "shop",
        element: <ShopComponent />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "register",
        element: <RegisterComponent />,
      },
    ],
  },
]);

export default router;
