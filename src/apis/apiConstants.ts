const ApiConstants = {
  // 用户
  API_POST_REGISTER: "/member/sso/register",
  API_POST_LOGIN: "/member/sso/login",
  API_POST_FORGET: "/forget",
  API_POST_SIGNIN: "/member/signIn", //签到

  // 模型
  API_GET_ROLE_MODAL: "/app/group/list",
  API_GET_ROLE_LIST: "/app/list",
  API_GET_AI_MODAL_LIST: "/app/all/ai/model",

  // 应用
  API_GET_APP_DETAIL: "/app/detail",
  API_GET_MY_APP: "/app/my",
  API_POST_ADD_MY_APP: "/app/add",

  // 聊天
  API_GET_CHAT_STREAM: "/chat/stream",

  // 绘画
  API_POST_GENERATE_IMAGINE: "/midjourney/imagine",
  API_POST_MJ_TASK: "/midjourney/task",
};

export const DevURL = "http://localhost:4000";
export const ProdURL = "http://47.117.127.101:8085";

export default ApiConstants;
