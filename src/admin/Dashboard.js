


import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import SearchHistoryTable from "./SearchHistoryTable";
import ManageRentals from "./ManageRentals";
import ManageOutstation from "./ManageOutstation";
import ManageAirports from "./ManageAirports";
import ManageOutstationRoundTrip from "./ManageOutstationRoundTrip";
import BusinessSubmissions from './BusinessSubmissions';
import PartnerSubmissions from './PartnerSubmissions';
import DriverApplications from './DriverApplications';
import TravelAgentSubmissions from './TravelAgentSubmissions';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, Star, History, LogOut, LayoutDashboard, Package, Route, Plane,Repeat,UserPlus,Briefcase } from 'lucide-react';

export default function Dashboard() {
  const { logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('users');

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout");
      logoutAdmin();
      navigate("/adminLogin");
    } catch (err) {
      alert("Logout failed");
    }
  };


  const renderContent = () => {
    switch (activeView) {
      case 'users': return <UsersTable />;
      case 'reviews': return <ReviewsTable />;
      case 'searchHistory': return <SearchHistoryTable />;
      case 'rentals': return <ManageRentals />;
      case 'outstation': return <ManageOutstation />;
      case 'airports': return <ManageAirports />;
      case 'roundtrips': return <ManageOutstationRoundTrip />;
      case 'businessInquiries': return <BusinessSubmissions />;
      case 'partnerApplications': return <PartnerSubmissions />;
      case 'driverApplications': return <DriverApplications />;
      case 'travelAgentApplications': return <TravelAgentSubmissions />;
      default: return <UsersTable />;
    }
  };

  const getTitle = () => {
    switch (activeView) {
      case 'users': return "Users Management";
      case 'reviews': return "Reviews Management";
      case 'searchHistory': return "Search History";
      case 'rentals': return "Rental Packages Management";
      case 'outstation': return "Outstation Packages Management";
      case 'airports': return "Airport Packages Management";
      case 'roundtrips': return "Outstation Round Trips";
      case 'businessInquiries': return "Business Inquiries";
      case 'partnerApplications': return "Partner & Reseller Applications";
      case 'driverApplications': return "Driver Applications";
      case 'travelAgentApplications': return "Travel Agent / Partner Applications";
      default: return "Dashboard";
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <LayoutDashboard className="text-blue-400" size={28} strokeWidth={2} />
          <h1 className="ml-3 text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul>
            {/* Users Link */}
            <li>
              <button onClick={() => setActiveView('users')} className={`flex items-center w-full px-4 py-3 rounded-lg ... ${activeView === 'users' ? 'bg-blue-600 text-white' : '...'}`}>
                <Users className="mr-3" size={20} strokeWidth={2} />
                <span>All Users</span>
              </button>
            </li>
            {/* Reviews Link */}
            <li className="mt-2">
              <button onClick={() => setActiveView('reviews')} className={`flex items-center w-full px-4 py-3 rounded-lg ... ${activeView === 'reviews' ? 'bg-blue-600 text-white' : '...'}`}>
                <Star className="mr-3" size={20} strokeWidth={2} />
                <span>Reviews</span>
              </button>
            </li>
            {/* Search History Link */}
            <li className="mt-2">
              <button onClick={() => setActiveView('searchHistory')} className={`flex items-center w-full px-4 py-3 rounded-lg ... ${activeView === 'searchHistory' ? 'bg-blue-600 text-white' : '...'}`}>
                <History className="mr-3" size={20} strokeWidth={2} />
                <span>Search History</span>
              </button>
            </li>

            {/* Rental Packages Link */}
            <li className="mt-2">
              <button
                onClick={() => setActiveView('rentals')}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === 'rentals'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Package className="mr-3" size={20} strokeWidth={2} />
                <span>Manage Rentals</span>
              </button>
            </li>
            {/* Outstation Packages Link */}
            <li className="mt-2">
              <button
                onClick={() => setActiveView('outstation')}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === 'outstation'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Route className="mr-3" size={20} strokeWidth={2} />
                <span>Manage Outstation</span>
              </button>
            </li>
            {/*   Manage Aiports */}
            <li className="mt-2">
              <button
                onClick={() => setActiveView('airports')}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === 'airports'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Plane className="mr-3" size={20} strokeWidth={2} />
                <span>Manage Airports</span>
              </button>
            </li>
            {/*  Round Trip  */}
            <li className="mt-2">
              <button
                onClick={() => setActiveView('roundtrips')}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === 'roundtrips'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <Repeat className="mr-3" size={20} strokeWidth={2} />
                <span>Manage Round Trips</span>
              </button>
            </li>
            <li className="mt-2">
              <button onClick={() => setActiveView('businessInquiries')} className={`flex items-center w-full px-4 py-3 rounded-lg ${activeView === 'businessInquiries' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>
                <Briefcase className="mr-3" size={20} />
                <span>Business Inquiries</span>
              </button>
            </li>
            <li className="mt-2">
              <button onClick={() => setActiveView('partnerApplications')} className={`flex items-center w-full px-4 py-3 rounded-lg ${activeView === 'partnerApplications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>
                <Users className="mr-3" size={20} />
                <span>Partner Applications</span>
              </button>
            </li>
            <li className="mt-2">
              <button onClick={() => setActiveView('driverApplications')} className={`flex items-center w-full px-4 py-3 rounded-lg ${activeView === 'driverApplications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>
                <UserPlus className="mr-3" size={20} />
                <span>Driver Applications</span>
              </button>
            </li>
            <li className="mt-2">
              <button onClick={() => setActiveView('travelAgentApplications')} className={`flex items-center w-full px-4 py-3 rounded-lg ${activeView === 'travelAgentApplications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}>
                <Users className="mr-3" size={20} />
                <span>Travel Agent Apps</span>
              </button>
            </li>
          </ul>
        </nav>
        {/* ... (Logout button remains same) ... */}
        <div className="px-4 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="mr-2" size={18} strokeWidth={2.5} />
            Logout
          </button>
        </div>


      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-6 bg-white border-b">
          <h1 className="text-3xl font-bold text-gray-800">{getTitle()}</h1>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}