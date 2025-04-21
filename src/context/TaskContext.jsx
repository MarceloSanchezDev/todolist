import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [taskDeleted, setTaskDeleted] = useState([]);
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
        setTaskList,
        taskList,
        taskCompleted,
        taskDeleted,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
