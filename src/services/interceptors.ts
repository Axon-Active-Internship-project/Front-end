import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { authorize } from "./axiosInstance";

export const onRequest = (config: AxiosRequestConfig): any => {
  const url = `${config.baseURL}${config?.url}`;
  const method = `${config.method}`;
  config.headers = authorize(url, method);

  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.log(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
