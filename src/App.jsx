import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { Routes, Route } from "react-router";
import TodoApp from "./components/TodoApp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<TodoApp />} />
    </Routes>
  );
}

export default App;
