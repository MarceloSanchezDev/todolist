import { useTaskContext } from "../../context/TaskContext";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "../Buttom/Buttom";
import { useAuthContext } from "../../context/AuthContext";

export default function NewTasks() {
  const { taskList, deleteTask, completeTask } = useTaskContext();
  const { user } = useAuthContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      {user ? <h2>Tasks of {user.username}</h2> : <h2>Tasks</h2>}
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        <TaskForm />
        {taskList.length > 0 ? (
          taskList.map((task, index) => {
            return (
              <Task key={index}>
                <h3 className="text-primary">{task.name}</h3>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <Button
                    bootstrapClass={"btn btn-danger m-1"}
                    onClick={() => deleteTask(index, task)}
                  >
                    delete task
                  </Button>
                  <Button
                    bootstrapClass={"btn btn-success m-1"}
                    onClick={() => completeTask(index, task)}
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
