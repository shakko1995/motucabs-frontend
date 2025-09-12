// src/admin/Dashboard.js
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const { logoutAdmin } = useContext(AdminContext);
   const { logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout"); 
      logout(); 
      navigate("/admin/login"); 
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <UsersTable />
      <ReviewsTable />
    </div>
  );
}
