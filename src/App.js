import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";

import Login from "./pages/Login";
import ConfirmRide from "./pages/ConfirmRide";

import HomePage from "./pages/HomePage";
import RentalCabs from "./pages/RentalCabs";
import OutstationCabs from "./pages/OutstationCabs";
import AirportCabs from "./pages/AirportCabs";
import OutstationRoundTripCabs from "./pages/OutstationRoundTripCabs";
import ReviewBooking from "./pages/ReviewBooking";

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
            <Route path="/rental-cabs" element={<RentalCabs />} />
            <Route path="/outstation-cabs" element={<OutstationCabs />} />
            <Route path="/airport-cabs" element={<AirportCabs />} />
            <Route path="/outstation-roundtrip-cabs" element={<OutstationRoundTripCabs />} />
            <Route path="/review-booking" element={<ReviewBooking />} />

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


