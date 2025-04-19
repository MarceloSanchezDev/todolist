import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    Swal.fire({
      title: "Login",
      text: `Welcome ${userData.username}!`,
      icon: "success",
      confirmButtonText: "OK",
    });
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
