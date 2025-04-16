import NewTasks from "./newTasks";
import TasksCompleted from "./TasksCompleted";
import TasksDeleted from "./TasksDeleted";

export default function TodoApp() {
  return (
    <div className="container-fluid  bg-black text-white p-3 vh-100">
      <div className="container">
        <h1 className="text-center m-2">TO-DO APP</h1>
        {/*new tasks */}
        <NewTasks></NewTasks>
        {/* Completed Tasks Section */}
        <TasksCompleted />
        {/* Task Deleted */}
        <TasksDeleted />
      </div>
    </div>
  );
}
