import { ICouponData, IShoppingCartItem } from ".";

export interface IFomrCheckout {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shipping: IAddress;
}

interface IAddress {
  country: string;
  city: string;
  town: string;
  address: string;
}

export interface CheckoutProps {
  state: IStateCheckoutProps;
}

interface IStateCheckoutProps {
  data: IShoppingCartItem[];
  subTotal: string;
  coupon?: ICouponData;
  total: string;
}

export interface ICheckoutItem {
  name: string;
  quantity: number;
  unit_price: string;
  image: string;
}

export interface ICheckoutBox {
  label: string;
  value: string;
}
