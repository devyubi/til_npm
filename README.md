# 카카오 로그인

- CRA 로 React 프로젝트 생성한 경우
  └ 환경설정 즉, .env 사용법이 다름
- Vite 로 React 프로젝트 생성한 경우
  └ 환경설정 즉, .env 사용법이 다름

## 1. 카카오 개발자 등록하기

- https://developers.kakao.com/

- 상단의 주메뉴에서 `앱` 선택

<img width="1142" height="299" alt="Image" src="https://github.com/user-attachments/assets/b12da5eb-ed61-4d1f-b376-f77172236ec7" />

- 내용 작성하기

<img width="675" height="772" alt="Image" src="https://github.com/user-attachments/assets/1745f351-d81f-4b63-9fdf-89cea1f007a8" />

<img width="671" height="767" alt="Image" src="https://github.com/user-attachments/assets/c12a7f6d-b299-4c96-8da2-a226a4748d69" />

- 목록 확인하기
  <img width="1054" height="450" alt="Image" src="https://github.com/user-attachments/assets/ba9c4875-f3c7-48b8-ad52-d52a682f4146" />
- 비즈 앱 등록하기
  <img width="1304" height="760" alt="Image" src="https://github.com/user-attachments/assets/6df5eb92-6b5e-40d6-9cd1-7defa231c032" />
- 약관 동의 후 진행
  <img width="781" height="495" alt="Image" src="https://github.com/user-attachments/assets/475165d7-84d2-4fdb-b7ca-b6ae461e07a5" />
- 동의 후 개인비즈 앱 전환 후 확인 버튼 클릭
  <img width="1261" height="623" alt="Image" src="https://github.com/user-attachments/assets/ec3ba6c0-e2e2-4391-8ad8-9da1b8555814" />
- 저장 후 화면
  <img width="1108" height="748" alt="Image" src="https://github.com/user-attachments/assets/499dde29-4890-4ae7-a721-65bbebb8635d" />
- 복사
  <img width="639" height="354" alt="Image" src="https://github.com/user-attachments/assets/8c7432bc-cc79-4e8a-8355-8ee0037645b2" />

## Rest API 키 : `외부노출 금지`

- `외부 노출 절대 금지`
- / 바깥 폴더 (완전 바깥) `.env` 파일 생성
- `생성 되는 파일 위치 절대 주의`
  <img width="293" height="904" alt="Image" src="https://github.com/user-attachments/assets/57fb52d1-f12d-4a47-af97-4c8bd4eae1c0" />

### 3.1 접두어는 `REACT_APP_` 으로 `약속`됨

- 例 ) Next.js 프로젝트에서는 `NEXT_APP` 으로 약속됨
- 例 ) Vite 프로젝트에서는 `VITE_` 로 약속됨

```.env
REACT_APP_KAKAO_LOGIN_REST_API_KEY=c993d0475cf8ba46e2bb303249df3ab6 (본인 키 값)
REACT_APP_KAKAO_JS_API_KEY=e2ed72a80ec06d81319e9f13235c5b3d (본인 키 값)
```

### 3.2 `.gitignore`확인

- 주의. 꼭 .env 등록하기.
  <img width="230" height="173" alt="Image" src="https://github.com/user-attachments/assets/52561161-89f8-4719-970b-6ae3e71759cc" />

## 4. Kakao 로그인 실제 URL 연결하기 (플랫폼 설정하기)

  <img width="966" height="492" alt="Image" src="https://github.com/user-attachments/assets/1f2727f9-cf8f-470f-8062-848b94a7f0d3" />

### 4.1 리다이렉트 URL 설정

- http://localhost:3000 : CRA 버전
- http://localhost:5173 : Vite 버전
- https://www.도메인.com : 개인 도메인

## 5. 동의항목 설정

<img width="668" height="766" alt="Image" src="https://github.com/user-attachments/assets/bd12004b-77c6-4615-bb44-20f18985c2a9" />
<img width="651" height="740" alt="Image" src="https://github.com/user-attachments/assets/42dc367c-1eca-4df0-a2f5-50f023d5fac3" />

## 6. 카카오 로그인 구현

- /src/kakao 폴더 생성 (전부 소문자)
- /src/kakao/kakaoapi.js 파일 생성 (전부 소문자)

### 6.1 1단계

- kakaoapi.js

```js
// git 에 key 값 공개 금지
const rest_api_key = process.env.REACT_APP_KAKAO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kakao";

// 카카오 로그인 시 API 호출 경로 : token 활용 (토큰)
// 하단 주소는 약속 된 주소. 변경 될 수도 있음
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
// 하단 주소도 역시 약속 된 주소. 변경 될 수도 있음
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도 시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

### 6.2 2단계 : Access Token 활용

- 사용 기간이 만료 될 수도 있음

```js
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kko_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

### 6.3 전체 코드 (`추후 axios 로 변경 권장`)

- 현재(수업)은(는) original fetch로 쓰는중

```.env
REACT_APP_KAKAO_LOGIN_REST_API_URL=http://localhost:3000/member/kakao
REACT_APP_KAKAO_LOGIN_REST_API_KEY=c993d0475cf8ba46e2bb303249df3ab6
REACT_APP_KAKAO_JS_API_KEY=e2ed72a80ec06d81319e9f13235c5b3d
```

### 6.4 코드 반영

- /src/pages/LoginPage.jsx 파일 생성
- /src/pages/member 폴더 생성
- /src/pages/member/After.jsx 파일 생성

### 6.4.1 라우터 세팅

- /src/App.js 라우터 세팅 확인 필수
- 기본 구성해야할 것.

```js
import { BrowserRouter as Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

- 세팅 이후 모양

```js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import After from "./pages/member/After";

function App() {
  return (
    <Router>
      <LoginPage></LoginPage>
      <Routes>
        <Route path="/member/kakao" element={<After />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
```

#

- 카카오 디벨롭스 -> 앱 -> 일반 -> 리다이렉트 URL 확인 필수.

http://localhost:3000
http://localhost:5173
http://localhost:3000/member/kakao
http://localhost:5173/member/kakao

- kakaoapi.js

```js
// git 에 key 값 공개 금지
const rest_api_key = process.env.REACT_APP_KAKAO_LOGIN_REST_API_KEY;

// 카카오 로그인 성공시 이동할 URL
const redirect_uri = "http://localhost:3000/member/kakao";

// 카카오 로그인 시 API 호출 경로 : token 활용 (토큰)
// 하단 주소는 약속 된 주소. 변경 될 수도 있음
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";

// 카카오 로그인 이후 사용자 정보 API 경로
// 하단 주소도 역시 약속 된 주소. 변경 될 수도 있음
const kakao_user_api = "https://kapi.kakao.com/v2/user/me";

// 카카오 로그인 시도 시 활용할 URL 자동 생성
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
// access 토큰 요청
const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("토큰 요청 실패:", errorData);
    throw new Error("Access Token 요청 실패");
  }

  const data = await response.json();
  return data.access_token;
};

// 사용자 정보 요청
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await fetch(kakao_user_api, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("사용자 정보 요청 실패:", errorData);
      return errorData;
    }

    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.error("fetch 에러:", error);
    return error;
  }
};
```

- After.jsx

```jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAccessToken,
  getMemberWithAccessToken,
} from "../../kakao/kakaoapi.js";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo(info);
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);
  return (
    <div>
      <h1>카카오 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo?.kakao_account.profile.nickname}</div>
      <div>이메일 : {userInfo?.kakao_account.email}</div>
      <div>
        <img src={userInfo?.kakao_account.profile.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

- LoginPage.jsx

```js
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../kakao/kakaoapi";

function LoginPage() {
  const kakaoLoginUrl = getKakaoLoginLink();
  console.log(kakaoLoginUrl);
  return (
    <div>
      <h1>LoginPage</h1>
      <Link to={kakaoLoginUrl}>카카오 로그인</Link>
    </div>
  );
}

export default LoginPage;
```

## 7. Recoil

- kakaoLoginAtom.js

```js
import { atom } from "recoil";

export const kakaoLoginAtom = atom({
  key: "kakaoLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
```

## 8. 로그 아웃

```js
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useRecoilState } from "recoil";
import { KKOLoginAtom } from "../../atoms/kkoLoginAtom";

const After = () => {
  // 사용자 정보 관리
  const [userInfo, setUserInfo] = useRecoilState(KKOLoginAtom);

  // 카카오 인증키 알아내기
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const authCode = URLSearchParams.get("code");

  // 인가 키를 받아서 액세스 토큰을 요청한다.
  const getAccessTokenCall = async () => {
    const accessKey = await getAccessToken(authCode);
    // console.log("accessKey : ", accessKey);
    // 사용자 정보 호출
    const info = await getMemberWithAccessToken(accessKey);
    console.log(info);
    setUserInfo({
      id: info.id,
      nickname: info.kakao_account.profile.nickname,
      thumbnail_image_url: info.kakao_account.profile.thumbnail_image_url,
      email: info.kakao_account.email,
    });
  };

  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.id) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1>KKO 로그인 후 </h1>
      <h2>{authCode}</h2>
      <div>닉네임 : {userInfo.nickname}</div>
      <div>이메일 : {userInfo.email}</div>
      <div>
        <img src={userInfo.thumbnail_image_url} />
      </div>
    </div>
  );
};

export default After;
```

## 9. 로그인 없이 페이지 접근시 처리
- 강제로 navigate("/login")
- 조건문으로 안내 메세지 및 버튼으로 이동 권장