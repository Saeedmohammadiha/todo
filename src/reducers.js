export const ADD = "ADD";
export const DELETE = "DELETE";
export const EDIT = "EDIT";

export const reducers = (state, action) => {
  switch (action.type) {
    case ADD: {
      if (action.payload.inputValue.trim() !== "") {
        const newTodos = [
          ...state.todos,
          { id: action.payload.nextId, title: action.payload.inputValue },
        ];
        return { todos: newTodos };
      }
    }
    case DELETE: {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return { todos: newTodos };
    }
    case EDIT: {
      const newtodos = [...state.todos];
      const todoIndex = newtodos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      newtodos[todoIndex] = {
        id: action.payload.id,
        title: action.payload.title,
      };

      return { todos: newtodos };
    }
    default:
      break;
  }
};
