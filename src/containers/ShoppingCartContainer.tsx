import { ShoppingCart } from "../pages";
import { useCallback, useRef, useState } from "react";
import { useConfirm, useLocalStorage } from "./../hooks";
import { CART, COUPON_ERROR_MESSAGE } from "../utils/";
import { isExistItem } from "../utils";
import { ICouponData, IErrorCoupon, IShoppingCartItem } from "../interfaces";
import { coupon } from "../services/apis";
import { useToast } from "@chakra-ui/react";

const ShoppingCartContainer = () => {
  const [cartItems, setCartItems] = useLocalStorage(CART.KEY_WORD, []);

  const [couponInput, setCouponInput] = useState<string>("");

  const [couponData, setCouponData] = useState<ICouponData>();

  const [errorCoupon, setErrorCoupon] = useState<IErrorCoupon>({
    isError: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { onHandleConfirm, showAlert } = useConfirm();

  const toast = useToast({
    position: "top",
    duration: 3000,
  });

  const onHandleDeleteCartItem = useCallback(
    async (id: number) => {
      if (!isExistItem(id)) {
        return;
      }

      const isConfirmed = await onHandleConfirm({
        title: "Deleted",
        text: "Would you like to remove this product?",
        icon: "warning",
      });

      if (isConfirmed) {
        await setCartItems(
          cartItems.filter((item: IShoppingCartItem) => item.id !== id)
        );
        showAlert({
          title: "Successfully",
          text: "Deleted item successfully!",
          icon: "success",
        });
      }
    },
    [cartItems]
  );

  const onHandleCleanCart = async () => {
    const isConfirmed = await onHandleConfirm({
      title: "Clean cart",
      text: "Would you like to remove all product?",
      icon: "warning",
    });

    if (isConfirmed) {
      await setCartItems([]);
      showAlert({
        title: "Successfully",
        text: "Deleted all product!",
        icon: "success",
      });
    }
  };

  const onHandleChangeInputCoupon = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCouponInput(() => value);
  };

  const onHandleApplyCoupon = async () => {
    if (!couponInput) {
      toast({
        title: "Fail",
        description: "Enter your voucher",
        status: "error",
        isClosable: true,
      });
      setCouponData(() => {});
      return setErrorCoupon(() => ({
        isError: true,
        message: COUPON_ERROR_MESSAGE.NO_COUPON,
      }));
    }

    if (couponInput === couponData?.code) {
      setCouponInput(() => "");
      toast({
        title: "Fail",
        description: "Coupon is already effective.",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    const data = await coupon.getCouponByCode(couponInput);

    if (data.data.length === 0) {
      toast({
        title: "Fail",
        description: "Your voucher is invalid",
        status: "error",
        isClosable: true,
      });
      setCouponData(() => {});
      setIsLoading(false);
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
    toast({
      title: "Successfully",
      description: "Your Coupon is applied successfully",
      status: "success",
      isClosable: true,
    });
    setIsLoading(false);
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
      onDelete={onHandleDeleteCartItem}
      onHandleChangeQuantity={setCartItems}
      onHandleChangeCoupon={onHandleChangeInputCoupon}
      onHandleApplyCoupon={onHandleApplyCoupon}
      onHandleRemoveCoupon={onHandleRemoveCoupon}
      onFocusInputCoupon={onFocusInputCoupon}
      couponInput={couponInput}
      isLoadingCoupon={isLoading}
      onCleanCart={onHandleCleanCart}
    />
  );
};

export default ShoppingCartContainer;
