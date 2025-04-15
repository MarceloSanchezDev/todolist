import { useState } from "react";

export default function Register(params) {
  const [newUser, setNewUser] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(newUser));
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center">Register</h1>
        <form className="form-group text-center" onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start">
            <div className="col-4">
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
            <div className="col-4">
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
            <div className="col-4">
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
            <div className="col-4">
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
            <div className="col-4">
              <button type="submit" className="btn btn-success mt-3">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
