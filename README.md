# Recoil

- context 관리가 참쉽다.
- 치명적 단점으로 개발자가 퇴사했다.(유지보수 안되고 있음)
- https://recoiljs.org/ko
- React 18 버전까지만 지원함.
- React 19 는 사용못함(Context + useReducer, Zustands, Redux Tool Kit)

## 0. 수업을 위한 조치

```bash
npm install react@18 react-dom@18
```

## 1. 설치

```bash
npm install recoil
```

## 2. 폴더 구조(권장사항)

- /src/atoms 폴더 생성(수업 기준)
- /src/states 폴더 생성

## 3. 파일 생성

- /src/atoms/counterAtom.js 생성

```js
import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom", // state 를 구분하는 역할
  default: 0, // state 의 초기값
});
```

## 4. 적용하기

- index.js

```js
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
```

## 5. atom 사용해 보기

- /src/components/CounterAtom.jsx

```jsx
import { useRecoilState } from "recoil";
import { counterAtom } from "../atoms/counterAtom";

function CounterAtom() {
  const [count, setCount] = useRecoilState(counterAtom);
  return (
    <div>
      <h1>recoil 예제</h1>
      <div>
        <p>전역 count 값 : {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  );
}

export default CounterAtom;
```

## 6. 응용 예제

- /src/atoms/TodoListAtom.js 파일 생성

```js
import { atom } from "recoil";

const todoListAtom = atom({
  key: "todoListAtom",
  defult: [],
});
```

- /src/components/TodoList.jsx 파일 생성
