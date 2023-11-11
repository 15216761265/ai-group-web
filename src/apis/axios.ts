import axios, { AxiosResponse } from "axios";
import { TResponse } from "@typings/index";

axios.interceptors.response.use(
  (response: AxiosResponse<TResponse>) => {
    if (response.status === 200 && response.data.code === 200) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axios;
