const ApiConstants = {
  API_POST_REGISTER: "/member/sso/register",
  API_POST_LOGIN: "/member/sso/login",
  API_POST_FORGET: "/forget",

  API_GET_ROLE_MODAL: "/app/group/list",
  API_GET_ROLE_LIST: "/app/list",
  API_GET_AI_MODAL_LIST: "/app/all/ai/model",

  API_GET_APP_DETAIL: "/app/detail",
  API_GET_MY_APP: "/app/my",
  API_POST_ADD_MY_APP: "/app/add",

  API_GET_CHAT_STREAM: "/chat/stream",
};

export const DevURL = "http://localhost:4000";
export const ProdURL = "http://47.117.127.101:8085";

export default ApiConstants;
