import { atom } from "recoil";

const LoginUsesInfo = atom<{ name: string } | null>({
  key: "LoginUsesInfo",
  default: null,
});

const IsLogin = atom({
  key: "IsLogin",
  default: false,
});

export { LoginUsesInfo, IsLogin };
