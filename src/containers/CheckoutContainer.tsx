import { useLocation } from "react-router-dom";
import { Checkout } from "../pages";
import { order } from "../services/apis";
import { IShoppingCartItem } from "../interfaces";
import { useMutation } from "@tanstack/react-query";

const CheckoutContainer = () => {
  const { state } = useLocation();

  const mutationOrder = useMutation({
    mutationFn: order.createOrder,
    onSuccess(data) {
      if (data.payment_method === "vnpay") {
        window.open(data.payment_url, "_blank");
      }
    },
  });

  const onHandlePlaceOrder = async (data: any) => {
    const { paymentMethod, ...restData } = data;

    const billing = {
      ...restData,
      address_1: data.street,
    };

    const shipping = {
      ...restData,
      address_1: data.street,
    };

    const line_items = [
      ...state.data.map((item: IShoppingCartItem) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    ];

    mutationOrder.mutate({
      billing,
      shipping,
      line_items,
      payment_method: paymentMethod,
    });
  };

  return <Checkout state={state} onHandlePlaceOrder={onHandlePlaceOrder}  />;
};

export default CheckoutContainer;
