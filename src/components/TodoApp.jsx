import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "./Buttom";

export default function TodoApp() {
  const [taskList, setTaskList] = useState([]);
  console.log(taskList);
  return (
    <div className="container">
      <h1 className="text-center">TO-DO APP</h1>
      <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
        <h2>Tasks</h2>
        <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
          {taskList.length > 0 ? (
            taskList.map((task, index) => {
              return (
                <Task key={index}>
                  <h3 className="text-info">{task.name}</h3>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button bootstrapClass={"btn btn-danger m-1"}>
                      delete task
                    </Button>
                    <Button bootstrapClass={"btn btn-success m-1"}>
                      complete task
                    </Button>
                  </div>
                </Task>
              );
            })
          ) : (
            <div className="mb-3">
              <h3 className="text-warning">No tasks available</h3>
            </div>
          )}

          <TaskForm setTaskList={setTaskList} />
        </div>
      </div>
      <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
        <h2>Tasks Complete</h2>
        <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
          <Task>
            <h3 className="text-info">Task Complete</h3>
          </Task>
        </div>
      </div>
    </div>
  );
}
