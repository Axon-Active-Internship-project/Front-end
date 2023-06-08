import { useRoutes } from "react-router-dom";
import { MainLayuot } from "../layouts";
import { RouteObject } from "react-router";

const Router = () => {
  const router: RouteObject[] = [
    {
      path: "",
      element: <MainLayuot />,
    },
  ];

  const context = useRoutes(router);

  return context;
};

export default Router;
