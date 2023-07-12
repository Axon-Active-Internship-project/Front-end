import instance from "../axiosInstance";

const coupon = {
  getCouponByCode: async (code: string) => {
    let url = `coupons/?code=${encodeURIComponent(code)}`;

    const result = await instance.get(url);

    return result;
  },
};

export default coupon;
