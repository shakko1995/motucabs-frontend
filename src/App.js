

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FriendsAndFamilyPage from "./pages/FriendsAndFamilyPage";
import ArmedForcesPage from "./pages/ArmedForcesPage";
import StudentsProgramPage from "./pages/StudentsProgramPage";
import SeniorCitizensProgramPage from "./pages/SeniorCitizensProgramPage";
import WhiteLabelPage from "./pages/WhiteLabelPage";
import SaaSPage from "./pages/SaaSPage";
import FleetDetailPage from "./pages/FleetDetailPage";
import FleetPage from "./pages/FleetPage";
import ServicesPage from "./pages/ServicesPage";
import AirportTransfersPage from "./pages/AirportTransfersPage";
import PointToPointPage from "./pages/PointToPointPage";
import PlannedItinerariesPage from "./pages/PlannedItinerariesPage";
import HourlyServicePage from "./pages/HourlyServicePage";
import ConciergePage from "./pages/ConciergePage";
import MeetAndAssistPage from "./pages/MeetAndAssistPage";
import EventSolutionsPage from "./pages/EventSolutionsPage";
import ReviewsPage from "./pages/ReviewsPage";
import DriverPage from "./pages/DriverPage";
import PartnersPage from "./pages/PartnersPage";
import TravellerPartner from "./pages/TravellerPartner";
import CrossPerformNetwork from "./pages/CrossPerformNetwork";
import ManagePages from "./admin/ManagePages";
import DynamicPage from "./pages/DynamicPage";
import Sitemap from "./pages/Sitemap";
import AirportDetail from "./pages/AirportDetail";
import ManageAirportsSiteMap from "./admin/ManageAirportsSiteMap";
import CarRentalDetail from "./pages/CarRentalDetail";
import OutstationDetailPage from "./pages/OutstationDetailPage";
import PopularRouteDetailPage from "./pages/PopularRouteDetailPage";



// Admin
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";


import "./index.css";

function App() {
  return (
    <HelmetProvider> 
      <AuthProvider>
        <AdminProvider>
          <BrowserRouter>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<HomePage />} />
              

              
              <Route path="/rental-cabs" element={<RentalCabs />} />
              <Route path="/outstation-cabs" element={<OutstationCabs />} />
              <Route path="/airport-cabs" element={<AirportCabs />} />
              <Route path="/outstation-roundtrip-cabs" element={<OutstationRoundTripCabs />} />
              <Route path="/review-booking" element={<ReviewBooking />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/friends-and-family" element={<FriendsAndFamilyPage />} />
              <Route path="/armed-forces" element={<ArmedForcesPage />} />
              <Route path="/students-program" element={<StudentsProgramPage />} />
              <Route path="/senior-citizens-program" element={<SeniorCitizensProgramPage />} />
              <Route path="/white-label" element={<WhiteLabelPage />} />
              <Route path="/saas" element={<SaaSPage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/fleet/:carType" element={<FleetDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/airport-transfers" element={<AirportTransfersPage />} />
              <Route path="/point-to-point" element={<PointToPointPage />} />
              <Route path="/itineraries" element={<PlannedItinerariesPage />} />
              <Route path="/hourly-service" element={<HourlyServicePage />} />
              <Route path="/concierge" element={<ConciergePage />} />
              <Route path="/meet-and-assist" element={<MeetAndAssistPage />} />
              <Route path="/event-solutions" element={<EventSolutionsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/confirm-ride" element={<ConfirmRide />} />
              <Route path="/drive-with-us" element={<DriverPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/travel-agents" element={<TravellerPartner />} />
              <Route path="/cross-promotion" element={<CrossPerformNetwork />} />
              <Route path="/manage-pages" element={<ManagePages />} />
              <Route path="/page/:slug" element={<DynamicPage />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/airport/:slug" element={<AirportDetail />} />
              <Route path="/manage-airports" element={<ManageAirportsSiteMap />} />
              <Route path="/car-rentals/:slug" element={<CarRentalDetail />} />
              <Route path="/outstation-cabs/:slug" element={<OutstationDetailPage />} />
              <Route path="/book-taxi/:slug" element={<PopularRouteDetailPage />} />


              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;



