# react-calendar

- 실무에서 통상 2가지 라이브러리를 활용함
- 절대로 캘린더를 직접 코딩 XXXXXXXX
- react-calendar 가 가장 수월함 (기능 적음)
  - https://projects.wojtekmaj.pl/react-calendar/
- full-calendar 가 활용이 많이 됨 (기능 많음, 하지만 복잡함)
  - https://fullcalendar.io/

## 기본 Date 관련 라이브러리

- moment : `npm i moment`

## 설치

- `npm i react-calendar`

## 페이지 구성

- /src/pages/Schedule.jsx 생성
- /src/components/layout 폴더 생성
- /src/components/layout/Header.jsx 파일 생성
- /src/App.jsx에 넣기

```jsx
import React from "react";
import Header from "./components/layout/Header";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div>
      <Header />
      <Schedule />
    </div>
  );
}

export default App;
```

## 캘린더 기본형 구성

- 1 단계 : 출력하기

```jsx
import Calendar from "react-calendar";

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };
  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div style={scWrap}>
        <Calendar />
      </div>
    </div>
  );
}

export default Schedule;
```

- 2단계 : css 를 뽑아내기 (제공되는 css 원본 활용)
- /src/pages/calendar.css 파일 생성
- 원본 파일은 node_modules/react-calendar/dist/Calendar.css에 있음. (원본 복사. 원본은 수정X)

```css
/* css 원본 파일 */
.react-calendar {
  width: 100%; //
  max-width: 100%;
  background: white;
  border: 1px solid #a0a096;
  font-family: "Arial", "Helvetica", sans-serif;
  line-height: 1.125em;
}

.react-calendar--doubleView {
  width: 700px;
}

.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}

.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}

.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}

.react-calendar button:enabled:hover {
  cursor: pointer;
}

.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
}

.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}

.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase;
  font: inherit;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__days__day--neighboringMonth,
.react-calendar__decade-view__years__year--neighboringDecade,
.react-calendar__century-view__decades__decade--neighboringCentury {
  color: #757575;
}

.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}

.react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
  background: none;
  text-align: center;
  font: inherit;
  font-size: 0.833em;
}

.react-calendar__tile:disabled {
  background-color: #f0f0f0;
  color: #ababab;
}

.react-calendar__month-view__days__day--neighboringMonth:disabled,
.react-calendar__decade-view__years__year--neighboringDecade:disabled,
.react-calendar__century-view__decades__decade--neighboringCentury:disabled {
  color: #cdcdcd;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__tile--now {
  background: #ffff76;
}

.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}

.react-calendar__tile--hasActive {
  background: #76baff;
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}

.react-calendar__tile--active {
  background: #006edc;
  color: white;
}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}

.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}
```

## 캘린더 기능 살펴보기

### 1. 캘린더 날짜 출력을 US 달력으로 변경 및 글자 변경 하기

```jsx
// Schedule.jsx
import Calendar from "react-calendar";
import "./calendar.css";
import { locale } from "moment";

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 2. 특정 날짜의 class 적용하기

- 스캐쥴.jsx

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import { locale } from "moment";
import { data } from "react-router-dom";

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

- 캘린더.css

```css
.react-calendar {
  width: 100%; /* 350px -> 100% 로 변경 */
  max-width: 100%;
  background: white;
  border: 1px solid #a0a096;
  font-family: "Arial", "Helvetica", sans-serif;
  line-height: 1.125em;
}

.react-calendar--doubleView {
  width: 700px;
}

.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}

.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}

.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
}

.react-calendar button:enabled:hover {
  cursor: pointer;
}

.react-calendar__navigation {
  display: flex;
  height: 44px;
  margin-bottom: 1em;
}

.react-calendar__navigation button {
  min-width: 44px;
  background: none;
}

.react-calendar__navigation button:disabled {
  background-color: #f0f0f0;
}

.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__month-view__weekdays {
  text-align: center;
  text-transform: uppercase; /* 기본:대문자임. 소문자로 출력하고 싶을시 지우기or주석처리 */
  font: inherit;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__weekdays__weekday {
  padding: 0.5em;
}

.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font: inherit;
  font-size: 0.75em;
  font-weight: bold;
}

.react-calendar__month-view__days__day--weekend {
  color: #d10000;
}

.react-calendar__month-view__days__day--neighboringMonth,
.react-calendar__decade-view__years__year--neighboringDecade,
.react-calendar__century-view__decades__decade--neighboringCentury {
  color: #757575;
}

.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 2em 0.5em;
}

.react-calendar__tile {
  max-width: 100%;
  padding: 10px 6.6667px;
  background: none;
  text-align: center;
  font: inherit;
  font-size: 0.833em;
}

.react-calendar__tile:disabled {
  background-color: #f0f0f0;
  color: #ababab;
}

.react-calendar__month-view__days__day--neighboringMonth:disabled,
.react-calendar__decade-view__years__year--neighboringDecade:disabled,
.react-calendar__century-view__decades__decade--neighboringCentury:disabled {
  color: #cdcdcd;
}

.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus {
  background-color: #e6e6e6;
}

.react-calendar__tile--now {
  background: #ffff76;
}

.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
  background: #ffffa9;
}

.react-calendar__tile--hasActive {
  background: #76baff;
}

.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
  background: #a9d4ff;
}

.react-calendar__tile--active {
  background: #006edc;
  color: white;
}

.react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
  background: #1087ff;
}

.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

/* 내가 정하는 클래스 정의 */
.jung {
  background-color: #ff0000;
}
.kim {
  background-color: #ff5900;
}
.park {
  background-color: #fff200;
}
.lee {
  background-color: #00ff11;
}
.hong {
  background-color: #0080ff;
}
.ryu {
  background-color: #001881;
  color: #76baff;
}
.pyo {
  background-color: #6200ff;
}
```

### 3. 외부에서 데이터를 받아와서 날짜에 출력시키기

- Schedule.jsx

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { data } from "react-router-dom";
import { useEffect, useState } from "react";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-19",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2025-07-29",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };
  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날짜를 비교해서 결과를 찾아냄
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h3>{dayResult.title}</h3>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료를 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 4. 캘린더 기본 출력 날짜 변경하기

- Schedule.jsx

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { data } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "prettier";
import { formatDate } from "react-calendar/dist/shared/dateFormatter.js";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-19",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2025-07-29",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };
  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날짜를 비교해서 결과를 찾아냄
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h3>{dayResult.title}</h3>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료를 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);
  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 5. 캘린더 날짜 선택시 처리하기

- Schedule.jsx

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { data } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "prettier";
import { formatDate } from "react-calendar/dist/shared/dateFormatter.js";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-19",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2025-07-29",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };
  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날짜를 비교해서 결과를 찾아냄
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h3>{dayResult.title}</h3>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료를 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);
  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("DD");
  };
  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };

  const [clickInfo, setClickInfo] = useState(null);

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 6. 캘린더에 클릭된 날짜값 설정

- Schedule.jsx

```jsx
const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));
```

```jsx
<Calendar
  calendarType="gregory"
  formatShortWeekday={formatShortWeekday}
  tileClassName={tileClassName}
  tileContent={tileContent}
  formatDay={formatDay}
  onClickDay={onClickDay}
  value={clickDay}
/>
```

- 전체

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { data } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "prettier";
import { formatDate } from "react-calendar/dist/shared/dateFormatter.js";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-19",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2025-07-29",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };
  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날짜를 비교해서 결과를 찾아냄
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h3>{dayResult.title}</h3>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료를 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);
  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("DD");
  };
  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };

  const [clickInfo, setClickInfo] = useState(null);
  // 6. 캘린더에 클릭된기본 날짜값 설정
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={tileClassName}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 7. 일정이 있는 경우에만 css 적용하기

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { data } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "prettier";
import { formatDate } from "react-calendar/dist/shared/dateFormatter.js";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-19",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2025-07-29",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일, 1:월, 2:화 ~ 6: 토
    // console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };
  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날짜를 비교해서 결과를 찾아냄
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h3>{dayResult.title}</h3>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료를 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);
  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("DD");
  };
  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };

  const [clickInfo, setClickInfo] = useState(null);
  // 6. 캘린더에 클릭된기본 날짜값 설정
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));

  // 7. 일정이 있는 날짜만 css 적용하기
  const titleClassNameShow = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };

  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileClassName={titleClassNameShow}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          value={clickDay}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 8. Range 를 사용하는 경우의 날짜 꾸미기

```jsx
import Calendar from "react-calendar";
import "./calendar.css";
import moment, { locale } from "moment";
import { useEffect, useState } from "react";
import { formatDate } from "react-calendar/dist/shared/dateFormatter.js";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    day: "2025-07-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    day: "2025-07-29",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    day: "2025-07-17",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    day: "2027-06-30",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일 ~ 6:토요일
    //console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };

  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날자를 비교해서 결과를 찾아낸다.
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h2>{dayResult.title}</h2>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);

  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };
  const [clickInfo, setClickInfo] = useState(null);

  // 6. 캘린더 클릭된 날짜값 설정
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));

  // 7. 일정이 있는 날짜만 css 적용하기
  const tileClassNameShow = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };
  // 8. 캘린더 기본 일정(Range) 출력하기 설정
  // 날짜의 범위 초기값
  const initRange = {
    start: "2025-07-07",
    end: "2025-07-20",
  };
  // 화면에 출력할 날짜 sate 관리
  // react-calendar 에서는 JS의 Date 객체를 사용합니다.
  // 단지 우리가 moment 로 글자를 변환해서 보여줄 뿐
  const [selectedRange, setSelectedRange] = useState([
    new Date(initRange.start),
    new Date(initRange.end),
  ]);
  // Range 를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    if (checkDay >= initRange.start && checkDay <= initRange.end) {
      // CSS 적용하기
      return "sun";
    }
  };
  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContent}
          formatDay={formatDay}
          onClickDay={onClickDay}
          selectRange={true}
          value={selectedRange}
          tileClassName={tileClassNameRange}
        />
      </div>
    </div>
  );
}

export default Schedule;
```

### 9. 캘린더 외부 API의 결과가 일정인 경우 출력

```jsx
// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    startday: "2025-06-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    startday: "2025-05-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    startday: "2025-06-05",
    endday: "2025-06-07",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    startday: "2025-07-09",
    endday: "2025-07-15",
    img: "/logo192.png",
  },
];
```

- 전체

```jsx
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./calendar.css";

// 백엔드에서 전달받은 자료
const todoApi = [
  {
    pk: 0,
    title: "점심먹기",
    text: "내용 1",
    startday: "2025-06-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 1,
    title: "영화보기",
    text: "내용 2",
    startday: "2025-05-01",
    endday: "2025-06-04",
    img: "/logo192.png",
  },
  {
    pk: 2,
    title: "책읽기",
    text: "내용 3",
    startday: "2025-06-05",
    endday: "2025-06-07",
    img: "/logo192.png",
  },
  {
    pk: 3,
    title: "그림그리기",
    text: "내용 4",
    startday: "2025-07-09",
    endday: "2025-07-15",
    img: "/logo192.png",
  },
];

function Schedule() {
  // js 자리
  const scWrap = {
    width: "80%",
    margin: "0 auto",
    background: "yellowgreen",
    minHeight: 400,
  };

  // 1. 날짜를 US 방식으로 변경
  const weekName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const formatShortWeekday = (locale, date) => {
    const idx = date.getDay();
    // Date 객체에서 getDay 는 날짜가 0:일 ~ 6:토요일
    //console.log(idx);
    return weekName[idx];
  };
  // 2. 사용자가 특정 클래스 지정하기
  const tileClassName = ({ date }) => {
    // 날짜를 이용해서 요일의 번호를 추출한다.
    // console.log(date.getDay());
    const day = date.getDay();
    let className = "";
    if (day === 0) {
      // 일요일
      className = "jung";
    } else if (day === 1) {
      // 월요일
      className = "kim";
    } else if (day === 2) {
      // 화요일
      className = "park";
    } else if (day === 3) {
      // 수요일
      className = "lee";
    } else if (day === 4) {
      // 목요일
      className = "hong";
    } else if (day === 5) {
      // 금요일
      className = "ryu";
    } else if (day === 6) {
      // 토요일
      className = "pyo";
    }
    return className;
  };

  // 3. 외부에서 받아온 자료 출력하기
  const [allData, setAllData] = useState([]);
  const tileContent = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // console.log(checkDay);
    // api 데이터와 체크날자를 비교해서 결과를 찾아낸다.
    const dayResult = allData.find(item => checkDay === item.day);
    // console.log(dayResult);
    if (dayResult) {
      return (
        <div>
          <h2>{dayResult.title}</h2>
          <div>
            <img
              src={dayResult.img}
              alt={dayResult.title}
              style={{ width: 10 }}
            />
          </div>
        </div>
      );
    }
  };
  useEffect(() => {
    // 백엔드 자료 받아서 처리하기 가장 좋은 자리
    setAllData(todoApi);
  }, []);

  // 4. 일자의 날짜 출력 포맷 변경하기
  const formatDay = (locale, date) => {
    return moment(date).format("D");
  };

  // 5. 날짜 선택시 처리
  const onClickDay = date => {
    const clickDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => clickDay === item.day);
    if (dayResult) {
      setClickInfo(dayResult);
    } else {
      setClickInfo(null);
    }
  };
  const [clickInfo, setClickInfo] = useState(null);

  // 6. 캘린더 클릭된 날짜값 설정
  const [clickDay, setClickDay] = useState(moment().format("YYYY-MM-DD"));

  // 7. 일정이 있는 날짜만 css 적용하기
  const tileClassNameShow = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    const dayResult = allData.find(item => checkDay === item.day);
    if (dayResult) {
      return "sun";
    }
  };
  // 8. 캘린더 기본 일정(Range) 출력하기 설정
  // 날짜의 범위 초기값
  const initRange = {
    start: "2025-07-07",
    end: "2025-07-20",
  };
  // 화면에 출력할 날짜 sate 관리
  // react-calendar 에서는 JS의 Date 객체를 사용합니다.
  // 단지 우리가 moment 로 글자를 변환해서 보여줄 뿐
  const [selectedRange, setSelectedRange] = useState([
    new Date(initRange.start),
    new Date(initRange.end),
  ]);
  // Range 를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    if (checkDay >= initRange.start && checkDay <= initRange.end) {
      // CSS 적용하기
      return "sun";
    }
  };
  // 9. 캘린더 외부 API의 결과가 일정인 경우 출력
  // Range 를 사용하는 경우의 내용출력하기
  const tileContentRange = ({ date }) => {
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 만약  checkDay : 2024-06-01
    // 1. 배열의 각 요소를 찾는다.
    // 2. 찾은 요소의 값을 이용한다.
    const dayResults = allData.filter(item => {
      return checkDay >= item.startday && checkDay <= item.endday;
    });
    // console.log("필터링 된 내용 : ", dayResults);
    if (dayResults.length > 0) {
      return (
        <div>
          {dayResults.map(dayResult => (
            <div key={dayResult.pk}>
              <h2>{dayResult.title}</h2>
              <div>
                <img
                  src={dayResult.img}
                  alt={dayResult.title}
                  style={{ width: "10px", height: "10px" }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  // Range 를 사용하는 경우의 날짜 꾸미기
  const tileClassNameRange2 = ({ date }) => {
    // console.log(date);
    const checkDay = moment(date).format("YYYY-MM-DD");
    // 범위 안에 있는가의 변수를 찾자, 결과로 true 와 false 리턴한다.
    // 배열을 대상으로 매개변수로 요소를 전달하고
    // 요소를 전달받아서 함수를 실행하도록 하는
    // 고차함수의 일종입니다.
    const isRange = allData.some(
      item => checkDay >= item.startday && checkDay <= item.endday,
    );
    if (isRange) {
      return "sun";
    }
  };
  // jsx 자리
  return (
    <div>
      <h1>캘린더 출력</h1>
      <div>선택한 날짜 정보 : {clickInfo?.title}</div>
      <div style={scWrap}>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          tileContent={tileContentRange}
          formatDay={formatDay}
          onClickDay={onClickDay}
          selectRange={true}
          value={selectedRange}
          tileClassName={tileClassNameRange2}
        />
      </div>
    </div>
  );
}

export default Schedule;
```
