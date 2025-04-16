import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Routes, Route } from "react-router";
import TodoApp from "./components/TodoApp.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<TodoApp />} />
    </Routes>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent></AppContent>
    </TaskProvider>
  );
}

export default App;
