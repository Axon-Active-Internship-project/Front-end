import instance from "../axiosInstance";

const product = {
  getProduct: async () => {
    const result = await instance.get(`products`);
    return result;
  },
};

export default product;
