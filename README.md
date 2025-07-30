# ESLint npm 변경하기

```bash
npm uninstall eslint @eslint/js
npm install --save-dev eslint@8.56.0
```

# swiper

- https://swiperjs.com/react
- https://swiperjs.com/demos

## 설치

```bash
npm i swiper
```

## 폴더 구성

- /src/pages/Slide.jsx 파일 생성

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 수작업 (자동 입력 없음)
import "swiper/css";
// 개별 작업 (자동 입력 없음)
import "./slide.css";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper className="sw-visual">
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

- /src/pages/slide.css 파일 생성

```css
.visual-slide {
  width: 80%;
  margin: 0 auto;
  background-color: rgb(214, 244, 252);
}

.sw-visual {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.sw-visual .swiper-slide {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6cd1ff;
}
```

## 1. loop 와 navigation 적용 예제

- 1 단계 : css와 모듈을 확인함

```jsx
// css 와 모듈 확인 (수작업, 자동 입력 없음)
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
```

- 2 단계 : modules 적용

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 수작업 (자동 입력 없음)
import "swiper/css";
// 개별 작업 (자동 입력 없음)
import "./slide.css";
// css 와 모듈 확인 (수작업, 자동 입력 없음)
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

## 2. Navigation 커스터마이징

- css

```css
.visual-slide {
  position: relative;
  width: 80%;
  margin: 0 auto;
  background-color: rgb(214, 244, 252);
}

.sw-visual {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.sw-visual .swiper-slide {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6cd1ff;
}

/* 커스터마이징 네비게이션 */
.prev,
.next {
  position: absolute;
  top: 50%;
  z-index: 99;
  width: 40px;
  height: 40px;
  background-color: #fff;
  cursor: pointer;
}
.prev {
  left: 20px;
}
.next {
  right: 20px;
}
```

- Slide.jsx

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 수작업 (자동 입력 없음)
import "swiper/css";
// 개별 작업 (자동 입력 없음)
import "./slide.css";
// css 와 모듈 확인 (수작업, 자동 입력 없음)
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Slide() {
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        {/* 네비게이션 커스터마이징 */}
        <div className="prev">이전</div>
        <div className="next">다음</div>
        <Swiper
          loop={true}
          // navigation={true}
          navigation={{ nextEl: ".next", prevEl: ".prev" }}
          modules={[Navigation]}
          className="sw-visual"
        >
          <SwiperSlide>1</SwiperSlide>
          <SwiperSlide>2</SwiperSlide>
          <SwiperSlide>3</SwiperSlide>
          <SwiperSlide>4</SwiperSlide>
          <SwiperSlide>5</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```

## 3. API 연동과 Swiper Slide

- Slide.jsx

```jsx
import { Swiper, SwiperSlide } from "swiper/react";
// 기본 수작업 (자동 입력 없음)
import "swiper/css";
// 개별 작업 (자동 입력 없음)
import "./slide.css";
// css 와 모듈 확인 (수작업, 자동 입력 없음)
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

// 외부 데이터
const slideData = [
  {
    title: "고양이1",
    pic: "https://images.unsplash.com/photo-1585373683920-671438c82bfa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "고양이2",
    pic: "https://i.pinimg.com/736x/d8/a6/cb/d8a6cbb02bc2c5c27ae238db2e89425d.jpg",
  },
  {
    title: "고양이3",
    pic: "data:image/jpeg;base64,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",
  },
];
function Slide() {
  // js 자리
  const [data, setData] = useState([]);

  // 화면에 컴포넌트 보여질때 딱 한번 실행
  useEffect(() => {
    setData(slideData);
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>Slide</h1>
      <div className="visual-slide">
        {/* 커스터마이징 네비게이션 */}
        <div className="prev">이전</div>
        <div className="next">다음</div>
        <Swiper
          loop={true}
          // navigation={true}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          modules={[Navigation]}
          className="sw-visual"
        >
          {data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.pic} alt={item.title} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default Slide;
```
