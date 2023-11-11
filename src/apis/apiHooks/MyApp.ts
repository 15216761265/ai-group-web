import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";
import IMyAppListData from "@modals/MyAppList";
import { TResponse } from "@typings/index";

export const useGetMyAppDataList = () => {
  return useRequest<TResponse<IMyAppListData>>({
    url: ApiConstants.API_GET_MY_APP,
    method: "GET",
  });
};
