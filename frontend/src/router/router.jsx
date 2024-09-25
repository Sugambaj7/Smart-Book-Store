import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import ShopComponent from "../components/ShopComponent";
import HomePage from "../pages/HomePage";
import MainLayout from "../pages/MainLayout";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import ProductListComponent from "../components/ProductListComponent";
import CreateProductComponent from "../components/createProductComponent";
import ProductEditComponent from "../components/ProductEditComponent";
import IndividualProductComponent from "../components/IndividualProductComponent";

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
      {
        path: "/admin/productlist",
        element: <ProductListComponent />,
      },
      {
        path: "/admin/createproduct",
        element: <CreateProductComponent />,
      },
      {
        path: "/admin/product/edit/:product_id",
        element: <ProductEditComponent />,
      },
      {
        path: "/product/:product_id",
        element: <IndividualProductComponent />,
      },
    ],
  },
]);

export default router;
