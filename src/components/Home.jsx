import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="text-center">Home</h1>
      <p className="text-center">Welcome to the Home page!</p>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Login
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
