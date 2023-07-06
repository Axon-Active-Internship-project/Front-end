import { ICategory, IImageProduct } from "./product";

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
  onDelete: any;
  onIncrementQuantity: any;
  onReduceQuantity: any;
  onHandleChangeQuantity: any
}

export interface ISessionStorage {
  id: number;
  quantity: number;
}

export interface ILocalStorageItem {
  id: number;
  quantity: number;
  image: string;
  name: string;
  regular_price: string;
  sale_price?: string;
  categories: ICategory[];
}
