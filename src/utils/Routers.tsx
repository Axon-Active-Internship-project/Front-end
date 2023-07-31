import { useRoutes } from "react-router-dom";
import { MainLayuot } from "../layouts";
import { RouteObject } from "react-router";
import { NotFound, ErrorPage } from "../pages/";
import {
  ProductContainer,
  ProductDetailContainer,
  ShoppingCartContainer,
} from "../containers";

const Router = () => {
  const routers: RouteObject[] = [
    {
      path: "/",
      element: <MainLayuot />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "products",
          element: <ProductContainer />,
        },
        {
          path: "product/:id",
          element: <ProductDetailContainer />,
        },
        {
          path: "shopping-cart",
          element: <ShoppingCartContainer />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const context = useRoutes(routers);

  return context;
};

export default Router;
