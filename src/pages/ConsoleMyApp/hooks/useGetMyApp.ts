import { useCallback, useEffect, useState } from "react";
import { IMyAppList } from "@modals/MyAppList";
import {
  useGetMyAppDataList,
  useGetMyAppDetail,
  usePostAddMyApp,
} from "@apis/apiHooks/MyApp";
import { useForm } from "antd/es/form/Form";
import { openErrorMessage, openSuccessMessage } from "@components/CommonTip";
import { isEmpty } from "lodash-es";
import { useGetHomeRoleModalList } from "@apis/apiHooks/Home";
import { IHomeRoleModalList } from "@modals/HomeRoleList";

export const CreateFormItemMappings = {
  NAME: "name",
  DESC: "description",
  INTRO: "introduction",
  IMAGE: "headImageUrl",
  GROUPID: "groupId",
  PUBLIC: "displayOnAppSquare",
  PROMPT: "prompt",
};
function useGetMyAppData() {
  const [myAppList, setMyAppList] = useState<IMyAppList[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState("PROMPT");
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editAppInfo, setEditAppInfo] = useState<IMyAppList>({} as IMyAppList);
  const [isEditAppInfoLoading, setIsEditAppInfoLoading] = useState(false);
  const [roleModalFilterList, setRoleModalFilterList] = useState<
    IHomeRoleModalList[]
  >([]);

  const getMyAppData = useGetMyAppDataList();
  const postAddMyApp = usePostAddMyApp();
  const getAppDetail = useGetMyAppDetail();
  const getRoleModalList = useGetHomeRoleModalList();

  useEffect(() => {
    (async () => {
      try {
        const result = await getRoleModalList({});
        const data = result.data.data;
        setRoleModalFilterList(data);
        //TODO: axios error handle
      } catch (error: AxiosError<{ code: string; message: string }>) {
        if (error.code !== "ERR_CANCELED") {
          openErrorMessage(error?.message);
        }
      }
    })();
  }, [getRoleModalList, setRoleModalFilterList]);

  const [createForm] = useForm();
  const [editForm] = useForm();

  const getMyAppDetails = useCallback(async () => {
    setIsEditAppInfoLoading(true);
    try {
      const result = await getAppDetail({
        params: {
          code: editId,
        },
      });
      setEditAppInfo(result.data.data);
    } catch (error) {
      //TODO
    } finally {
      setIsEditAppInfoLoading(false);
    }
  }, [editId, getAppDetail]);

  useEffect(() => {
    if (isEmpty(editId)) {
      return;
    }
    if (isEdit) {
      getMyAppDetails();
    }
  }, [editId, getMyAppDetails, isEdit]);

  const getMyAppList = useCallback(async () => {
    try {
      const result = await getMyAppData({
        data: {
          pageNo: currentPage,
          groupId: null,
          searchValue: null,
          actionType: null,
          pageSize: 100,
        },
      });
      const data = result.data.data;
      setMyAppList(data.list);
    } catch (error) {
      //TODO
    } finally {
      //TODO: add page loading
    }
  }, [currentPage, getMyAppData]);

  useEffect(() => {
    getMyAppList();
  }, [currentPage, getMyAppData, getMyAppList]);

  const handleAddMyApp = useCallback(async () => {
    setIsCreating(true);
    try {
      await createForm.validateFields();
    } catch (error) {}
    const createData = createForm.getFieldsValue();
    const {
      displayOnAppSquare,
      groupId,
      headImageUrl,
      introduction,
      name,
      prompt,
    } = createData;
    try {
      const result = await postAddMyApp({
        data: {
          displayOnAppSquare,
          groupId,
          //TODO: should upload img
          headImageUrl,
          introduction,
          name,
          type: "do Ut consequat",
          prompt,
          description: introduction,
        },
      });
      openSuccessMessage("创建成功");
      setIsCreate(false);
      setIsEdit(false);
      getMyAppList();
    } catch (error) {
      //TODO
    } finally {
      setIsCreating(false);
    }
  }, [createForm, getMyAppList, postAddMyApp]);

  return {
    myAppList,
    isCreate,
    setIsCreate,
    isEdit,
    setIsEdit,
    setEditId,
    createForm,
    editForm,
    handleAddMyApp,
    createType,
    setCreateType,
    isCreating,
    editAppInfo,
    isEditAppInfoLoading,
    roleModalFilterList,
  };
}

export default useGetMyAppData;
