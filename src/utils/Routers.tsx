import { useRoutes } from "react-router-dom";
import { MainLayuot } from "../layouts";
import { RouteObject } from "react-router";
import { NotFound, Error } from "../pages/";

const Router = () => {
  const routers: RouteObject[] = [
    {
      path: "",
      element: <MainLayuot />,
      errorElement: <Error />,
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
