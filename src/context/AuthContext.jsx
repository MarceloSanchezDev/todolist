import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [user, setUser] = useState(sessionStorage.getItem("user") || null);

  const login = async (userData, url) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
      if (!res.ok) {
        throw new Error(res.message);
      }
      Swal.fire({
        title: `${res.message}`,
        text: `Welcome ${res.nombre} ${res.apellido}!`,
        icon: "success",
        confirmButtonText: "OK",
      });
      setUser({
        username: res.username,
        nombre: res.nombre,
        apellido: res.apellido,
        email: res.email,
        id: res.id,
      });
      setToken(res.token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
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
