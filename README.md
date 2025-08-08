# Kakao Map

- https://developers.kakao.com/
- 참조 : https://velog.io/@tpgus758/React에서-Kakao-map-API-사용하기

## 1. API 신청하기

- 환경설정 내용
- .env

```
REACT_APP_KAKAO_MAP_REST_API_KEY=키값
REACT_APP_KAKAO_MAP_JS_API_KEY=키값
```

- Web 플랫폼 설정

- http://localhost:3000
- http://localhost:5173

## 2. 카카오 지도 가이드

- https://apis.map.kakao.com/web/guide/
- 가능하면 위의 사항을 참고하여 진행하기를 권장함

## 3. JS 로 출력하기 (기본)

- App.js(x)

```jsx
import { useEffect } from "react";
import Map from "./components/MapDiv";

function App() {
  // js 자리

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
    kakaoMapScript.onload = () => {
      // console.log(window.kakao);
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
        });
        marker.setMap(map);
      });
    };
  }, []);
  // jsx 자리
  return (
    <div>
      <h1>지도출력</h1>
      <div>
        <div id="map" style={{ width: 500, height: 500 }}></div>
      </div>
    </div>
  );
}

export default App;
```

## 4. react-kakao-maps-sdk 활용하기 (npm 설치)

- https://www.npmjs.com/package/react-kakao-maps-sdk
- https://react-kakao-maps-sdk.jaeseokim.dev/
- 참조블로그 : https://velog.io/@wlwl99/React-Kakao-Map-SDK-사용하기
- 설치 : `npm install react-kakao-maps-sdk`

### 4.1 지도를 출력하기 위한 설정

- App.js(x) 에 추가

```jsx
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
```

### 4.2 지도 출력하기

- /src/components/Map.jsx

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "100%", height: "360px" }}
        >
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

## 5. 다양한 예제

### 5.1 기본 지도

- MapDiv.jsx

```jsx
import { Map } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ width: "800px", height: "600px" }} // 지도 크기
          level={3} // 지도 확대 레벨
        ></Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.2 마커 표시하기

- MapDiv.jsx

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          {/* 마커 좌표 */}
          <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.3 마커 여러개 표시하기

- MapDiv.jsx

```jsx
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const locations = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          {locations.map((loc, idx) => (
            <MapMarker
              key={`${loc.title}-${loc.latlng}`}
              position={loc.latlng}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: { width: 24, height: 35 },
              }}
              title={loc.title}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.4 Map 위에 Custom OverRay 표시하기

- MapDiv.jsx

```jsx
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const locations = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <div
              className="overlay"
              style={{
                backgroundColor: "greenyellow",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              Here!
            </div>
          </CustomOverlayMap>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.5 지도 확대/축소 버튼 출력

- MapDiv.jsx

```jsx
import { useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const [level, setLevel] = useState(3);
  const locations = [
    { title: "카카오", latlng: { lat: 33.450705, lng: 126.570677 } },
    { title: "생태연못", latlng: { lat: 33.450936, lng: 126.569477 } },
    { title: "텃밭", latlng: { lat: 33.450879, lng: 126.56994 } },
    { title: "근린공원", latlng: { lat: 33.451393, lng: 126.570738 } },
  ];

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }}
          style={{ width: "800px", height: "600px" }}
          level={level}
        >
          <CustomOverlayMap position={{ lat: 33.55635, lng: 126.795841 }}>
            <div
              className="overlay"
              style={{
                backgroundColor: "greenyellow",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              Here!
            </div>
          </CustomOverlayMap>
          <button
            onClick={() => setLevel(level + 1)}
            style={{ padding: "10px 20px" }}
          >
            <strong>-</strong>
          </button>
          <button
            onClick={() => setLevel(level - 1)}
            style={{ padding: "10px 20px" }}
          >
            <strong>+</strong>
          </button>
        </Map>
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.6 Geolocation API

- 사용자의 위치 정보를 웹 애플리케이션에 제공할 수 있는 API
- 개인정보 보호를 위해서 브라우저는 사용자에게 위치 정보에 대한 권한을 받은 후 위치 정보를 사용할 수 있다.
- Geolocation.getCurrentPosition() : 기기의 현재 위치를 가져오는 메소드
- Geolocation.watchPosition() : 기기의 위치가 바뀔 때마다, 새로운 위치를 사용하여 함수를 호출한다.

### 5.7 현재 위치 마커 표시하기

- MapDiv.jsx

```jsx
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapDiv = () => {
  // 아래의 구문으로 window.kakao 를 접근할 수 있습니다.
  const { kakao } = window;

  const [address, setAddress] = useState(null); // 현재 좌표의 주소를 저장할 상태

  const getAddress = ({ lat, lng }) => {
    const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
    console.log(geocoder);

    const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
    const callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  };

  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          center={{ lat: 35.86826378542153, lng: 128.59397299137942 }}
          style={{ width: "800px", height: "600px" }}
          level={3}
        >
          <MapMarker
            position={{ lat: 35.86826378542153, lng: 128.59397299137942 }}
          />
          <button
            onClick={() =>
              getAddress({ lat: 35.86826378542153, lng: 128.59397299137942 })
            }
          >
            현재 좌표의 주소 얻기
          </button>
        </Map>

        {address && (
          <div>
            현재 좌표의 주소는..
            <p>address_name: {address.address_name}</p>
            <p>region_1depth_name: {address.region_1depth_name}</p>
            <p>region_2depth_name: {address.region_2depth_name}</p>
            <p>region_3depth_name: {address.region_3depth_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapDiv;
```

### 5.8 좌표값으로 주소 얻기

```jsx
import { useState } from "react";
import { Map, MapTypeId } from "react-kakao-maps-sdk";

const MapDiv = () => {
  const [mapTypeId, setMapTypeId] = useState("");
  return (
    <div>
      <h2>NPM 을 이용한 지도 출력</h2>
      <div>
        <Map
          id="map"
          center={{ lat: 35.86826378542153, lng: 128.59397299137942 }}
          style={{ width: "100%", height: "360px" }}
          level={5}
        >
          {mapTypeId && <MapTypeId type={mapTypeId} />}
        </Map>
        <p>
          <button onClick={() => setMapTypeId("TRAFFIC")}>교통정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("ROADVIEW")}>
            로드뷰 도로정보 보기
          </button>{" "}
          <button onClick={() => setMapTypeId("TERRAIN")}>지형정보 보기</button>{" "}
          <button onClick={() => setMapTypeId("USE_DISTRICT")}>
            지적편집도 보기
          </button>
        </p>
      </div>
    </div>
  );
};

export default MapDiv;
```
