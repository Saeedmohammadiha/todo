import { forwardRef, useImperativeHandle, useState } from "react";
import { EDIT } from "./reducers";

const EditModal = forwardRef(function EditModal({ dispatch }, ref) {
  const [todoForEdit, setTodoForEdit] = useState();
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        setTodoForEdit(arg) {
          setTodoForEdit(arg);
        },
        setOpen(arg) {
          setOpen(arg);
        },
      };
    },
    []
  );

  
  return (
    <div className={`modal`} style={{ display: open ? "block" : "none" }}>
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
});

export default EditModal;
