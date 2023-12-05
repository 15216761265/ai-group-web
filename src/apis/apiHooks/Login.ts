import { TResponse } from "@typings/index";
import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";

export const usePostLoginByPhoneNumber = () => {
  return useRequest<TResponse<{ token: string; tokenHead: string }>>({
    url: ApiConstants.API_POST_LOGIN,
    method: "POST",
  });
};

export const usePostRegister = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_POST_REGISTER,
    method: "POST",
  });
};

export const usePostForget = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_POST_FORGET,
    method: "POST",
  });
};

export const usePostSignin = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_POST_SIGNIN,
    method: "POST",
  });
};
