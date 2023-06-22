import { useQuery } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";

const ProductContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: product.getProduct,
  });

  if (isLoading) {
    return <p> Loading</p>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return <Product data={data?.data} />;
};

export default ProductContainer;
