import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useRef, useState } from "react";
import { HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>("");
  const timer = useRef<any>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, searchKey],
    queryFn: () =>
      product.getProduct({ searchKey: searchKey, page: currentPage }),
    keepPreviousData: true,
  });

  const totalPages = Number(data?.headers[HeaderOptions.totalPages]);

  useEffect(() => {
    const nextPage = currentPage + 1;

    queryClient.prefetchQuery(["products", nextPage, searchKey], () =>
      product.getProduct({ page: nextPage, searchKey: searchKey })
    );
  }, [currentPage]);

  const onHandleChangeInput = (value: React.ChangeEvent<HTMLInputElement>) => {
    const timerId = timer.current;

    clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      setSearchKey(() => {
        return value.target.value;
      });
      setCurrentPage(() => 1);
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
      data={data.data}
      totalPages={totalPages}
      onHandleChangePagination={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
      onHandleChangeInput={onHandleChangeInput}
      searchKey={searchKey}
    />
  );
};

export default ProductContainer;
