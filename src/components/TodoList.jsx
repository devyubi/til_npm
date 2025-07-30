import { useRecoilState } from "recoil";
import { todoListAtom } from "../atoms/TodoListAtom";
import { useState } from "react";
import { loginAtom } from "../atoms/LoginAtom";

function TodoList() {
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [todo, setTodo] = useRecoilState(todoListAtom);
  const [text, setText] = useState("");

  const add = () => {
    // atom의 데이터를 업데이트함
    setTodo([...todo, { id: new Date(), title: text, completed: false }]);
  };

  return (
    <div>
      <h3>
        Todo List 기능<button onClick={setIsLogin(true)}>로그인</button>
      </h3>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={add}>추가</button>
      </div>
      {isLogin && (
        <div>
          <h4>할일 목록</h4>
          <ul>
            {todo.map(item => (
              <li key={item.id}>
                <span>{item.title}</span>
                <button onClick={() => console.log("삭제")}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;
