import React from "react";
import { ShoppingCart } from "../pages";
import { getSessionItems } from "../utils";
import { useQueries } from "@tanstack/react-query";
import { product } from "../services/apis";

const ShoppingCartContainer = () => {
  const shoppingCartItems = getSessionItems();

  const finalData = useQueries({
    queries: shoppingCartItems.map((item) => {
      return {
        queryKey: ["product", item.id],
        queryFn: () => product.getProductById(item.id),
      };
    }),
  });

  // const result = finalData.map((item) => {
  //   const a = shoppingCartItems.find((item1) => item1?.id === item?.data?.id);
  //   return {
  //     ...item,
  //     data: {
  //       ...item?.data,
  //       ...a,
  //     },
  //   };
  // });

  const group = finalData.reduce((r, a) => {
    r[a?.data?.categories[0]?.name] = [
      ...(r[a?.data?.categories[0]?.name] || []),
      a,
    ];
    return r;
  }, {});

  const data = Object.entries(group);

  return <ShoppingCart data={data} />;
};

export default ShoppingCartContainer;
