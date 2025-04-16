import { useNavigate } from "react-router";
import Button from "../Buttom/Buttom.jsx";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <Button
        bootstrapClass={"btn btn-primary me-2"}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
      <Button
        bootstrapClass={"btn btn-secondary me-2"}
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
    </div>
  );
}
