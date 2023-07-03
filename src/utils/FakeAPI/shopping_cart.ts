import { IShoppingCartItem } from "../../interfaces";

const SHOPPING_CART_DATA: IShoppingCartItem[] = [
  {
    id: 1,
    name: "aaa",
    image: {
      id: 1,
      src: "http://localhost/wordpress/wp-content/uploads/2023/06/brook.jpg",
    },
    quantity: 1,
    unit_price: "100",
  },
  {
    id: 2,
    name: "bbb ",
    image: {
      id: 1,
      src: "http://localhost/wordpress/wp-content/uploads/2023/06/brook.jpg",
    },
    quantity: 2,
    unit_price: "100",
  },
  {
    id: 3,
    name: "ccc",
    image: {
      id: 1,
      src: "http://localhost/wordpress/wp-content/uploads/2023/06/brook.jpg",
    },
    quantity: 10,
    unit_price: "100",
  },
  {
    id: 4,
    name: "ddd",
    image: {
      id: 1,
      src: "http://localhost/wordpress/wp-content/uploads/2023/06/brook.jpg",
    },
    quantity: 1,
    unit_price: "100",
  },
];

export default SHOPPING_CART_DATA;
