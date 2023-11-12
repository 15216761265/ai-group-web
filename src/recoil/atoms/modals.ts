import { IHomeRoleList } from "@modals/HomeRoleList";
import { atom } from "recoil";

const UserSelectedModals = atom<IHomeRoleList[]>({
  key: "UserSelectedModals",
  default: [],
});

export { UserSelectedModals };
