import { ILocalStorageItem } from "../interfaces";
import Storage from "./Storage";
import { CART } from "./constant";

export const getLocalStorageItems = () => {
  let localStorageItems = [];
  const session = Storage.getItem(CART.KEY_WORD);

  if (typeof session !== undefined && session !== null) {
    localStorageItems = JSON.parse(session);
  }

  return localStorageItems;
};

export const addToCart = (props: ILocalStorageItem) => {
  const session = Storage.getItem(CART.KEY_WORD);
  let localStorageItems = [];

  if (typeof session !== undefined && session !== null) {
    localStorageItems = JSON.parse(session);
  }

  if (!isExistItem(props.id)) {
    const item = {
      ...props,
    };
    localStorageItems.unshift(item);
  } else {
    localStorageItems?.map((item: any) => {
      if (item.id === props.id) {
        item.quantity += props.quantity;
      }
    });
  }
  Storage.setItem(CART.KEY_WORD, JSON.stringify(localStorageItems));
};

export const isExistItem = (id: number) => {
  const localStorageItems = Storage.getItem(CART.KEY_WORD);

  if (localStorageItems === null) {
    return false;
  }

  if (typeof localStorageItems === undefined) {
    return false;
  }

  const sessionItemsParse = JSON.parse(localStorageItems);
  return sessionItemsParse.some((item: any) => item?.id === id);
};
