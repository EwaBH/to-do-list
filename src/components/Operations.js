import React from "react";
import { createTasksOperations } from "../services/httpServices";
import Operation from "./Operation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import style from "../style/Operations.module.scss";

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
    <div className={style.container}>
    
      {form && (
        <form onSubmit={submit} className={style.addOperations}>
          <input
            type="text"
            name="description"
            placeholder="operation description"
            className={style.operations}
          ></input>

          <button className={style.btn}>
            Add
            <FontAwesomeIcon icon={faCirclePlus} className={style.add} />
          </button>
        </form>
      )}

      <div>
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
      </div>
    </div>
  );
};

export default Operations;
