import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { merge } from "lodash-es";
import { DevURL } from "./apiConstants";

const useRequest = <R>(initialParams: AxiosRequestConfig = {}) => {
  const source = useRef<CancelTokenSource>();
  const refParams = useRef(initialParams);
  const apiRequest = useCallback((requestParams: AxiosRequestConfig) => {
    source.current = axios.CancelToken.source();
    const params = merge(
      {},
      {
        headers: { src: "Application" },
        ...refParams.current,
      },
      requestParams
    );
    return axios({
      baseURL: DevURL,
      ...params,
      cancelToken: source.current.token,
    }).then((res: AxiosResponse<R>) => {
      return res;
    });
  }, []);

  useEffect(() => () => source.current?.cancel(), []);

  return apiRequest;
};

export default useRequest;
