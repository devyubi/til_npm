# axios (필수 이해)

- xhr, promise, fetch 로 다루던 `비동기 통신을 대체`함
- 실무에서는 fetch 아니면 axios를 활용함
- https://axios-http.com/kr/docs/intro

## 1. CRUD 라이브러리

- Create : Post (내용추가)
- Read : Get (내용읽기)
- Update : Put (전체 내용 수정), Patch (일부분만 수정)
- Delete : Delete (내용추가)

## 2. BE 연동

- Postman
- Swagger : BE 에서 구축해줘야 사용 가능함

## 3. 설치

```bash
npm install axios
```

## 4. 폴더구조

- 일반적으로 `/src/apis` 폴더 추천

## 5. axios 권장하는 코딩자리 및 순서

- useEffect 자리 (화면 출력 시 호출) 에 작성 및 호출 권장

### 5.1 기본코드

- 샘플 api : `https://jsonplaceholder.typicode.com/`

### 5.1.1 fetch 실행시

- 하단처럼 잘 하진 않음. (App.jsx)

```jsx
import { useEffect } from "react";

function App() {
  // js 자리
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(json => console.log(json));
  }, []);
  // jsx 자리
  return <div>App</div>;
}

export default App;
```

### 5.1.2 axios 활용 (기본 코드)

```jsx
import axios from "axios";
import { useEffect } from "react";

function App() {
  // js 자리
  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos",
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);
  // jsx 자리
  return <div>App</div>;
}

export default App;
```

### 5.2 실전 코드

- 실제로 외부데이터 연동은 상당히 많은 경우의 수가 있음
- 컴포넌트는 그냥 자료를 출력, 추가, 삭제 역할만함
- BE 연동은 `별도의 파일로 분리` 해서 호출만 해줌

### 5.2.1 데이터 호출 내용 분리 과정

- 1번 : 최소한 외부 함수로 빼줘야함 (App.jsx)

```jsx
import axios from "axios";
import { useEffect } from "react";

function App() {
  // js 자리

  // 할일 목록 비동기 통신 함수
  const getTodos = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  // jsx 자리
  return <div>App</div>;
}

export default App;
```

- 파일로 함수를 추출하길 권장함
- `/src/apis/todoApi.js` 생성 후 해당 파일에

```js
// 할일 목록 비동기 통신 함수
const getTodos = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```

App.js에서 todoApi.js 로 해당 부분만 옮겨줌

- 옮기고 난 뒤 App.js 모양

```jsx
import { useEffect } from "react";
import { getTodos } from "./apis/todoApi";

function App() {
  // js 자리

  useEffect(() => {
    getTodos();
  }, []);

  // jsx 자리
  return <div>App</div>;
}

export default App;
```

- 옮기고 난 뒤 todoApi.js 모양

```jsx
import axios from "axios";

// 할일 목록 비동기 통신 함수
export const getTodos = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```

- API 주소도 가능하면 분리

```js
import axios from "axios";

// API 주소
export const todoURL = "https://jsonplaceholder.typicode.com/todos";

// 할일 목록 비동기 통신 함수
export const getTodos = async () => {
  try {
    const res = await axios.get("todoURL");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
```

### 5.2.2 다양한 API 작성

- todoApi.js
- 정의만 하고 상단 앞에 export 뺌.
- 하단에 `export { getTodos, getTodo, putTodo, deleteTodo, patchTodo };` 추가.

```js
import axios from "axios";
// API 주소
const todoURL = "https://jsonplaceholder.typicode.com/todos";

// 할일 목록 전체 호출하기
const getTodos = async () => {
  try {
    const res = await axios.get(todoURL);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// 할일 목록 한개만 호출하기
const getTodo = async id => {
  try {
    const res = await axios.get(`${todoURL}/${id}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 한개 추가하기 : Post
const postTodo = async data => {
  try {
    const res = axios.post(todoURL, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 한개 삭제하기 : Delete
const deleteTodo = async id => {
  try {
    const res = await axios.delete(`${todoURL}/${id}}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 전체 업데이트 : Put
const putTodo = async (id, data) => {
  try {
    const res = await axios.put(`${todoURL}/${id},data`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// 할일 일부분 수정 : Patch (patch보단 put을 많이 씀)
const patchTodo = async (id, { title, completed }) => {
  try {
    const res = await axios.patch(`${todoURL}/${id},{title,completed}`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { getTodos, getTodo, putTodo, deleteTodo, patchTodo };
```

### 5.2.3 photo API 작성해보기

- /src/apis/photoApi.js 생성

```js
import axios from "axios";

const photoUrl = "https://jsonplaceholder.typicode.com/photos";

// 할일 목록 전체 호출
const getPhotos = async () => {
  try {
    const res = await axios.get(photoUrl);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 목록 한개 호출
const getPhoto = async data => {
  try {
    const res = await axios.get(photoUrl, data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 한개 추가
const postPhoto = async id => {
  try {
    const res = await axios.post(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 삭제
const deletePhoto = async () => {
  try {
    const res = await axios.delete(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 전체 업데이트
const putPhoto = async () => {
  try {
    const res = await axios.put(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// 할일 일부분 수정
const patchPhoto = async () => {
  try {
    const res = await axios.patch(`${photoUrl}/${id}/`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export { deletePhoto, getPhoto, getPhotos, patchPhoto, postPhoto, putPhoto };
```
