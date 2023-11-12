import { TResponse } from "@typings/index";
import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";
import IHomeRoleListData, { IHomeRoleModalList } from "@modals/HomeRoleList";

export const useGetHomeRoleList = () => {
  return useRequest<TResponse<IHomeRoleListData>>({
    url: ApiConstants.API_GET_ROLE_LIST,
    method: "POST",
  });
};

export const useGetHomeRoleModalList = () => {
  return useRequest<TResponse<IHomeRoleModalList[]>>({
    url: ApiConstants.API_GET_ROLE_MODAL,
    method: "GET",
  });
};

export const useGetAIModalList = () => {
  return useRequest<TResponse<IHomeRoleModalList[]>>({
    url: ApiConstants.API_GET_AI_MODAL_LIST,
    method: "GET",
  });
};
