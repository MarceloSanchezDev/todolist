import { useTaskContext } from "../../context/TaskContext";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "../Buttom/Buttom";

export default function NewTasks() {
  const {
    taskList,
    setTaskList,
    setTaskCompleted,
    setTaskDeleted,
    taskDeleted,
    taskCompleted,
  } = useTaskContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      <h2>Tasks</h2>
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        <TaskForm setTaskList={setTaskList} />
        {taskList.length > 0 ? (
          taskList.map((task, index) => {
            return (
              <Task key={index}>
                <h3 className="text-primary">{task.name}</h3>
                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    bootstrapClass={"btn btn-danger m-1"}
                    onClick={() => {
                      setTaskDeleted([...taskDeleted, task]);
                      setTaskList(taskList.filter((_, i) => i !== index));
                    }}
                  >
                    delete task
                  </Button>
                  <Button
                    bootstrapClass={"btn btn-success m-1"}
                    onClick={() => {
                      setTaskCompleted([...taskCompleted, task]);
                      setTaskList(taskList.filter((_, i) => i !== index));
                    }}
                  >
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
      </div>
    </div>
  );
}
