import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Buttom/Buttom";

export default function Register() {
  const [newUser, setNewUser] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(newUser));
  };
  return (
    <>
      <div className="container-fluid d-flex flex-column justify-content-center bg-dark text-light vh-100">
        <div className="container">
          <h1 className="text-center">Register</h1>
          <form className="form-group text-center" onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start bg-secondary text-light">
              <div className="col-4 mb-3">
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
              <div className="col-4 mb-3">
                <label htmlFor="username" className="label-form p-2">
                  Username :
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="" className="label-form p-2">
                  Password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mb-3">
                <label htmlFor="" className="label-form p-2">
                  Confirm Password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setNewUser({ ...newUser, confirmPassword: e.target.value })
                  }
                />
              </div>
              <div className="col-4 mb-3">
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
