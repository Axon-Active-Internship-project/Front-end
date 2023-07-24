import { axiosInstance } from "..";

const order = {
  createOrder: async (data: any) => {
    let url = `orders`;

    const result = (await axiosInstance.post(url, data)).data;

    return result;
  },
};

export default order;
