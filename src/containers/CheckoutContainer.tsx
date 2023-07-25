import { useLocation, useNavigate } from "react-router-dom";
import { Checkout } from "../pages";
import { order } from "../services/apis";
import { IDistrict, IProvince, IShoppingCartItem, IWard } from "../interfaces";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CART, getDistrictWithDetail, getWardWithDetail } from "../utils";
import { useLocalStorage } from "../hooks";
import {
  getProvinces,
  getDistricts,
  getWards,
  getProvincesWithDetail,
} from "vietnam-provinces";

const CheckoutContainer = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { clearCart } = useLocalStorage(CART.KEY_WORD);

  const [provinceCode, setProvinceCode] = useState<string>("");
  const [districtCode, setDistrictCode] = useState<string>("");
  const [wardCode, setWardCode] = useState<string>("");

  const [provinces, setProvinces] = useState<IProvince[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);
  const [wards, setWards] = useState<IWard[]>([]);

  useEffect(() => {
    setProvinces(() => {
      try {
        return getProvinces();
      } catch (error) {
        return [];
      }
    });
  }, []);

  useEffect(() => {
    setDistricts(() => {
      try {
        if (!provinceCode) {
          return [];
        }
        return getDistricts(provinceCode);
      } catch (error) {
        return [];
      }
    });
  }, [provinceCode]);

  useEffect(() => {
    setWards(() => {
      try {
        if (!provinceCode || !districtCode) {
          return [];
        }
        return getWards(districtCode);
      } catch (error) {
        return [];
      }
    });
  }, [provinceCode, districtCode]);

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
    const { paymentMethod, stateCode, ...restData } = data;

    const provinceName = getProvincesWithDetail(provinceCode).name;

    const districtName = getDistrictWithDetail(
      provinceCode,
      districtCode
    )?.name;

    const wardName = getWardWithDetail(districtCode, wardCode)?.name;

    const billing = {
      ...restData,
      country: "Việt Nam",
      state: provinceName,
      address_1: `${data.street}, ${districtName}, ${wardName}`,
    };

    const shipping = {
      ...restData,
      country: "Việt Nam",
      state: provinceName,
      address_1: `${data.street}, ${districtName}, ${wardName}`,
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

  const onHandleChangeCountryCode = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.name === "provinceCode") {
      setProvinceCode(e.target.value);
      setDistrictCode("");
      setWardCode("");
    }

    if (e.target.name === "districtCode") {
      setDistrictCode(e.target.value);
      setWardCode("");
    }

    if (e.target.name === "wardCode") {
      setWardCode(e.target.value);
    }
  };

  return (
    <Checkout
      state={state}
      onHandlePlaceOrder={onHandlePlaceOrder}
      provinces={provinces}
      districts={districts}
      wards={wards}
      onHandleChangeCountryCode={onHandleChangeCountryCode}
      isLoading={mutationOrder.isLoading}
    />
  );
};

export default CheckoutContainer;
