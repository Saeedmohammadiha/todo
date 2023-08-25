import { useReducer, useState } from "react";
import "./App.css";
import { ADD, DELETE, EDIT, reducers } from "./reducers";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [todoForEdit, setTodoForEdit] = useState();
  const [nextId, setNextId] = useState(1);
  const [state, dispatch] = useReducer(reducers, { todos: [] });

  const handleAddTodo = () => {
    dispatch({ type: ADD, payload: { inputValue, nextId } });
    setInputValue("");
    setNextId(nextId + 1);
  };

  const editModal = (
    <div className={`modal `}>
      <div className="modal-content">
        <h2>Input Modal</h2>
        <input
          type="text"
          value={todoForEdit?.title}
          onChange={(e) =>
            setTodoForEdit({ ...todoForEdit, title: e.target.value })
          }
          placeholder="Enter something"
        />
        <button
          onClick={() => {
            dispatch({
              type: EDIT,
              payload: { id: todoForEdit.id, title: todoForEdit.title },
            });

            setOpen(false);
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            setOpen(false);
            setTodoForEdit(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );

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
                    setTodoForEdit({ id: todo.id, title: todo.title });
                    setOpen(true);
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {open && editModal}
    </>
  );
}

export default App;
