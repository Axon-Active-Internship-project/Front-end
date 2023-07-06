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

  return (
    <ShoppingCart
      data={cartItems}
      onDelete={onHandleDeleteItem}
      onHandleChange={setCartItems}
    />
  );
};

export default ShoppingCartContainer;
