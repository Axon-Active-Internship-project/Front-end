import { useNavigate, useParams } from "react-router-dom";
import { NotFound, ProductDetail } from "../pages";
import { useQuery } from "@tanstack/react-query";
import { product } from "../services/apis";
import { useState } from "react";
import { ILocalStorageItem } from "../interfaces";
import { CART } from "../utils";
import { useLocalStorage } from "../hooks";
import { Box, useToast } from "@chakra-ui/react";
import { Loading } from "../components";

const ProductDetailContainer = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useToast({
    position: "top",
    duration: 1500,
  });

  const [quantity, setQuantity] = useState<number>(1);

  const { addToCart } = useLocalStorage(CART.KEY_WORD, []);

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
    return <Loading />;
  }

  if (isError) {
    return <p>error</p>;
  }

  if (data === undefined) {
    return <NotFound />;
  }

  return (
    <Box minH={"51.8vh"}>
      <ProductDetail
        data={data}
        onHandleChangequantity={(quantity: number) => setQuantity(quantity)}
        quantity={quantity}
        onHandleAddToCart={onHandleAddToCart}
        onHandleBuyNow={onHandleBuyNow}
      />
    </Box>
  );
};

export default ProductDetailContainer;
