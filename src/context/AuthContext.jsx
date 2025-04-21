import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (userData, url) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
      if (res) {
        console.log(res);
        Swal.fire({
          title: `${res.message}`,
          text: `Welcome ${res.nombre} ${res.apellido}!`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setUser({
          token: res.token,
          username: res.username,
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          id: res.id,
        });
      }
    } catch (error) {
      console.log(error);
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
