import { ICategory, IImageProduct } from "./product";
import { ICouponData, IErrorCoupon } from "./coupon";

export interface IShoppingCartData {
  title: string;
  id: number;
  children: IShoppingCartItem[];
}

export interface IShoppingCartItem {
  id: number;
  images: IImageProduct;
  name: string;
  quantity: number;
  regular_price: string;
  sale_price?: string;
}

export interface ShoppingCartProps {
  data: ILocalStorageItem[] | [];
  couponData: ICouponData | undefined;
  errorCoupon: IErrorCoupon;
  couponInput: string;
  isLoadingCoupon: boolean;
  onDelete: any;
  onHandleChangeQuantity: any;
  onHandleChangeCoupon: any;
  onHandleApplyCoupon: any;
  onHandleRemoveCoupon: any;
  onFocusInputCoupon: any;
  onCleanCart: any;
  onPressEnterApplyCoupon: any;
}

export interface ISessionStorage {
  id: number;
  quantity: number;
}

export interface ILocalStorageItem {
  stock_quantity: boolean;
  id: number;
  quantity: number;
  image: string;
  name: string;
  regular_price: string;
  sale_price?: string;
  categories: ICategory[];
}
