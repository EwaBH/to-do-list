import React, { useState } from "react";
import { deleteOperation, updateOperation } from "../services/httpServices";

const Operation = ({ operation, status, setOperations }) => {
  const [activeForm, setActiveForm] = useState(false);
  const [timeSpentConverted, setTimeSpentConverted] = useState(
    convertTimeSpent()
  );

  const deleteOperationItem = async () => {
    const deletedOperation = await deleteOperation(operation.id);
    if (!deletedOperation.error) {
      onRemoveOperation();
    }
  };

  const onRemoveOperation = () => {
    setOperations((previous) =>
      previous.filter((op) => op.id !== operation.id)
    );
  };

  const onUpdateOperation = (updatedOperation) => {
    setOperations((previous) =>
      previous.map((op) => {
        if (op.id === updatedOperation.id) {
          return updatedOperation;
        }
        return op;
      })
    );
  };

  const addTime = () => {
    setActiveForm(true);
  };

  const close = () => {
    setActiveForm(false);
  };

  const save = async (e) => {
    e.preventDefault();
    const updatedOperation = await updateOperation(
      operation.id,
      e.target[0].value,
      e.target[1].value
    );
    if (!updatedOperation.error) {
      operation.description = updatedOperation.data.description;
      operation.timeSpent = updatedOperation.data.timeSpent;
      setTimeSpentConverted(convertTimeSpent());
      onUpdateOperation(updatedOperation.data);
    } else {
      alert("Dane nie zostały zapisane!");
    }
    close();
  };

  function convertTimeSpent() {
    if (+operation.timeSpent === 0) {
      return "";
    }
    const hours = Math.floor(operation.timeSpent / 60);
    if (hours > 0) {
      return hours + "h " + (+operation.timeSpent - hours * 60) + "m";
    }
    return operation.timeSpent + "m";
  }

  return (
    <>
      <div>
        <div>
          {operation.description} {timeSpentConverted}
        </div>

        {activeForm ? (
          <form onSubmit={save}>
            <input type="text" defaultValue={operation.description}></input>
            <input type="number" placeholder="Spent time in minutes"></input>
            <button type="submit">save</button>
            <button>
              <span className="material-symbols-outlined">close</span>
            </button>
          </form>
        ) : (
          <div>
            {status === "open" && (
              <button onClick={addTime}>
                Add time
                <span className="material-symbols-outlined">schedule</span>
              </button>
            )}
            <button onClick={deleteOperationItem}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Operation;
