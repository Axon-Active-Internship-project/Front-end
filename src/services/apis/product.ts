import { PRODUCT_PER_PAGE } from "../../utils";
import instance from "../axiosInstance";

const product = {
  getProduct: async ({ page = 1 }: { page: number }) => {
    const result = await instance.get(
      `products?per_page=${PRODUCT_PER_PAGE}&page=${page}`
    );

    return result;
  },

  searchProduct: async ({ searchKey }: { searchKey: string }) => {
    const result = await instance.get(
      `products?per_page=${PRODUCT_PER_PAGE}&search=${searchKey}`
    );

    return result;
  },
};

export default product;
