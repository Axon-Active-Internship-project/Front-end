import { useParams } from "react-router-dom";
import { NotFound, ProductDetail } from "../pages";
import { useQuery } from "@tanstack/react-query";
import { product } from "../services/apis";
import { useState } from "react";

const ProductDetailContainer = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product_detail", id],
    queryFn: () => product.getProductById(id),
  });

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
    />
  );
};

export default ProductDetailContainer;
