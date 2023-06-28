import { PRODUCT_PER_PAGE } from "../../utils";
import instance from "../axiosInstance";

const product = {
  getProduct: async ({
    page = 1,
    searchKey = "",
  }: {
    page: number;
    searchKey?: string;
  }) => {
    let url = `products?per_page=${PRODUCT_PER_PAGE}&page=${page}`;
    if (searchKey) {
      url += `&search=${encodeURIComponent(searchKey)}`;
    }

    const result = await instance.get(url);

    return result;
  },
};

export default product;
