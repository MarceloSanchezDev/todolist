import Button from "./Buttom";

export default function TaskForm({ setTask, handleSubmit, task }) {
  return (
    <form
      className="d-flex flex-column justify-content-center align-items-center mb-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Add new task"
        onChange={(e) => {
          setTask(e.target.value);
        }}
        value={task}
      />
      <Button type={"submit"} bootstrapClass={"btn btn-primary mt-2"}>
        Add Task
      </Button>
    </form>
  );
}
