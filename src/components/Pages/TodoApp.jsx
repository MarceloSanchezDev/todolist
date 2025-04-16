import Auth from "../Auth/Auth.jsx";
import NewTasks from "../Task/newTasks.jsx";
import TasksCompleted from "../Task/TasksCompleted.jsx";
import TasksDeleted from "../Task/TasksDeleted.jsx";

export default function TodoApp() {
  return (
    <div className="container-fluid  bg-black text-white p-3 min-vh-100">
      <div className="container">
        <div className="d-flex flex-row justify-content-between align-items-center mb-3">
          <h1 className="text-center m-2">✅ TO-DO APP!</h1>
          <Auth></Auth>
        </div>

        <NewTasks></NewTasks>

        <TasksCompleted />

        <TasksDeleted />
      </div>
    </div>
  );
}
