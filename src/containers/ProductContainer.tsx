import { useQueries, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useRef, useState } from "react";
import { HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>("");
  const timer = useRef<any>(null);

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        queryKey: ["products", currentPage, searchKey],
        queryFn: () => product.searchProduct({ searchKey: searchKey }),
        keepPreviousData: true,
        enabled: !!searchKey,
      },
      {
        queryKey: ["products", currentPage],
        queryFn: () => product.getProduct({ page: currentPage }),
        keepPreviousData: true,
        enabled: !searchKey,
      },
    ],
  });

  const products = searchKey ? result[0].data?.data : result[1].data?.data;

  const isLoading = searchKey ? result[0].isLoading : result[1].isLoading;

  const isError = searchKey ? result[0].isError : result[1].isError;

  const totalPages = Number(
    !!searchKey
      ? result[0].data?.headers[HeaderOptions.totalPages]
      : result[1].data?.headers[HeaderOptions.totalPages]
  );

  useEffect(() => {
    if (!searchKey) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery(["products", nextPage], () =>
        product.getProduct({ page: nextPage })
      );
    }
  }, [currentPage]);

  useEffect(() => {
    if (!!searchKey) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery(["products", nextPage, searchKey], () =>
        product.searchProduct({ searchKey: searchKey })
      );
    }
  }, [currentPage, searchKey]);

  const onHandleChangeInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    const timerId = timer.current;

    clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      setSearchKey(() => {
        return value.target.value;
      });
    }, 1500);

    timer.current = newTimerId;
  };

  if (isLoading) {
    return <p> Loading</p>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Product
      data={products}
      totalPages={totalPages}
      onHandleChangePagination={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
      onHandleChangeInput={onHandleChangeInput}
    />
  );
};

export default ProductContainer;
