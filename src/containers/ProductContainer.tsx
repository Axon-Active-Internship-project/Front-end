import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useRef, useState } from "react";
import { BLACK_LIST_CHARACTERS, HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKey, setSearchKey] = useState<string>("");
  const [errorInput, setErrorInput] = useState<{
    isError: boolean;
    message: string;
  }>({ isError: false, message: "" });
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

  const onHandleChangeInput = (input: React.ChangeEvent<HTMLInputElement>) => {
    const timerId = timer.current;

    clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      const value = input.target.value;
      if (value.length === 1) {
        return setErrorInput((preError) => {
          return {
            ...preError,
            isError: true,
            message: "Search keywords must be more than 1 character",
          };
        });
      }

      if (value.length >= 100) {
        return setErrorInput((preError) => {
          return {
            ...preError,
            isError: true,
            message: "Search keywords must be less than 100 characters",
          };
        });
      }

      if (BLACK_LIST_CHARACTERS.some((key) => value.includes(key))) {
        return setErrorInput((preError) => {
          return {
            ...preError,
            isError: true,
            message: "Search keywords must be avoided contain special keywords",
          };
        });
      }

      setErrorInput((preError) => {
        return {
          ...preError,
          isError: false,
          message: "",
        };
      });
      setSearchKey(() => {
        return value.trim();
      });
      setCurrentPage(() => 1);
    }, 1500);

    timer.current = newTimerId;
  };

  console.log(errorInput);

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
      isErrorInput={errorInput.isError}
      errorInputMessage={errorInput.message}
    />
  );
};

export default ProductContainer;
