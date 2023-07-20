import { axiosInstance } from "..";

const order = {
  createOrder: async (data: any) => {
    let url = `orders`;

    console.log("data => ", data);

    const result = await axiosInstance.post(url, data);

    console.log("result => ", result);

    return result;
  },
};

export default order;
