import { useEffect, useState } from "react";
import MapDiv from "./components/MapDiv";

function App() {
  // js 자리
  // 지도의 로딩 상태를 관리하는 state
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 화면이 보이면 한번만 실행
  useEffect(() => {
    // 카카오 맵 스크립트 태그(element)를 생성하라
    const kakaoMapScript = document.createElement("script");
    // 스크립트를 동적, 즉 비동기로 불러들여라 (load 하라)
    kakaoMapScript.async = true;
    // 카카오 SDK URL 을 설정하라
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_JS_API_KEY}&autoload=false&libraries=services,clusterer`;
    // 문서의 head 태그에 추가하라
    document.head.appendChild(kakaoMapScript);
    // 스크립트가 load 가 완료 되면 실행될 EventListner를 추가함
    kakaoMapScript.addEventListener("load", () => {
      // 카카오맵을 로딩하고 로딩상태가 변하면 Rerendering 함
      window.kakao.maps.load(() => {
        // 카카오 지도 로딩 완료로 Rerendering 진행
        setIsMapLoaded(true);
      });
    });
  }, []);

  // 지도가 load가 되지 않으면 로딩 메세지를 출력함
  if (!isMapLoaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }

  // jsx 자리
  return (
    <div>
      <h1>지도출력</h1>
      <MapDiv />
    </div>
  );
}

export default App;
