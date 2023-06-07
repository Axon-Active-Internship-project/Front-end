import { AxiosRequestConfig } from "axios";

interface IAxiosResponse<T = never> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig;
  request?: any;
}

export default IAxiosResponse;
