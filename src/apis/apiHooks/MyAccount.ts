import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";
import IUserInfo from "@modals/userInfo";
import IUserIncome from "@modals/userIncome";
import IUserInvoke from "@modals/userInvoke";
import IUserListOrder from "@modals/userListOrder";
import { TResponse } from "@typings/index";

export const usePostUpdateInfo = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_POST_UPDATE_INFO,
    method: "POST",
  });
};

export const useGetUserInfo = () => {
  return useRequest<TResponse<IUserInfo>>({
    url: ApiConstants.API_GET_INFO,
    method: "GET",
  });
};

export const usePostListIncome = () => {
  return useRequest<TResponse<IUserIncome>>({
    url: ApiConstants.API_POST_LIST_INCOME,
    method: "POST",
  });
};

export const usePostListInvoke = () => {
  return useRequest<TResponse<IUserInvoke>>({
    url: ApiConstants.API_POST_LIST_INVOKE,
    method: "POST",
  });
};

export const usePostListOrder = () => {
  return useRequest<TResponse<IUserListOrder>>({
    url: ApiConstants.API_POST_LIST_ORDER,
    method: "POST",
  });
};
