import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext"; 

import Login from "./pages/Login";
import ConfirmRide from "./pages/ConfirmRide";

import HomePage from "./pages/HomePage";

// ✅ Admin Components
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";

import "./index.css";

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <BrowserRouter>
          <Routes>
            {/* ✅ User Routes */}
           <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/confirm-ride" element={<ConfirmRide />} />

            {/* ✅ Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;


