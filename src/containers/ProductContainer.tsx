import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useState } from "react";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => product.getProduct({ page: currentPage }),
    keepPreviousData: true,
  });

  const totalPages = Number(data?.headers["x-wp-totalpages"]);

  useEffect(() => {
    const nextPage = currentPage + 1;

    queryClient.prefetchQuery(["products", nextPage], () =>
      product.getProduct({ page: nextPage })
    );
  }, [currentPage]);

  if (isLoading) {
    return <p> Loading</p>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Product
      data={data?.data}
      totalPages={totalPages}
      onChange={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
    />
  );
};

export default ProductContainer;
