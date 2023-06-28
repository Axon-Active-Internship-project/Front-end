import { useRoutes } from "react-router-dom";
import { MainLayuot } from "../layouts";
import { RouteObject } from "react-router";
import { NotFound, ErrorPage } from "../pages/";
import { ProductContainer } from "../containers";

const Router = () => {
  const routers: RouteObject[] = [
    {
      path: "",
      element: <MainLayuot />,
      errorElement: <ProductContainer />,
      children: [
        {
          path: "/products",
          element: <ProductContainer />,
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
