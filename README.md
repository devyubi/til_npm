# react-icons

- https://react-icons.github.io/react-icons/
- 설치 : `npm i react-icons`
- 참조 : https://velog.io/@chaevivi/React-React-Icons-사용법

## 1. 활용

- App.js

```js
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

function App() {
  const point = 5;
  const rate = 4;

  return (
    <div>
      <h1>
        App <IoSearch />
      </h1>
      <div>
        <h2>
          당신의별점(
          <FaStar style={{ color: "gold", fontsize: 20 }} />
          )은?
        </h2>
        <div>
          {[...Array(point)].map((item, index) => {
            return (
              <FaStar
                key={index}
                style={{
                  color: index < rate ? "gold" : "gray",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
```
