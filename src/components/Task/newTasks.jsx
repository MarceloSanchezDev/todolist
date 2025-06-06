import { useTaskContext } from "../../context/TaskContext.jsx";
import Task from "./Task.jsx";
import TaskForm from "./TaskForm.jsx";
import Button from "../Buttom/Buttom.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

export default function NewTasks() {
  const { taskList, deleteTask, completeTask } = useTaskContext();
  const { user } = useAuthContext();
  return (
    <div className="border border-2 rounded p-3 mb-3 bg-dark text-white">
      {user ? <h2>Tasks of {user.username}</h2> : <h2>Tasks</h2>}
      <div className="d-flex flex-column justify-content-between rounded align-items-center m-3">
        <TaskForm />
        {taskList && taskList.length > 0 ? (
          taskList.map((task) => {
            return (
              <Task key={task.id_task}>
                <h3 className="text-primary">{task.nombre_task}</h3>
                <div>
                  <p className="text-warning ">
                    <i>Created on: {task.fecha}</i>
                  </p>
                  <p className="text-warning ">
                    <i>Created at: {task.hora}</i>
                  </p>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <Button
                    bootstrapClass={"btn btn-danger m-1"}
                    onClick={() => deleteTask(task)}
                  >
                    delete task
                  </Button>
                  <Button
                    bootstrapClass={"btn btn-success m-1"}
                    onClick={() => completeTask(task)}
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
