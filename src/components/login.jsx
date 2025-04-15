import { useState } from "react";

export default function Login(params) {
  const [user, setUser] = useState({
    username: null,
    password: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.entries(user));
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center">Login</h1>
        <form className="form-group text-center" onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-center align-items-center border rounded flex-column text-start">
            <div className="col-4 mb-3">
              <label htmlFor="username" className="form-label p-2">
                Username :
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="col-4 mb-3">
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
