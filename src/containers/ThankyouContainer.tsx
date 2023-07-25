import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Thankyou } from "../pages";
import { order } from "../services/apis";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components";

const ThankyouContainer = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { id } = state;

  useEffect(() => {
    if (state === null) {
      navigate("../products", {
        replace: true,
      });
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: () => order.getOrderById(id),
    refetchInterval: 2000,
  });

  const onHandleBackToShop = () => {
    navigate("../products", {
      replace: true,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>error</p>;
  }

  return <Thankyou data={data} onHandleBackToShop={onHandleBackToShop} />;
};

export default ThankyouContainer;
