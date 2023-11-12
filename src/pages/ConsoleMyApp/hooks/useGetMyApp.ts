import { useEffect, useState } from "react";
import { IMyAppList } from "@modals/MyAppList";
import { useGetMyAppDataList } from "@apis/apiHooks/MyApp";

const MockMyAppData = {
  total: 1,
  list: [
    {
      id: 3616,
      code: "HDffZ4Wg",
      name: "你的名字",
      type: "PROMPT",
      description: "一个随机取名的应用",
      prompt: "请扮演一个取名字的机器人",
      headImageUrl:
        "https://img-1317903499.cos.ap-guangzhou.myqcloud.com/default.png",
      displayOnAppSquare: "N",
      introduction: "你好，快来跟我聊天吧",
      creatorId: 8162,
      nickName: null,
      groupId: 2,
      usageCount: 0,
      thumbCount: 0,
      collectCount: 0,
      dataSets: null,
      temperature: "0.7",
      similarity: "MIDDLE",
      replyStrategy: "REPLY",
      fixedReplyText: null,
      supportModelList: [
        {
          code: "LinkAI-3.5",
          name: null,
          tokensPerScore: 0,
          maxTokens: 6000,
          defaultTokens: null,
          default: true,
        },
        {
          code: "LinkAI-4",
          name: null,
          tokensPerScore: 0,
          maxTokens: 2000,
          defaultTokens: null,
          default: false,
        },
        {
          code: "LinkAI-4-turbo",
          name: null,
          tokensPerScore: 0,
          maxTokens: 4000,
          defaultTokens: null,
          default: false,
        },
        {
          code: "wenxin",
          name: null,
          tokensPerScore: 0,
          maxTokens: 2000,
          defaultTokens: null,
          default: false,
        },
        {
          code: "wenxin-4",
          name: null,
          tokensPerScore: 0,
          maxTokens: 2000,
          defaultTokens: null,
          default: false,
        },
        {
          code: "xunfei",
          name: null,
          tokensPerScore: 0,
          maxTokens: 2000,
          defaultTokens: null,
          default: false,
        },
      ],
      knowledgeBaseCodes: null,
      similarityNumber: 0.0,
      knowledgeBaseSearchRow: null,
      thumb: false,
      collect: false,
      maxContextTurn: 3,
      enableMultiAgent: "N",
      displayThought: "N",
      displayPlugin: "N",
      maxThoughtTurns: 3,
      appPluginsInfoVos: null,
      knowledgeSourcePreference: null,
    },
  ],
  pageNum: 1,
  pageSize: 1,
  size: 1,
  startRow: 0,
  endRow: 0,
  pages: 1,
  prePage: 0,
  nextPage: 0,
  isFirstPage: true,
  isLastPage: true,
  hasPreviousPage: false,
  hasNextPage: false,
  navigatePages: 8,
  navigatepageNums: [1],
  navigateFirstPage: 1,
  navigateLastPage: 1,
};
function useGetMyAppData() {
  const [myAppList, setMyAppList] = useState<IMyAppList[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const getMyAppData = useGetMyAppDataList();

  useEffect(() => {
    (async () => {
      // const result = await getMyAppData({
      //   params: {
      //     pageNo: currentPage,
      //     pageSize: 100,
      //   },
      // });
      const result = MockMyAppData;
      setMyAppList(result.list);
    })();
  }, []);

  return { myAppList, isCreate, setIsCreate, isEdit, setIsEdit, setEditId };
}

export default useGetMyAppData;
