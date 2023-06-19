import { useRoutes } from "react-router-dom";
import { MainLayuot } from "../layouts";
import { RouteObject } from "react-router";
import { NotFound, Error } from "../pages/";
import { ProductContainer } from "../containers";

const Router = () => {
  const routers: RouteObject[] = [
    {
      path: "",
      element: <MainLayuot />,
      errorElement: <Error />,
      children: [
        {
          path: "/product",
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
