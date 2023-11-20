import { getCookies } from "./../utils/index";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { merge } from "lodash-es";
import { DevURL } from "./apiConstants";
import { useRecoilState } from "recoil";
import { IsLogin } from "@recoil/atoms/users";

const useRequest = <R>(initialParams: AxiosRequestConfig = {}) => {
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
        baseURL: DevURL,
        ...params,
        cancelToken: source.current.token,
      }).then((res: AxiosResponse<R>) => {
        return res;
      });
    },
    [token]
  );

  useEffect(() => () => source.current?.cancel(), []);

  return apiRequest;
};

export default useRequest;
