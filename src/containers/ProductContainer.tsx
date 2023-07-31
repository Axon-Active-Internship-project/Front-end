import { useQueries, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useState, useRef } from "react";
import {
  ErrorInputMessage,
  HeaderOptions,
  REG_HTML_TAGS,
  CART,
} from "../utils";
import { ILocalStorageItem, IPriceRange } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks";
import { Box, useToast } from "@chakra-ui/react";
import { Loading } from "../components";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriId, setCategoriId] = useState<string>("");
  const [priceRange, setPriceRange] = useState<IPriceRange>({
    min: "0",
    max: "0",
  });
  const [searchKey, setSearchKey] = useState<string>("");
  const [errorInput, setErrorInput] = useState<{
    isError: boolean;
    message: string;
  }>({ isError: false, message: "" });

  const { addToCart } = useLocalStorage(CART.KEY_WORD, []);

  const timer = useRef<any>(null);

  const navigate = useNavigate();

  const toast = useToast({
    position: "top",
    duration: 1500,
  });

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        queryKey: ["products", currentPage, categoriId, priceRange, searchKey],
        queryFn: () =>
          product.getProduct({
            page: currentPage,
            categoryId: categoriId,
            priceRange: priceRange,
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
      ["products", nextPage, categoriId, priceRange, searchKey],
      () =>
        product.getProduct({
          page: nextPage,
          categoryId: categoriId,
          priceRange: priceRange,
          searchKey: searchKey,
        })
    );
  }, [currentPage]);

  const onHandleChangeCategoryId = (id: string) => {
    setCategoriId(id);
    setCurrentPage(1);
  };

  const onHandleChangePriceRange = ({ min = "0", max }: IPriceRange) => {
    setPriceRange((prev: IPriceRange) => {
      return { ...prev, min, max };
    });

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

  if (result[0].isLoading || result[1].isLoading) {
    return <Loading />;
  }

  if (result[0].isError || result[1].isError) {
    return <ErrorPage />;
  }

  return (
    <Box minH={"51.8vh"}>
      <Product
        data={result[0].data?.data}
        totalPages={totalPages}
        onHandleChangePagination={(page: number) => setCurrentPage(page)}
        currentPage={currentPage}
        onHandleChangeCategory={onHandleChangeCategoryId}
        categories={result[1].data?.data}
        categoriId={categoriId}
        onHandleChangePriceRange={onHandleChangePriceRange}
        priceRange={priceRange}
        onHandleChangeInput={onHandleChangeInput}
        searchKey={searchKey}
        isErrorInput={errorInput.isError}
        errorInputMessage={errorInput.message}
        onHandleAddToCart={onHandleAddToCart}
        onHandleBuyNow={onHandleBuyNow}
        onHandlePressEnter={onHandlePressEnter}
        isLoading={result[0].isFetched}
      />
    </Box>
  );
};

export default ProductContainer;
