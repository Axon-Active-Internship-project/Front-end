import { ICouponData, IShoppingCartItem } from ".";

export interface IUserCheckout {
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
  provinces: IProvince[];
  districts: IDistrict[];
  wards: IWard[];
  onHandlePlaceOrder: (data: any) => void;
  onHandleChangeCountryCode: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
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

export interface PaymentItemProps {
  name?: string;
  value?: string;
  isChecked?: boolean;
  "data-radiogroup"?: boolean;
  children?: any;
  onChange?: () => void;
  image?: string;
}

export interface PaymentGroupProps {
  name: string;
  data: IPaymentGroupData[];
  onChange: (value: string) => void;
}

export interface IPaymentGroupData {
  name: string;
  image: string;
  value: string;
}

export interface ISelectCustomOptions {
  id: number;
  name: string;
  iso2: string;
  country_id?: number;
  country_code?: string;
}

export interface SelectCustomProps {
  label: string;
  options: ISelectCustomOptions[];
  // onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  register: any;
}

export interface FormHookProps {
  children: React.ReactNode;
  onHandleSubmit: (data: any) => void;
}

export interface IProvince {
  code: string;
  name: string;
}

export interface IDistrict {
  name: string;
  code: string;
  province_code: string;
}

export interface IWard {
  name: string;
  code: string;
  district_code: string;
}
