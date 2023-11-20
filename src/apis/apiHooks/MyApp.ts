import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";
import IMyAppListData, { IMyAppList } from "@modals/MyAppList";
import { TResponse } from "@typings/index";

export const useGetMyAppDataList = () => {
  return useRequest<TResponse<IMyAppListData>>({
    url: ApiConstants.API_GET_MY_APP,
    method: "POST",
  });
};

export const useGetMyAppDetail = () => {
  return useRequest<TResponse<IMyAppList>>({
    url: ApiConstants.API_GET_APP_DETAIL,
    method: "GET",
  });
};

export const usePostAddMyApp = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_POST_ADD_MY_APP,
    method: "POST",
  });
};
