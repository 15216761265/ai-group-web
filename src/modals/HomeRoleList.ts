export default interface HomeRoleListInterface {
  total: number;
  list: HomeRoleList[];
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

export interface HomeRoleModalList {
  id: string;
  name: string;
  description?: string;
  aiRoles?: null;
}

export interface HomeRoleList {
  id: number;
  code: string;
  name: string;
  type: Type;
  description: string;
  prompt: string;
  headImageUrl: string;
  displayOnAppSquare: DisplayOnAppSquare;
  introduction: string;
  creatorId: number;
  nickName: string;
  groupId: number;
  usageCount: number;
  thumbCount: number;
  collectCount: number;
  dataSets: null;
  temperature: string;
  similarity: Similarity;
  replyStrategy: ReplyStrategy;
  fixedReplyText: null | string;
  supportModelList: SupportModelList[];
  knowledgeBaseCodes: null;
  similarityNumber: number;
  knowledgeBaseSearchRow: number | null;
  thumb: boolean;
  collect: boolean;
  maxContextTurn: null;
  enableMultiAgent: null;
  displayThought: null;
  displayPlugin: null;
  maxThoughtTurns: null;
  appPluginsInfoVos: null;
  knowledgeSourcePreference: null;
}

export enum Type {
  Embedding = "EMBEDDING",
  Image = "IMAGE",
  Prompt = "PROMPT",
}
export enum DisplayOnAppSquare {
  Y = "Y",
}

export enum ReplyStrategy {
  Reply = "REPLY",
}

export enum Similarity {
  High = "HIGH",
  Middle = "MIDDLE",
}

export interface SupportModelList {
  code: Code;
  name: null;
  tokensPerScore: number;
  maxTokens: number;
  defaultTokens: null;
  default: boolean;
}

export enum Code {
  LinkAI35 = "LinkAI-3.5",
  LinkAI4Turbo = "LinkAI-4-turbo",
  Wenxin = "wenxin",
  Wenxin4 = "wenxin-4",
  Xunfei = "xunfei",
}
