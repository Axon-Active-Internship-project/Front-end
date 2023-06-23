import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useState } from "react";
import { HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");

  console.log("input =>", inputValue);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => product.getProduct({ page: currentPage }),
    keepPreviousData: true,
  });

  const totalPages = Number(data?.headers[HeaderOptions.totalPages]);

  useEffect(() => {
    const nextPage = currentPage + 1;

    queryClient.prefetchQuery(["products", nextPage], () =>
      product.getProduct({ page: nextPage })
    );
  }, [currentPage]);

  const onHandleChangeInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => {
      return value.target.value;
    });
  };

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
      onHandleChangePagination={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
      onHandleChangeInput={onHandleChangeInput}
    />
  );
};

export default ProductContainer;
