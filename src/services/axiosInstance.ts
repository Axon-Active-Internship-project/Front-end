import axios from "axios";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";
import { BASE_URL } from "../utils";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  auth: {
    username: `${process.env.REACT_APP_CONSUMER_KEY}`,
    password: `${process.env.REACT_APP_CONSUMER_SECRET}`,
  },
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
