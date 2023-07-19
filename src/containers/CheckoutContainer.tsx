import { useLocation } from "react-router-dom";
import { Checkout } from "../pages";
import { useState } from "react";

const CheckoutContainer = () => {
  const { state } = useLocation();

  const [paymentMethod, setPaymentMethod] = useState<string>("vnpay");

  const onHandleChangePaymentMethod = (value: string) => {
    setPaymentMethod(value);
  };

  const onHandlePlaceOrder = (data: any) => {
    console.log(data);
  };

  return (
    <Checkout
      state={state}
      onHandleChangePaymentMethod={onHandleChangePaymentMethod}
      onHandlePlaceOrder={onHandlePlaceOrder}
    />
  );
};

export default CheckoutContainer;
