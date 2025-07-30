import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 역할을 함
  default: 0, // state 의 초기값
});
export const kakaoLoginAtom = atom({
  key: "kakaoLoginAtom",
  default: { isLogin: false, userId: "", userImg: "" },
});
export const googleLoginAtom = atom({
  key: "googleLoginAtom",
  default: { isLogin: false, userId: "", userImg: "" },
});
