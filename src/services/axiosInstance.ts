import axios, { AxiosHeaders } from "axios";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";
import OAuth from "oauth-1.0a";
import cryptoJS from "crypto-js";

const hash_function_sha1 = (base_string: any, key: any): string => {
  return cryptoJS.enc.Base64.stringify(cryptoJS.HmacSHA1(base_string, key));
};
const oauth = new OAuth({
  consumer: {
    key: import.meta.env.VITE_CUSTOMER_KEY,
    secret: import.meta.env.VITE_SECRET_KEY,
  },
  signature_method: "HMAC-SHA1",
  hash_function: hash_function_sha1,
});

export const authorize = (url: string, method: string) => {
  const requestData = {
    url,
    method,
  };
  return oauth.toHeader(
    oauth.authorize(requestData)
  ) as unknown as AxiosHeaders;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
