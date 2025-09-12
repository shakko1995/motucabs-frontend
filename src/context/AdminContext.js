// src/context/AdminContext.js
import { createContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  const loginAdmin = (token) => {
    setAdminToken(token);
    localStorage.setItem("adminToken", token);
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem("adminToken");
    window.location.href = "/adminLogin"; // Redirect on logout
  };

  return (
    <AdminContext.Provider value={{ adminToken, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
