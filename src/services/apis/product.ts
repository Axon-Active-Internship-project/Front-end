import { PRODUCT_PER_PAGE } from "../../utils";
import instance from "../axiosInstance";

const product = {
  getProduct: async ({
    page = 1,
    categoryId,
    priceRange,
  }: {
    page: number;
    categoryId: string;
    priceRange: { min: string; max: string };
  }) => {
    let url = `products?per_page=${PRODUCT_PER_PAGE}&page=${page}`;
    const { min, max } = priceRange;

    if (categoryId) {
      url += `&category=${categoryId}`;
    }

    if (min) {
      url += `&min_price=${min}`;
    }

    if (max) {
      url += `&max_price=${max}`;
    }

    const result = await instance.get(url);

    return result;
  },

  getCategoryProduct: async () => {
    const result = await instance.get(`products/categories?per_page=3`);

    return result;
  },
};

export default product;
