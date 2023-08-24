import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [todoForEdit, setTodoForEdit] = useState();
  const [nextId, setNextId] = useState(1);

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodos = [...todos, { id: nextId, title: inputValue }];
      setTodos(newTodos);
      setInputValue("");
      setNextId(nextId + 1);
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setTodoForEdit(todo);
    setOpen(true);
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
            setTodos((prevTodos) => {
              const newtodos = [...prevTodos];
              const todoIndex = newtodos.findIndex(
                (todo) => todo.id === todoForEdit.id
              );
              newtodos[todoIndex] = {
                id: todoForEdit.id,
                title: todoForEdit.title,
              };

              return newtodos;
            });

            // setTodos((prevTodos) => {
            //   const newtodos = [...prevTodos];
            //   const finalTodos = newtodos.map((todo) => {
            //     if (todo.id === todoForEdit.id) {
            //       return { id: todoForEdit.id, title: todoForEdit.title };
            //     }
            //     return todo;
            //   });
            //   return finalTodos;
            // });
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
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                {todo.title}
                <button
                  className="delete-button"
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
                <button
                  className="add-button"
                  onClick={() => handleEdit(todo.id)}
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
