import { useLocation } from "react-router-dom";
import { Checkout } from "../pages";

const CheckoutContainer = () => {
  const { state } = useLocation();

  console.log("state => ", state);

  return <Checkout />;
};

export default CheckoutContainer;
