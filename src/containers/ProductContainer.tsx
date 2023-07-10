import { useQueries, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useMemo, useState, useRef } from "react";
import {
  FILTER_RANGE,
  ErrorInputMessage,
  HeaderOptions,
  REG_HTML_TAGS,
  addToCart,
} from "../utils";
import { ILocalStorageItem } from "../interfaces";
import { useNavigate } from "react-router-dom";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriId, setCategoriId] = useState<string>("");
  const [priceSelect, setPriceSelect] = useState<string>("0");
  const [searchKey, setSearchKey] = useState<string>("");
  const [errorInput, setErrorInput] = useState<{
    isError: boolean;
    message: string;
  }>({ isError: false, message: "" });
  const timer = useRef<any>(null);

  const navigate = useNavigate();

  const filterRange = useMemo(() => {
    return { ...FILTER_RANGE[Number(priceSelect)] };
  }, [priceSelect]);

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        queryKey: ["products", currentPage, categoriId, filterRange, searchKey],
        queryFn: () =>
          product.getProduct({
            page: currentPage,
            categoryId: categoriId,
            priceRange: filterRange,
            searchKey: searchKey,
          }),
        keepPreviousData: true,
      },

      {
        queryKey: ["category"],
        queryFn: product.getCategoryProduct,
      },
    ],
  });

  const totalPages = Number(result[0].data?.headers[HeaderOptions.totalPages]);

  useEffect(() => {
    const nextPage = currentPage + 1;

    queryClient.prefetchQuery(
      ["products", nextPage, categoriId, filterRange, searchKey],
      () =>
        product.getProduct({
          page: nextPage,
          categoryId: categoriId,
          priceRange: filterRange,
          searchKey: searchKey,
        })
    );
  }, [currentPage]);

  const onHandleChangeCategoryId = (id: string) => {
    setCategoriId(id);
    setCurrentPage(1);
  };

  const onHandleChangePriceRange = (id: string) => {
    setPriceSelect(id);
    setCurrentPage(1);
  };

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
            message: ErrorInputMessage.tooFewer,
          };
        });
      }

      if (value.length >= 100) {
        return setErrorInput((preError) => {
          return {
            ...preError,
            isError: true,
            message: ErrorInputMessage.tooLong,
          };
        });
      }

      if (REG_HTML_TAGS.test(value)) {
        return setErrorInput((preError) => {
          return {
            ...preError,
            isError: true,
            message: ErrorInputMessage.htmlTag,
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
    }, 300);

    timer.current = newTimerId;
  };

  const onHandlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchKey(() => e.target?.value);
    }
  };

  const onHandleAddToCart = (item: ILocalStorageItem) => {
    addToCart(item);
  };

  const onHandleBuyNow = (item: ILocalStorageItem) => {
    addToCart(item);
    navigate("../shopping-cart");
  };

  if (result[0].isLoading || result[1].isLoading) {
    return <p> Loading</p>;
  }

  if (result[0].isError || result[1].isError) {
    return <ErrorPage />;
  }

  return (
    <Product
      data={result[0].data?.data}
      totalPages={totalPages}
      onHandleChangePagination={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
      onHandleChangeCategory={onHandleChangeCategoryId}
      categories={result[1].data?.data}
      categoriId={categoriId}
      onHandleChangePriceRange={onHandleChangePriceRange}
      priceSelect={priceSelect}
      onHandleChangeInput={onHandleChangeInput}
      searchKey={searchKey}
      isErrorInput={errorInput.isError}
      errorInputMessage={errorInput.message}
      onHandleAddToCart={onHandleAddToCart}
      onHandleBuyNow={onHandleBuyNow}
      onHandlePressEnter={onHandlePressEnter}
    />
  );
};

export default ProductContainer;
