import { useState } from "react";
import Button from "../Buttom/Buttom.jsx";

export default function TaskForm({ setTaskList }) {
  const [task, setTask] = useState({ name: "", completed: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length > 4) {
      setTaskList((prevTasks) => [...prevTasks, task]);
      setTask({ name: "", completed: false });
    } else {
      console.log("la terea no puede ser menor a 4 caracteres");
    }
  };
  return (
    <form className="row mb-3 w-100 " onSubmit={handleSubmit}>
      <input
        type="text"
        className="rounded me-2  col col-sm-8"
        placeholder="Add new task"
        onChange={(e) => {
          setTask({ ...task, name: e.target.value });
        }}
        value={task.name}
      />
      <Button type={"submit"} bootstrapClass={"btn btn-primary col"}>
        Add Task
      </Button>
    </form>
  );
}
