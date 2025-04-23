import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useFetch } from "../hooks/useFetch.jsx";
import { useAuthContext } from "./AuthContext.jsx";

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

  const newTask = (task) => {
    if (task.name.length > 4) {
      try {
        fetch("/api/task/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task, user.username),
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Error al agregar la tarea ${task.name}, ${error}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
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
