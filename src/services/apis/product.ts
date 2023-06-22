import instance from "../axiosInstance";

const product = {
  getProduct: async ({
    per_page = 9,
    page = 1,
  }: {
    per_page?: number;
    page: number;
  }) => {
    const result = await instance.get(
      `products?per_page=${per_page}&page=${page}`
    );

    return result;
  },
};

export default product;
