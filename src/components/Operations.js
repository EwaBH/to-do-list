import React from "react";
import { createTasksOperations } from "../services/httpServices";
import Operation from "./Operation";

const Operations = ({ task, form, setForm, operations, setOperations }) => {
  const submit = async (e) => {
    e.preventDefault();
    const newOperation = await createTasksOperations(
      task.id,
      e.target[0].value
    );
    if (!newOperation.error) {
      setOperations((previous) => [...previous, newOperation.data]);
    } else {
      alert("Dane nie zostały zapisane!");
    }
    setForm(false);
  };

  return (
    <>
      {form && (
        <form onSubmit={submit}>
          <input
            type="text"
            name="description"
            placeholder="Some operation"
          ></input>
          <button>Add</button>
        </form>
      )}
      {operations.length > 0 &&
        operations.map((op) => {
          return (
            <Operation
              key={op.id}
              operation={op}
              status={task.status}
              setOperations={setOperations}
            />
          );
        })}
    </>
  );
};

export default Operations;
