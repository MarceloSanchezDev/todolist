import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useAuthContext } from "./AuthContext.jsx";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [taskDeleted, setTaskDeleted] = useState([]);
  const { user } = useAuthContext();
  console.log(taskList, taskCompleted, taskDeleted);
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await fetch("/api/task/allTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user }),
        });
        const { tasks, tasksCompleted } = await response.json();
        setTaskList(tasks);
        setTaskCompleted(tasksCompleted);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllTasks();
  }, [user]);
  const newTask = async (task) => {
    if (task.name.length > 4) {
      try {
        const newTaskFetch = await fetch("/api/task/addTask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task, user }),
        });
        const allTasks = await newTaskFetch.json();
        Swal.fire({
          title: "Exito",
          text: `Tarea agregada correctamente`,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        console.log(allTasks);
        setTaskList(allTasks.tasks);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: `Error al agregar la tarea ${task.name}, ${JSON.parse(error)}`,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.log(JSON.parse(error));
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "La tarea no puede ser menor a 4 caracteres",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  const deleteTask = async (index, task) => {
    /*
    setTaskDeleted([...taskDeleted, task]);
    setTaskList(taskList.filter((_, i) => i !== index));
    */
    Swal.fire({
      icon: "success",
      title: "Task deleted",
      text: `The task ${task.name} has been deleted`,
    });
  };
  const completeTask = async (index, task) => {
    try {
      const completeTaskFetch = await fetch("/api/task/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, user }),
      });
      const allTasks = await completeTaskFetch.json();
      Swal.fire({
        title: "Exito",
        text: `Tarea completada correctamente`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      console.log(allTasks);
      setTaskCompleted(allTasks.tasks);
    } catch (error) {
      console.error("Error completing task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error completing task ${task.nombre_task}`,
      });
    }
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
