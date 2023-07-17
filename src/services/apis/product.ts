import { PRODUCT_PER_PAGE } from "../../utils";
import instance from "../axiosInstance";

const product = {
  getProduct: async ({
    page = 1,
    categoryId,
    priceRange,
    searchKey = "",
  }: {
    page: number;
    categoryId: string;
    priceRange: { min: string; max: string };
    searchKey?: string;
  }) => {
    let url = `products?per_page=${PRODUCT_PER_PAGE}&page=${page}`;
    const { min, max } = priceRange;

    if (searchKey) {
      url += `&search=${encodeURIComponent(searchKey)}`;
    }

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

    result.data = result?.data.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return result;
  },

  getProductById: async (id: string | undefined) => {
    if (id) {
      const result = await instance.get(`products/${id}`);

      return result.data;
    }
    return null;
  },

  getCategoryProduct: async () => {
    const result = await instance.get(`products/categories`);

    return result;
  },
};

export default product;
