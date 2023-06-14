import instance from "../axiosInstance";

const product = {
  getProduct: async () => {
    const result = await instance.get("products");
    console.log("result => ", result);
  },
};

export default product;
