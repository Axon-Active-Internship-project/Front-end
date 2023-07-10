import { useNavigate, useParams } from "react-router-dom";
import { NotFound, ProductDetail } from "../pages";
import { useQuery } from "@tanstack/react-query";
import { product } from "../services/apis";
import { useState } from "react";
import { ILocalStorageItem } from "../interfaces";
import { addToCart } from "../utils";
import { useToast } from "@chakra-ui/react";

const ProductDetailContainer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useToast({
    position: "top",
    duration: 3000,
  });

  const [quantity, setQuantity] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product_detail", id],
    queryFn: () => product.getProductById(id),
  });

  const onHandleAddToCart = (item: ILocalStorageItem) => {
    addToCart(item);
    toast({
      title: "Successfully",
      description: "You item already in shopping cart",
      status: "success",
      isClosable: true,
    });
  };

  const onHandleBuyNow = (item: ILocalStorageItem) => {
    addToCart(item);
    navigate("../shopping-cart");
  };

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <p>error</p>;
  }

  if (data === undefined) {
    return <NotFound />;
  }

  return (
    <ProductDetail
      data={data}
      onHandleChangequantity={(quantity: number) => setQuantity(quantity)}
      quantity={quantity}
      onHandleAddToCart={onHandleAddToCart}
      onHandleBuyNow={onHandleBuyNow}
    />
  );
};

export default ProductDetailContainer;
