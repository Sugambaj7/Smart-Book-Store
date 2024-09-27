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
import CartComponent from "../components/CartComponent";
import ShippingComponent from "../components/ShippingComponent";
import PaymentComponent from "../components/PaymentComponent";
import PlaceOrderComponent from "../components/PlaceOrderComponent";
import OrderViewComponent from "../components/OrderViewComponent";
import RecommendedProducts from "../components/recommendedProducts";
import SearchResultComponent from "../components/SearchResultComponent";

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
      {
        path: "/cart",
        element: <CartComponent />,
      },
      {
        path: "/cart/:product_id",
        element: <CartComponent />,
      },
      {
        path: "/shipping",
        element: <ShippingComponent />,
      },
      {
        path: "/payment",
        element: <PaymentComponent />,
      },
      {
        path: "/placeorder",
        element: <PlaceOrderComponent />,
      },
      {
        path: "/order/:user_id",
        element: <OrderViewComponent />,
      },
      {
        path: "/recommendedProducts",
        element: <RecommendedProducts />,
      },
      {
        path: "/search",
        element: <SearchResultComponent />,
      },
    ],
  },
]);

export default router;
