import { getCookies } from "./../utils/index";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { merge } from "lodash-es";
import { DevURL, ProdURL } from "./apiConstants";
import { useRecoilState } from "recoil";
import { IsLogin } from "@recoil/atoms/users";

const useRequest = <R>(initialParams: AxiosRequestConfig = {}) => {
  const isDev = window.location.origin.indexOf("localhost") !== -1;
  // const [isLogin] = useRecoilState(IsLogin);
  const token = getCookies("userToken");
  const source = useRef<CancelTokenSource>();
  const refParams = useRef(initialParams);
  const apiRequest = useCallback(
    (requestParams: AxiosRequestConfig) => {
      source.current = axios.CancelToken.source();
      const params = merge(
        {},
        {
          headers: merge(
            {},
            { src: "Application" },
            token && { Authorization: token }
          ),
          ...refParams.current,
        },
        requestParams
      );
      // console.log("%c useRequest", "backgroud-color:pink", params, token);
      return axios({
        baseURL: isDev ? DevURL : ProdURL,
        ...params,
        cancelToken: source.current.token,
      }).then((res: AxiosResponse<R>) => {
        return res;
      });
    },
    [isDev, token]
  );

  useEffect(() => () => source.current?.cancel(), []);

  return apiRequest;
};

export default useRequest;
