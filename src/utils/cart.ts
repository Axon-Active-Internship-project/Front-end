import Storage from "./Storage";
import { CART } from "./constant";

const addToCart = (id: number) => {
  const localCart = Storage.getItem(CART.KEY_WORD);
};

const isExistItem = (id: number) => {};

const removeItem = (id: number) => {};
