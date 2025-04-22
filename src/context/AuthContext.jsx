import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
//import { useFetch } from "../hooks/useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  console.log(user, token);
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);
  const login = async (userData, url) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        throw new Error(res.message);
      }
      const resData = await res.json();
      const { token, ...user } = resData;
      setToken(token);
      setUser(user);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      Swal.fire({
        title: `${res.message}`,
        text: `Welcome ${res.nombre} ${res.apellido}!`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: `Error :${error.message}`,
        text: "Invalid credentials",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
    Swal.fire({
      title: "Logout",
      text: "You have logged out successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
