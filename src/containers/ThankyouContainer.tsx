import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Thankyou } from "../pages";
import { order } from "../services/apis";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../components";
import { useLocalStorage } from "../hooks";
import { CART } from "../utils";

const ThankyouContainer = () => {
  const { clearCart } = useLocalStorage(CART.KEY_WORD);

  const { state } = useLocation();

  const navigate = useNavigate();

  const { id, data: dataOrder, subTotal, coupon, total } = state;

  useEffect(() => {
    if (state === null) {
      navigate("../products", {
        replace: true,
      });
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`order${id}`],
    queryFn: () => order.getOrderById(id),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (data?.status === "processing") {
      clearCart();
    }
  }, [data?.status]);

  console.log(window.history.state);

  const onHandleBackToShop = () => {
    navigate("../products", {
      replace: true,
    });
  };

  const onHandleReorder = () => {
    navigate("../checkout", {
      state: {
        data: dataOrder,
        subTotal,
        coupon,
        total,
      },
      replace: true,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>error</p>;
  }

  return (
    <Thankyou
      data={data}
      onHandleBackToShop={onHandleBackToShop}
      onHandleReorder={onHandleReorder}
    />
  );
};

export default ThankyouContainer;
