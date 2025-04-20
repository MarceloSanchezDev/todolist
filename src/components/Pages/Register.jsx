import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Button from "../Buttom/Buttom";

export default function Register() {
  const [newUser, setNewUser] = useState({
    email: null,
    name: null,
    lastname: null,
    username: null,
    password: null,
    confirmPassword: null,
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
    login(newUser, "/api/auth/register");
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center bg-dark text-light min-vh-100">
        <div className="container">
          <h1 className="text-center">Register</h1>
          <form className="form-group text-center" onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start bg-secondary text-light">
              <div className="col-sm-4 mb-3">
                <label htmlFor="email" className="label-form p-2">
                  E-mail :
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <label htmlFor="name" className="label-form p-2">
                  Name :
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <label htmlFor="lastname" className="label-form p-2">
                  Lastname :
                </label>
                <input
                  id="lastname"
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastname: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <label htmlFor="username" className="label-form p-2">
                  Username :
                </label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <label htmlFor="password" className="label-form p-2">
                  Password :
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <label htmlFor="confirmPassword" className="label-form p-2">
                  Confirm Password :
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                />
              </div>
              <div className="col-sm-4  mb-3">
                <Button type={"submit"} bootstrapClass={"btn btn-success"}>
                  Register
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
