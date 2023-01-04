import React, { useState } from "react";
import { deleteOperation, updateOperation } from "../services/httpServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faTrash,
  faFloppyDisk,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import style from "../style/Operation.module.scss";

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
    return "0h " + operation.timeSpent + "m";
  }

  return (
    <section>
      <div className={style.container}>
        <div className={[style.submitOperation, "all"].join(" ")}>
          {operation.description}
          {+operation.timeSpent > 0 && (
            <span className={style.clock__small}>{timeSpentConverted}</span>
          )}
        </div>

        {activeForm ? (
          <form onSubmit={save} className={style.submitOperation}>
            <input
              type="text"
              defaultValue={operation.description}
              className={style.operationValue}
            ></input>

            <div className={[style.operation__time, "all"].join(" ")}>
              <input
                type="number"
                placeholder="Spent time in minutes"
                className={style.operation__timeDiscription}
              ></input>

              <button type="submit" className={style.disk}>
                <FontAwesomeIcon icon={faFloppyDisk} className={style.icon} />
              </button>
              <button className={style.xmark}>
                <FontAwesomeIcon icon={faXmark} className={style.icon} />
              </button>
            </div>
          </form>
        ) : (
          <div className={style.submitOperation2}>
            {status === "open" && (
              <button
                onClick={addTime}
                className={[style.btnAddTime, "all"].join(" ")}
              >
                Add time
                <FontAwesomeIcon icon={faClock} className={style.clock} />
              </button>
            )}
            <button
              onClick={deleteOperationItem}
              className={[style.btn__bin, "all"].join(" ")}
            >
              <FontAwesomeIcon icon={faTrash} className={style.bin} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Operation;
