import { useQueries, useQueryClient } from "@tanstack/react-query";
import { ErrorPage, Product } from "../pages";
import { product } from "../services/apis";
import { useEffect, useState } from "react";
import { FILTER_RANGE, HeaderOptions } from "../utils";

const ProductContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriId, setCategoriId] = useState<string>("");
  const [filterRange, setFilterRange] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

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

  console.log(filterRange);

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
  };

  const onHandleChangeFilter = ({ min, max }: { min: string; max: string }) => {
    setFilterRange((range) => {
      if (min === FILTER_RANGE.min && max === FILTER_RANGE.max) {
        return { min: "", max: "" };
      }

      if (min === FILTER_RANGE.max && max === FILTER_RANGE.max) {
        return { ...range, max: "", min: min };
      }

      if (min === FILTER_RANGE.min && max === FILTER_RANGE.min) {
        return { ...range, max: max, min: "" };
      }

      if (min === FILTER_RANGE.min && max !== FILTER_RANGE.max) {
        console.log("ok");
      }

      return { ...range, min: min, max: max };
    });
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
      onHandleChangeFilter={onHandleChangeFilter}
      filterRange={filterRange}
    />
  );
};

export default ProductContainer;
