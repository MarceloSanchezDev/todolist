import { useTaskContext } from "../context/TaskContext";
import Task from "./Task";

export default function TasksCompleted() {
  const { taskCompleted } = useTaskContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      <h2 className="text-success">Tasks Completed</h2>
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        {taskCompleted.length > 0 ? (
          taskCompleted.map((task, index) => {
            return (
              <Task key={index}>
                <h3 className="text-primary">{task.name}</h3>
                <p className="text-success ">
                  <i>Completed</i>
                </p>
              </Task>
            );
          })
        ) : (
          <div>
            <h3 className="text-warning">No tasks Completed</h3>
          </div>
        )}
      </div>
    </div>
  );
}
