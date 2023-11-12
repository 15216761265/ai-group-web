import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { useCallback, useEffect, useRef } from "react";
import { merge } from "lodash-es";
import { DevURL } from "./apiConstants";
import { useRecoilState } from "recoil";
import { JwtToken } from "@recoil/atoms/users";

//TODO: add jwt token

const useRequest = <R>(initialParams: AxiosRequestConfig = {}) => {
  const [jwttoken] = useRecoilState(JwtToken);
  const source = useRef<CancelTokenSource>();
  const refParams = useRef(initialParams);
  console.log("useRequest");
  const apiRequest = useCallback(
    (requestParams: AxiosRequestConfig) => {
      source.current = axios.CancelToken.source();
      const params = merge(
        {},
        {
          headers: merge(
            {},
            { src: "Application" },
            jwttoken && { Authorization: jwttoken }
          ),
          ...refParams.current,
        },
        requestParams
      );
      console.log("%c useRequest", "backgroud-color:pink", params, jwttoken);
      return axios({
        baseURL: DevURL,
        ...params,
        cancelToken: source.current.token,
      }).then((res: AxiosResponse<R>) => {
        return res;
      });
    },
    [jwttoken]
  );

  useEffect(() => () => source.current?.cancel(), []);

  return apiRequest;
};

export default useRequest;
