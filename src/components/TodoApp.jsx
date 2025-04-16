import Auth from "./Auth";
import NewTasks from "./newTasks";
import TasksCompleted from "./TasksCompleted";
import TasksDeleted from "./TasksDeleted";

export default function TodoApp() {
  return (
    <div className="container-fluid  bg-black text-white p-3 vh-100">
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
