import { useTaskContext } from "../../context/TaskContext.jsx";
import Task from "./Task.jsx";

export default function TasksDeleted() {
  const { taskDeleted } = useTaskContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      <h2 className="text-danger">Tasks Deleted</h2>
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        {taskDeleted.length > 0 ? (
          taskDeleted.map((task) => {
            return (
              <Task key={task.id_task}>
                <h3 className="text-primary">{task.task_name}</h3>
                <p className="text-danger ">
                  <i>Deleted</i>
                </p>
              </Task>
            );
          })
        ) : (
          <div>
            <h3 className="text-warning">No tasks Deleted</h3>
          </div>
        )}
      </div>
    </div>
  );
}
