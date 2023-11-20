import { TResponse } from "@typings/index";
import ApiConstants from "@apis/apiConstants";
import useRequest from "@apis/useRequest";

export const useGetChatStream = () => {
  return useRequest<TResponse>({
    url: ApiConstants.API_GET_CHAT_STREAM,
    method: "GET",
  });
};
