import { useTaskContext } from "../../context/TaskContext.jsx";
import Task from "./Task.jsx";

export default function TasksCompleted() {
  const { taskCompleted } = useTaskContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      <h2 className="text-success">Tasks Completed</h2>
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        {taskCompleted && taskCompleted.length > 0 ? (
          taskCompleted.map((task) => {
            return (
              <Task key={task.id_task_completed}>
                <h3 className="text-primary">{task.nombre_task_completed}</h3>
                <div className="d-flex flex-lg-row flex-column justify-content-center rounded align-items-center ">
                  <div className="d-flex flex-lg-column flex-row justify-content-center rounded align-items-center m-1 ">
                    <p className="text-warning ">
                      <i>Created on: {task.fecha}</i>
                    </p>
                    <p className="text-warning ">
                      <i>Created at: {task.hora}</i>
                    </p>
                  </div>
                  <div className="d-flex flex-lg-column flex-row justify-content-center rounded align-items-center m-1">
                    <p className="text-success ">
                      <i>Completed on: {task.fecha_completada}</i>
                    </p>
                    <p className="text-success ">
                      <i>Completed at: {task.hora_completada}</i>
                    </p>
                  </div>
                  <p className="text-success ">
                    <i>Completed</i>
                  </p>
                </div>
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
