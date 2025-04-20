import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../Buttom/Buttom";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    username: null,
    password: null,
  });
  const { login, user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(userLogin));
    login(userLogin, "/api/auth/login");
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center min-vh-100 bg-dark text-light">
        <div className="container">
          <h1 className="text-center">Login</h1>
          <form className="form-group text-center " onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start bg-secondary text-light">
              <div className="col-sm-4 mb-3">
                <label htmlFor="username" className="form-label p-2">
                  Username :
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, username: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4 mb-3">
                <label htmlFor="password" className="form-label p-2">
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, password: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4 mb-3">
                <Button type={"submit"} bootstrapClass={"btn btn-success"}>
                  Login
                </Button>
              </div>
            </div>
          </form>
          <div className="row d-flex justify-content-center align-items-center flex-column text-start mt-3">
            <Button
              bootstrapClass={"btn btn-primary col-4"}
              onClick={() => navigate("/")}
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
