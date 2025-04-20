import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchtest = async () => {
      try {
        const response = await fetch("/api/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "test" }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchtest();
  }, [user]);
  const login = async (userData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => res.json());
      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
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
