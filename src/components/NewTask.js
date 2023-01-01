import React from "react";
import { createTask } from "../services/httpServices";
import style from "../style/NewTask.module.scss";
import "../style/main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const NewTask = ({ setTasks }) => {
  const submit = async (e) => {
    e.preventDefault();
    const newTask = await createTask(
      e.target[0].value,
      e.target[1].value,
      "open"
    );
    if (!newTask.error) {
      onNewTask(newTask.data);
      e.target[0].value = null;
      e.target[1].value = null;
    } else {
      alert("Dane nie zostały zapisane!");
    }
  };

  const onNewTask = async (newTask) => {
    setTasks((previous) => {
      return [...previous, newTask];
    });
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.header}>New task</h1>
        <form onSubmit={submit}>
          <input
            type="text"
            name="title"
            placeholder="title"
            className={[style.box, "all"].join(" ")}
          ></input>
          <input
            type="text"
            name="descrioption"
            placeholder="description"
            className={[style.box, "all"].join(" ")}
          ></input>
          <button className={[style.btn, "all"].join(" ")}>
            Add task 
            <FontAwesomeIcon icon={faCirclePlus} className={style.add} />
            {/* <span className="material-symbols-outlined">add_circle</span> */}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTask;
