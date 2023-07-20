import { useLocation } from "react-router-dom";
import { Checkout } from "../pages";
import { order } from "../services/apis";

const CheckoutContainer = () => {
  const { state } = useLocation();

  const onHandlePlaceOrder = async (data: any) => {
    await order.createOrder({
      billing: {
        ...data,
      },
      shipping: {
        ...data,
      },
      line_items: [
        {
          product_id: 194,
          quantity: 2,
        },
        {
          product_id: 171,
          quantity: 1,
        },
      ],
    });
  };

  return <Checkout state={state} onHandlePlaceOrder={onHandlePlaceOrder} />;
};

export default CheckoutContainer;
