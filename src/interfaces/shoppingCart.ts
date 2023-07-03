import { IImageProduct } from "./product";

export interface IShoppingCartItem {
  id: number;
  image: IImageProduct;
  name: string;
  quantity: number;
  unit_price: string;
}

