import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useFetch } from "../hooks/useFetch";
import { useAuthContext } from "../../context/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [taskDeleted, setTaskDeleted] = useState([]);
  const { user } = useAuthContext();
  const { data } = useFetch("/api/task/allTasks", "POST", user);
  useEffect(() => {
    setTaskList(data);
  }, [data]);

  console.log(taskList);
  const newTask = (task) => {
    if (task.name.length > 4) {
      setTaskList((prevTasks) => [...prevTasks, task]);
      Swal.fire({
        title: "Exito",
        text: "Tarea agregada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "La tarea no puede ser menor a 4 caracteres",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const deleteTask = (index, task) => {
    setTaskDeleted([...taskDeleted, task]);
    setTaskList(taskList.filter((_, i) => i !== index));
    Swal.fire({
      icon: "success",
      title: "Task deleted",
      text: `The task ${task.name} has been deleted`,
    });
  };
  const completeTask = (index, task) => {
    setTaskCompleted([...taskCompleted, task]);
    setTaskList(taskList.filter((_, i) => i !== index));
    Swal.fire({
      icon: "success",
      title: "Task completed",
      text: `The task ${task.name} has been completed`,
    });
  };
  return (
    <TaskContext.Provider
      value={{
        taskList,
        taskCompleted,
        taskDeleted,
        newTask,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
