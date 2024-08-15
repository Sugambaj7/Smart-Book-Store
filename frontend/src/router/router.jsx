import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import ShopComponent from "../components/ShopComponent";
import HomePage from "../pages/HomePage";
import MainLayout from "../pages/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:slug",
    element: <MainLayout />,
    children: [
      {
        path: "shop",
        element: <ShopComponent />,
      },
    ],
  },
]);

export default router;
