import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState([]);
  const [taskDeleted, setTaskDeleted] = useState([]);

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        taskCompleted,
        setTaskCompleted,
        taskDeleted,
        setTaskDeleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
