import { useReducer, useRef, useState } from "react";
import "./App.css";
import { ADD, DELETE, reducers } from "./reducers";
import EditModal from "./EditModal";

function App() {
  const [inputValue, setInputValue] = useState("");
  const nextId = useRef(1);
  const todoEditRef = useRef();
  const [state, dispatch] = useReducer(reducers, { todos: [] });

  const handleAddTodo = () => {
    dispatch({ type: ADD, payload: { inputValue, nextId: nextId.current } });
    setInputValue("");
    nextId.current = nextId.current + 1;
  };

  return (
    <>
      <div className="todo-container">
        <h1>Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Enter New Todo..."
          />
          <button className="add-button" onClick={handleAddTodo}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <ul className="todo-list">
          {state?.todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.title}
                <button
                  className="delete-button"
                  onClick={() => {
                    dispatch({ type: DELETE, payload: todo.id });
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  className="add-button"
                  onClick={() => {
                    todoEditRef.current.setTodoForEdit({
                      id: todo.id,
                      title: todo.title,
                    });
                    todoEditRef.current.setOpen(true);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <EditModal dispatch={dispatch} ref={todoEditRef} />
    </>
  );
}

export default App;
