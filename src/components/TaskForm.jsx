import { useState } from "react";
import Button from "./Buttom";

export default function TaskForm({ setTaskList }) {
  const [task, setTask] = useState({ name: "", completed: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskList((prevTasks) => [...prevTasks, task]);
    setTask({ name: "", completed: false });
  };
  return (
    <form
      className="d-flex flex-row justify-content-center align-items-center mb-3 w-100 row"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form-control col me-2"
        placeholder="Add new task"
        onChange={(e) => {
          setTask({ ...task, name: e.target.value });
        }}
        value={task.name}
      />
      <Button type={"submit"} bootstrapClass={"btn btn-primary col-1"}>
        Add Task
      </Button>
    </form>
  );
}
