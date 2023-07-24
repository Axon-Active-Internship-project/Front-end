import { useLocation, useNavigate } from "react-router-dom";
import { Checkout } from "../pages";
import { order } from "../services/apis";
import { ICity, ICountry, IShoppingCartItem, IState } from "../interfaces";
import { useMutation } from "@tanstack/react-query";
import { Country, State, City } from "country-state-city";
import { useEffect, useState } from "react";
import { CART } from "../utils";
import { useLocalStorage } from "../hooks";

const CheckoutContainer = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { clearCart } = useLocalStorage(CART.KEY_WORD);

  const [countryCode, setCountryCode] = useState<string>("");
  const [stateCode, setStateCode] = useState<string>("");

  const [countries, setCountries] = useState<ICountry[]>(() => {
    try {
      return Country.getAllCountries();
    } catch (error) {
      return [];
    }
  });
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    setStates(() => {
      try {
        return State.getStatesOfCountry(countryCode);
      } catch (error) {
        return [];
      }
    });
  }, [countryCode]);

  useEffect(() => {
    setCities(() => {
      try {
        return City.getCitiesOfState(countryCode, stateCode);
      } catch (error) {
        return [];
      }
    });
  }, [countryCode, stateCode]);

  const mutationOrder = useMutation({
    mutationFn: order.createOrder,
    onSuccess(data) {
      clearCart();
      if (data.payment_method === "vnpay") {
        window.open(data.payment_url, "_blank");
        navigate("../thankyou", {
          state: {
            id: data.id,
          },
          replace: true,
        });
      }
      navigate("../thankyou", {
        state: {
          id: data.id,
        },
        replace: true,
      });
    },
  });

  const onHandlePlaceOrder = async (data: any) => {
    const { paymentMethod, countryCode, stateCode, ...restData } = data;

    const countryName = Country.getCountryByCode(countryCode)?.name;
    const stateName = State.getStateByCodeAndCountry(
      stateCode,
      countryCode
    )?.name;

    const billing = {
      ...restData,
      country: countryName,
      state: stateName,
      address_1: data.street,
    };

    const shipping = {
      ...restData,
      country: countryName,
      state: stateName,
      address_1: data.street,
    };

    const line_items = [
      ...state.data.map((item: IShoppingCartItem) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    ];

    const coupon_lines = [{ code: state.coupon?.code }];

    let set_paid = false;

    if (data.paymentMethod === "bacs") {
      set_paid = true;
    }

    mutationOrder.mutate({
      billing,
      shipping,
      line_items,
      payment_method: paymentMethod,
      coupon_lines: state.coupon?.code && coupon_lines,
      set_paid,
    });
  };

  console.log(state);

  const onHandleChangeCountryCode = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "countryCode") {
      setCountryCode(e.target.value);
    } else if (e.target.name === "stateCode") {
      setStateCode(e.target.value);
    }
  };

  return (
    <Checkout
      state={state}
      onHandlePlaceOrder={onHandlePlaceOrder}
      countries={countries}
      states={states}
      cities={cities}
      onHandleChangeCountryCode={onHandleChangeCountryCode}
      isLoading={mutationOrder.isLoading}
    />
  );
};

export default CheckoutContainer;
