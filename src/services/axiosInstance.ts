import axios from "axios";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";

const instance = axios.create({
  baseURL: "",
  timeout: 15000,
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
