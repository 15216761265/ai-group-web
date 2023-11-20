import {
  useGetHomeRoleList,
  useGetHomeRoleModalList,
} from "@apis/apiHooks/Home";
import { useEffect, useState } from "react";
import IHomeRoleListData, {
  IHomeRoleList,
  IHomeRoleModalList,
} from "@modals/HomeRoleList";
import { openErrorMessage } from "@components/CommonTip";
import { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { IsLogin } from "@recoil/atoms/users";
import { getCookies } from "@utils/index";

function useGetData() {
  const [isLogin] = useRecoilState(IsLogin);
  const token = getCookies("userToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(50);
  const [pageSize, setPageSize] = useState(20);
  const [roleList, setRoleList] = useState<IHomeRoleList[]>();
  const [roleModalFilterList, setRoleModalFilterList] = useState<
    IHomeRoleModalList[]
  >([]);
  const [selectedGroupId, setSlectedGroupId] = useState<string | undefined>();
  const [selectActionType, setSelectActionType] = useState<
    string | undefined
  >();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const getRoleList = useGetHomeRoleList();
  const getRoleModalFilterList = useGetHomeRoleModalList();

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const result = await getRoleModalFilterList({});
        const data = result.data.data;
        setRoleModalFilterList(data);
        //TODO: axios error handle
      } catch (error: AxiosError<{ code: string; message: string }>) {
        if (error.code !== "ERR_CANCELED") {
          openErrorMessage(error?.message);
        }
      }
    })();
  }, [getRoleModalFilterList, token]);

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        setIsLoadingData(true);
        const result = await getRoleList({
          data: {
            searchValue: null,
            actionType: selectActionType,
            pageNo: currentPage,
            pageSize: pageSize,
            groupId: selectedGroupId,
          },
        });
        const data = result.data.data;
        setRoleList(data.list);
        setTotalItems(data.total);
      } catch (error) {
        //TODO: common tip
        console.error(error);
      } finally {
        setIsLoadingData(false);
      }
    })();
  }, [
    currentPage,
    getRoleList,
    isLogin,
    pageSize,
    selectActionType,
    selectedGroupId,
    token,
  ]);

  return {
    currentPage,
    setCurrentPage,
    totalItems,
    pageSize,
    roleList,
    roleModalFilterList,
    selectedGroupId,
    setSlectedGroupId,
    selectActionType,
    setSelectActionType,
    isLoadingData,
  };
}

export default useGetData;
