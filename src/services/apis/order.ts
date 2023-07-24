import { axiosInstance } from "..";

const order = {
  createOrder: async (data: any) => {
    let url = `orders`;

    console.log(data);

    const result = (await axiosInstance.post(url, data)).data;

    return result;
  },

  getOrderById: async (id: number) => {
    let url = `orders`;

    if (id) {
      url += `/${id}`;
    }

    const result = (await axiosInstance.get(url)).data;

    return result;
  },
};

export default order;
