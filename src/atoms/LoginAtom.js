import { atom } from "recoil";

export const loginAtom = atom({
  key: "LoginAtom",
  default: { isLogin: false, userId: "", userImg: "" },
});
