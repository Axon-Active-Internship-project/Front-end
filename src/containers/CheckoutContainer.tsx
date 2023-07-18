import { useLocation } from "react-router-dom";
import { Checkout } from "../pages";

const CheckoutContainer = () => {
  const { state } = useLocation();

  return <Checkout state={state} />;
};

export default CheckoutContainer;
