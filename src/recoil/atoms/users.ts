import { atom } from "recoil";

const LoginUsesInfo = atom({
  key: "LoginUsesInfo",
  default: null,
});

const JwtToken = atom({
  key: "jwtToken",
  default: "",
});

export { LoginUsesInfo, JwtToken };
