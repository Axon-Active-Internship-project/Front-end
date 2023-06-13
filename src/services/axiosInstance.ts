import axios from "axios";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "./interceptors";

const BASE_URL = "http://localhost/wordpress/wp-json/wc/v3/";

const CONSUMER_KEY = "ck_569d19d94c1c56bb3b778c399e24cab84d8aff9e";
const CONSUMER_SECRET = "cs_60402f4f34919d330d619f9eb1e3a58931a6953e";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
  },
});

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
