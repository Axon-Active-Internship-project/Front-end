import { ShoppingCart } from "../pages";
import { useCallback, useRef, useState } from "react";
import { useLocalStorage } from "./../hooks";
import { CART, COUPON_ERROR_MESSAGE } from "../utils/";
import { isExistItem } from "../utils";
import { ICouponData, IErrorCoupon } from "../interfaces";
import { coupon } from "../services/apis";

const ShoppingCartContainer = () => {
  const [cartItems, setCartItems] = useLocalStorage(CART.KEY_WORD, []);

  const [couponInput, setCouponInput] = useState<string>("");

  const [couponData, setCouponData] = useState<ICouponData>();

  const [errorCoupon, setErrorCoupon] = useState<IErrorCoupon>({
    isError: false,
    message: "",
  });

  // const timer = useRef<any>(null);

  const onHandleDeleteItem = useCallback(
    (id: number) => {
      if (!isExistItem(id)) {
        return;
      }

      return setCartItems(cartItems.filter((item) => item.id !== id));
    },
    [cartItems]
  );

  const onHandleChangeInputCoupon = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // const timerId = timer.current;

    // console.log("value => ", e.target.value);
    // clearTimeout(timerId);

    // const newTimerId = setTimeout(() => {

    // }, 300);
    const value = e.target.value;
    setCouponInput(() => value);

    // timer.current = newTimerId;
  };

  const onHandleApplyCoupon = async () => {
    if (!couponInput) {
      setCouponData(() => {});
      return setErrorCoupon(() => ({
        isError: true,
        message: COUPON_ERROR_MESSAGE.NO_COUPON,
      }));
    }

    const data = await coupon.getCouponByCode(couponInput);

    if (data.data.length === 0) {
      setCouponData(() => {});
      return setErrorCoupon(() => ({
        isError: true,
        message: COUPON_ERROR_MESSAGE.IS_NOT_VALID_COUPON,
      }));
    }

    setCouponInput(() => "");
    setErrorCoupon(() => ({
      isError: false,
      message: "",
    }));
    return setCouponData(() => data.data[0]);
  };

  const onHandleRemoveCoupon = () => {
    setCouponData(() => {});
    return setErrorCoupon(() => ({
      isError: false,
      message: "",
    }));
  };

  const onFocusInputCoupon = () => {
    return setErrorCoupon(() => ({
      isError: false,
      message: "",
    }));
  };

  return (
    <ShoppingCart
      data={cartItems}
      couponData={couponData}
      errorCoupon={errorCoupon}
      onDelete={onHandleDeleteItem}
      onHandleChangeQuantity={setCartItems}
      onHandleChangeCoupon={onHandleChangeInputCoupon}
      onHandleApplyCoupon={onHandleApplyCoupon}
      onHandleRemoveCoupon={onHandleRemoveCoupon}
      onFocusInputCoupon={onFocusInputCoupon}
      couponInput={couponInput}
    />
  );
};

export default ShoppingCartContainer;
