import { ShoppingCart } from "../pages";
import { useCallback } from "react";
import { useLocalStorage } from "./../hooks";
import { CART } from "../utils/constant";
import { isExistItem } from "../utils";

const ShoppingCartContainer = () => {
  const [cartItems, setCartItems] = useLocalStorage(CART.KEY_WORD, []);

  const onHandleDeleteItem = useCallback((id: number) => {
    if (!isExistItem(id)) {
      return;
    }
    return setCartItems(cartItems.filter((item) => item.id !== id));
  }, []);

  const onHandleIncrementQuantity = (id: number) => {
    if (!isExistItem) {
      return;
    }

    return setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          if (item.quantity >= item.stock_quantity && item.stock_quantity) {
            return { ...item };
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  const onHandleReduceQuantity = (id: number) => {
    if (!isExistItem) {
      return;
    }

    return setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (item.quantity <= 1) {
            return { ...item };
          }

          return { ...item, quantity: newQuantity };
        }

        return item;
      })
    );
  };

  const onHandleChangeQuantity = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isExistItem) {
      return;
    }

    return setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          if (e.target.value >= item.quantity) {
            return { ...item };
          }
          return { ...item, quantity: e.target.value };
        }
      })
    );
  };

  return (
    <ShoppingCart
      data={cartItems}
      onDelete={onHandleDeleteItem}
      onIncrementQuantity={onHandleIncrementQuantity}
      onReduceQuantity={onHandleReduceQuantity}
      onHandleChangeQuantity={onHandleChangeQuantity}
    />
  );
};

export default ShoppingCartContainer;
