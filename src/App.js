import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodos = [...todos, inputValue];
      setTodos(newTodos);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
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
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              {todo}
              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
