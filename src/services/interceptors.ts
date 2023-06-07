import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const onRequest = (config: AxiosRequestConfig): any => {
  const token: string = "";
  if (!token) {
    // config.headers?.Authorization = "bearer ${accessToken}";
  }
  return config;
};

export const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

export const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

export const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
