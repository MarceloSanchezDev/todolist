import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Buttom";

export default function Login() {
  const [user, setUser] = useState({
    username: null,
    password: null,
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(user));
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center vh-100 bg-dark text-light">
        <div className="container">
          <h1 className="text-center">Login</h1>
          <form className="form-group text-center " onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start bg-secondary text-light">
              <div className="col-4 mb-3">
                <label htmlFor="username" className="form-label p-2">
                  Username :
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="password" className="form-label p-2">
                  Password :
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mb-3">
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
