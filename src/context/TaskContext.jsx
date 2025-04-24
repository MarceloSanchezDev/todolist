import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

import { useAuthContext } from "./AuthContext.jsx";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [taskDeleted, setTaskDeleted] = useState([]);
  const { user } = useAuthContext();
  console.log(taskList);
  useEffect(() => {
    if (!user) return;
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
      if (!user) {
        const fecha = new Date().toISOString().split("T")[0];
        const hora = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const newTask = {
          id_task: Math.floor(Math.random() * 1000),
          nombre_task: task.name,
          fecha,
          hora,
        };
        setTaskList([...taskList, newTask]);
        return;
      }
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
  const deleteTask = async (task) => {
    if (!user) {
      setTaskDeleted([...taskDeleted, task]);
      setTaskList(taskList.filter((t) => t.id_task !== task.id_task));
      return;
    }
    try {
      const deleteTaskFetch = await fetch("/api/task/deleteTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, user }),
      });
      const allTasks = await deleteTaskFetch.json();
      setTaskList(allTasks.tasks);
      Swal.fire({
        icon: "success",
        title: "Task deleted",
        text: `The task ${task.nombre_task} has been deleted`,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error deleting task ${task.nombre_task}`,
      });
    }
    setTaskDeleted([...taskDeleted, task]);
  };
  const completeTask = async (task) => {
    if (!user) {
      const fecha_completada = new Date().toISOString().split("T")[0];
      const hora_completada = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const newTaskComplete = {
        id_task: task.id_task,
        nombre_task_completed: task.nombre_task,
        fecha: task.fecha,
        hora: task.hora,
        fecha_completada,
        hora_completada,
      };
      setTaskCompleted([...taskCompleted, newTaskComplete]);
      setTaskList(taskList.filter((t) => t.id_task !== task.id_task));
      return;
    }
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
      setTaskList(allTasks.tasks);
      setTaskCompleted(allTasks.tasksCompleted);
    } catch (error) {
      console.error("Error completing task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error completing task ${task.nombre_task}`,
      });
    }
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
