import Storage from "./Storage";
import { CART } from "./constant";

export const getSessionItems = () => {
  let sessionItems = [];
  const session = Storage.getItem(CART.KEY_WORD);

  if (typeof session !== undefined && session !== null) {
    sessionItems = JSON.parse(session);
  }

  return sessionItems;
};

export const addToCart = (id: number, quantity = 1) => {
  const session = Storage.getItem(CART.KEY_WORD);
  let sessionItems = [];

  if (typeof session !== undefined && session !== null) {
    sessionItems = JSON.parse(session);
  }

  if (!isExistItem(id)) {
    const item = {
      id,
      quantity,
    };
    sessionItems.push(item);
  } else {
    sessionItems?.map((item: any) => {
      if (item.id === id) {
        item.quantity += quantity;
      }
    });
  }
  Storage.setItem(CART.KEY_WORD, JSON.stringify(sessionItems));
};

const isExistItem = (id: number) => {
  const sessionItems = Storage.getItem(CART.KEY_WORD);

  if (sessionItems === null) {
    return false;
  }

  if (typeof sessionItems === undefined) {
    return false;
  }

  const sessionItemsParse = JSON.parse(sessionItems);
  return sessionItemsParse.some((item: any) => item?.id === id);
};

export const removeCartItem = (id: number) => {
  const session = Storage.getItem(CART.KEY_WORD);
  let sessionItems = [];

  if (typeof session !== undefined && session !== null) {
    sessionItems = JSON.parse(session);
  }

  if (isExistItem(id)) {
    Storage.setItem(
      CART.KEY_WORD,
      JSON.stringify(sessionItems?.filter((item) => item.id !== id))
    );
  }
};

export const clearCartItem = () => {
  Storage.clearItem(CART.KEY_WORD);
};
