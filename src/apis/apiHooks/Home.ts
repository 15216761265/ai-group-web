import { TResponse } from "@typings/index";
import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";
import HomeRoleListInterface from "@modals/HomeRoleList";

export const useGetHomeRoleList = () => {
  return useRequest<TResponse<HomeRoleListInterface>>({
    url: ApiConstants.API_GET_ROLE_LIST,
    method: "GET",
  });
};
