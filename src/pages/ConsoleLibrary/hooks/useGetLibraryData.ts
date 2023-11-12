import { message } from "antd";
import { openErrorMessage } from "@components/CommonTip";
import { ILibraryData } from "@modals/Librarylist";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { handleApiError } from "@utils/index";

const MockData: ILibraryData[] = [
  {
    code: "MJvKzdNi",
    name: "你的名字",
    desc: "一个取名大全",
    create_time: "2023-11-12T14:54:16",
    update_time: "2023-11-12T14:54:16",
  },
];
function useGetLibraryData() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editCode, setEditCode] = useState<string>();
  const [libraryList, setLibraryList] = useState<ILibraryData[]>();

  useEffect(() => {
    (async () => {
      try {
        // const result =await
        setLibraryList(MockData);
      } catch (error) {
        handleApiError(error);
      }
    })();
  }, []);

  return {
    isEdit,
    setIsEdit,
    setEditCode,
    libraryList,
    isAddModalOpen,
    setIsAddModalOpen,
  };
}

export default useGetLibraryData;
