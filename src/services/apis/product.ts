import instance from "../axiosInstance";

const product = {
  getProduct: () => {
    const result = instance.get("products");
    console.log("result => ", result);
  },
};

product.getProduct();

export default product;
