import React, { useState, useEffect } from "react";
import NewTask from "./components/NewTask";
import Task from "./components/Task";
import { getTasks } from "./services/httpServices";
import style from "./style/App.module.scss"

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setTasks((await getTasks()).data);
  };

  return (
    <>
      <NewTask setTasks={setTasks} />

      {tasks.length > 0 &&
        tasks.map((task) => {
          return <Task key={task.id} task={task} setTasks={setTasks} />;
        })}
    </>
  );
};

export default App;
