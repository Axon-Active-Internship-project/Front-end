export interface ICouponData {
  id: number;
  code: string;
  amount: string;
}

export interface IErrorCoupon {
  isError: boolean;
  message: string;
}
