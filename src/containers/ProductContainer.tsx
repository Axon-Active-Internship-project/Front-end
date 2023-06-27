import { useQueries, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useMemo, useState } from "react";
import { FILTER_RANGE, HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriId, setCategoriId] = useState<string>("");
  const [priceSelect, setPriceSelect] = useState<string>("");

  const filterRange = useMemo(() => {
    if (priceSelect) {
      return { ...FILTER_RANGE[Number(priceSelect)] };
    }
    return { min: "", max: "" };
  }, [priceSelect]);

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        queryKey: ["products", currentPage, categoriId, filterRange],
        queryFn: () =>
          product.getProduct({
            page: currentPage,
            categoryId: categoriId,
            priceRange: filterRange,
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
      ["products", nextPage, categoriId, filterRange],
      () =>
        product.getProduct({
          page: nextPage,
          categoryId: categoriId,
          priceRange: filterRange,
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
      onChange={(page: number) => setCurrentPage(page)}
      currentPage={currentPage}
      onHandleChangeCategory={onHandleChangeCategoryId}
      categories={result[1].data?.data}
      categoriId={categoriId}
      onHandleChangePriceRange={onHandleChangePriceRange}
      priceSelect={priceSelect}
    />
  );
};

export default ProductContainer;
