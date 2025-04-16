import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import TodoApp from "./components/Pages/TodoApp.jsx";
import Register from "./components/Pages/Register.jsx";
import { Routes, Route } from "react-router";
import { TaskProvider } from "./context/TaskContext.jsx";
import { AuthProvider, useAuthContext } from "./context/AuthContext.jsx";
import "./App.css";

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
    <AuthProvider>
      <TaskProvider>
        <AppContent></AppContent>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
