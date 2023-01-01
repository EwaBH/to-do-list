import React, { useEffect, useState } from "react";
import {
  updateTask,
  getTasksOperations,
  deleteTask,
} from "../services/httpServices";
import Operations from "./Operations";
import style from "../style/Task.module.scss";
import "../style/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";


const Task = ({ task, setTasks }) => {
  const [operations, setOperations] = useState([]);
  const [internalState, setInternalState] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setOperations((await getTasksOperations(task.id)).data);
  };

  const openAddOperationForm = () => {
    setInternalState(true);
  };

  const finishTask = async () => {
    task.status = "closed";
    const updatedTask = await updateTask(
      task.id,
      task.title,
      task.description,
      task.status
    );
    if (!updatedTask.error) {
      onUpdateTask(updatedTask.data);
    } else {
      alert("Dane nie zostały zapisane!");
    }
  };

  const deleteTaskItem = async () => {
    const deletedTask = await deleteTask(task.id);
    if (!deletedTask.error) {
      onRemoveTask();
    } else {
      alert("Dane nie zostały zapisane!");
    }
  };

  const onRemoveTask = () => {
    setTasks((previous) => previous.filter((x) => x.id !== task.id));
  };

  const onUpdateTask = async (updatedTask) => {
    setTasks((previous) =>
      previous.map((t) => {
        if (t.id === updatedTask.id) {
          return updatedTask;
        }
        return t;
      })
    );
  };

  return (
    <>
      <section className={style.container}>
        <div className={[style.box, "all"].join(" ")}>
          <h3>{task.title}</h3>
          <div>
            {task.description} {task.status}
          </div>
        </div>
        {task.status === "open" && (
          <div>
            <button onClick={openAddOperationForm}>
              {/* <span
                className={["material-symbols-outlined", style.add].join(" ")}
              >
                add_circle
              </span> */}
              <FontAwesomeIcon
                icon={faCirclePlus}
                className={style.add}
              />
            </button>
            <button onClick={finishTask}>
              <span
                className={["material-symbols-outlined", style.finish].join(
                  " "
                )}
              >
                check_box
              </span>
            </button>
          </div>
        )}
        {operations.length === 0 && task.status === "closed" && (
          <button onClick={deleteTaskItem}>
            <span
              className={["material-symbols-outlined", style.bin].join(" ")}
            >
              delete
            </span>
          </button>
        )}
        <Operations
          task={task}
          form={internalState}
          setForm={setInternalState}
          operations={operations}
          setOperations={setOperations}
        />
      </section>
    </>
  );
};

export default Task;
