export default interface IMyAppListData {
  total: number;
  list: IMyAppList[];
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nextPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  navigatePages: number;
  navigatepageNums: number[];
  navigateFirstPage: number;
  navigateLastPage: number;
}

export interface IMyAppList {
  id: number;
  code: string;
  name: string;
  type: string;
  description: string;
  prompt: string;
  headImageUrl: string;
  displayOnAppSquare: string;
  introduction: string;
  creatorId: number;
  nickName: null;
  groupId: number;
  usageCount: number;
  thumbCount: number;
  collectCount: number;
  dataSets: null;
  temperature: string;
  similarity: string;
  replyStrategy: string;
  fixedReplyText: null;
  supportModelList: SupportModelList[];
  knowledgeBaseCodes: null;
  similarityNumber: number;
  knowledgeBaseSearchRow: null;
  thumb: boolean;
  collect: boolean;
  maxContextTurn: number;
  enableMultiAgent: string;
  displayThought: string;
  displayPlugin: string;
  maxThoughtTurns: number;
  appPluginsInfoVos: null;
  knowledgeSourcePreference: null;
}

export interface SupportModelList {
  code: string;
  name: null;
  tokensPerScore: number;
  maxTokens: number;
  defaultTokens: null;
  default: boolean;
}
