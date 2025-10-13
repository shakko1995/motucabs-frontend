

import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import all your view components
import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import SearchHistoryTable from "./SearchHistoryTable";
import ManageRentals from "./ManageRentals";
import ManageOutstation from "./ManageOutstation";
import ManageAirports from "./ManageAirports";
import ManageOutstationRoundTrip from "./ManageOutstationRoundTrip";
import ManagePages from './ManagePages'; // For the CMS
import BusinessSubmissions from './BusinessSubmissions';
import PartnerSubmissions from './PartnerSubmissions';
import DriverApplications from './DriverApplications';
import TravelAgentSubmissions from './TravelAgentSubmissions';
import ManageAirportsSiteMap from './ManageAirportsSiteMap';
import ManageCarRentals from './ManageCarRentals';
import ManageOutstationsSiteMap from './ManageOutstationsSiteMap';
import ManagePopularRoutes from './ManagePopularRoutes';
import AllBookingsTable from "./AllBookingsTable";
import ManageJobs from './ManageJobs';
import JobApplications from './JobApplications';
import ManageNews from "./ManageNews";
import ManageBlog from './ManageBlog';
import ManageFAQ from "./ManageFAQ";
import ManagePackages from './ManagePackages';
import ManageOneWayRoutes from './ManageOneWayRoutes';
import ManageDriverPartners from "./ManageDriverPartners";
import ManageVendorPartners from "./ManageVendorPartners";
import ManageCarAttachments from "./ManageCarAttachments";
import ManageTempoTraveller from "./ManageTempoTraveller";
import ManageTempoTravellerRoutes from "./ManageTempoTravellerRoutes";
import HeroSubmissions from './HeroSubmissions';






// Import icons
import { Users, PackagePlus, Star, UserCheck, History, Newspaper, LogOut, Briefcase, Map, Car, BookMarked, LayoutDashboard, Package, Route, Plane, Repeat, UserPlus, FileText, FilePlus } from 'lucide-react';

// Reusable NavButton component for clean code
const NavButton = ({ viewName, activeView, setActiveView, icon: Icon, children }) => (
  <li className="mt-2">
    <button
      onClick={() => setActiveView(viewName)}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${activeView === viewName
        ? 'bg-blue-600 text-white shadow-lg'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }`}
    >
      <Icon className="mr-3" size={20} strokeWidth={2} />
      <span>{children}</span>
    </button>
  </li>
);

export default function Dashboard() {
  const { logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('users');

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/admin/logout");
      logoutAdmin();
      navigate("/admin/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const renderContent = () => {
    switch (activeView) {
      // Main Management
      case 'users': return <UsersTable />;
      case 'reviews': return <ReviewsTable />;
      case 'searchHistory': return <SearchHistoryTable />;

      // CMS
      case 'managePages': return <ManagePages />;

      // Package Management
      case 'rentals': return <ManageRentals />;
      case 'outstation': return <ManageOutstation />;
      case 'airports': return <ManageAirports />;
      case 'roundtrips': return <ManageOutstationRoundTrip />;

      // Form Submissions
      case 'businessInquiries': return <BusinessSubmissions />;
      case 'partnerApplications': return <PartnerSubmissions />;
      case 'driverApplications': return <DriverApplications />;
      case 'travelAgentApplications': return <TravelAgentSubmissions />;
      case 'jobApplications': return <JobApplications />;


      // SiteMap Section
      case 'manageAirportSitemap': return <ManageAirportsSiteMap />;
      case 'carRentals': return <ManageCarRentals />;
      case 'outstationSitemap': return <ManageOutstationsSiteMap />;
      case 'popularRoutes': return <ManagePopularRoutes />;

      // All Bookings
      case 'allBookings': return <AllBookingsTable />;

      // job
      case 'manageJobs': return <ManageJobs />;
      case 'manageNews': return <ManageNews />;
      case 'manageBlog': return <ManageBlog />;
      case 'manageFAQ': return <ManageFAQ />;
      case 'manageTourPackages': return <ManagePackages />;
      case 'oneWayRoutes': return <ManageOneWayRoutes />;
      case 'driverPartners': return <ManageDriverPartners />;
      case 'vendorPartners': return <ManageVendorPartners />;
      case 'carAttachments': return <ManageCarAttachments />;
      case 'tempoTraveller': return <ManageTempoTraveller />;
      case 'tempoTravellerRoutes': return <ManageTempoTravellerRoutes />;
      case 'heroSubmissions': return <HeroSubmissions />;




      default: return <UsersTable />;
    }
  };

  const getTitle = () => {
    const titles = {
      users: "Users Management",
      reviews: "Reviews Management",
      searchHistory: "Search History",
      managePages: "Manage Custom Pages",
      rentals: "Rental Packages Management",
      outstation: "Outstation Packages Management",
      airports: "Airport Packages Management",
      roundtrips: "Outstation Round Trips",
      businessInquiries: "Business Inquiries",
      partnerApplications: "Partner & Reseller Applications",
      driverApplications: "Driver Applications",
      travelAgentApplications: "Travel Agent Applications",

      manageAirports: "Manage Airports Sitemap",
      carRentals: "Manage Car Rentals",
      outstationSitemap: "Manage Outstation Sitemap",
      popularRoutes: "Manage Popular Routes",
      allBookings: "All Bookings",
      manageJobs: "Manage Job Postings",
      jobApplications: "Job Applications",
      manageNews: "Manage News",
      manageBlog: "Manage Blog",
      manageFAQ: "Manage FAQ",
      manageTourPackages: "Manage Tour Packages",
      oneWayRoutes: "Manage One-Way Routes",
      driverPartners: "Manage Driver Partners",
      vendorPartners: "Manage Vendor Partners",
      carAttachments: "Manage Car Attachments",
      tempoTraveller: "Manage Tempo Traveller",
      tempoTravellerRoutes: "Manage Tempo Traveller Routes",
      heroSubmissions: "Hero Form Submissions",

    };
    return titles[activeView] || "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <LayoutDashboard className="text-blue-400" size={28} />
          <h1 className="ml-3 text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Management Section */}
          <h3 className="px-4 mb-2 text-xs font-semibold uppercase text-gray-500">Content & Users</h3>
          <ul className="space-y-1">
            <NavButton viewName="users" icon={Users} activeView={activeView} setActiveView={setActiveView}>All Users</NavButton>
            <NavButton viewName="reviews" icon={Star} activeView={activeView} setActiveView={setActiveView}>Reviews</NavButton>
            <NavButton viewName="searchHistory" icon={History} activeView={activeView} setActiveView={setActiveView}>Search History</NavButton>
            <NavButton viewName="managePages" icon={FilePlus} activeView={activeView} setActiveView={setActiveView}>Manage Pages</NavButton>
          </ul>

          {/* Package Management Section */}
          <h3 className="px-4 mt-6 mb-2 text-xs font-semibold uppercase text-gray-500">Package Management</h3>
          <ul className="space-y-1">
            <NavButton viewName="rentals" icon={Package} activeView={activeView} setActiveView={setActiveView}>Manage Rentals</NavButton>
            <NavButton viewName="outstation" icon={Route} activeView={activeView} setActiveView={setActiveView}>Manage Outstation</NavButton>
            <NavButton viewName="airports" icon={Plane} activeView={activeView} setActiveView={setActiveView}>Manage Airports</NavButton>
            <NavButton viewName="roundtrips" icon={Repeat} activeView={activeView} setActiveView={setActiveView}>Manage Round Trips</NavButton>
          </ul>

          {/* Form Submissions Section */}
          <h3 className="px-4 mt-6 mb-2 text-xs font-semibold uppercase text-gray-500">Form Submissions</h3>
          <ul className="space-y-1">
            <NavButton viewName="businessInquiries" icon={Briefcase} activeView={activeView} setActiveView={setActiveView}>Business Inquiries</NavButton>
            <NavButton viewName="partnerApplications" icon={Users} activeView={activeView} setActiveView={setActiveView}>Partner Apps</NavButton>
            <NavButton viewName="driverApplications" icon={UserPlus} activeView={activeView} setActiveView={setActiveView}>Driver Apps</NavButton>
            <NavButton viewName="travelAgentApplications" icon={FileText} activeView={activeView} setActiveView={setActiveView}>Travel Agent Apps</NavButton>
          </ul>
          <h3 className="px-4 mt-6 mb-2 text-xs font-semibold uppercase text-gray-500">Sitemap Management</h3>
          <ul className="space-y-1">

            <NavButton viewName="manageAirportSitemap" icon={Map} activeView={activeView} setActiveView={setActiveView}>Airport Sitemap</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="carRentals" icon={Car} activeView={activeView} setActiveView={setActiveView}>Car Rentals</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="outstationSitemap" icon={Map} activeView={activeView} setActiveView={setActiveView}>Outstation Sitemap</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="popularRoutes" icon={Map} activeView={activeView} setActiveView={setActiveView}>Popular Routes</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="allBookings" icon={BookMarked} activeView={activeView} setActiveView={setActiveView}>All Bookings</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="manageJobs" icon={Briefcase} activeView={activeView} setActiveView={setActiveView}>Manage Jobs  </NavButton>

          </ul>
          <ul className="space-y-1">
            <NavButton viewName="jobApplications" icon={Briefcase} activeView={activeView} setActiveView={setActiveView}>Job Applications</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="manageNews" icon={Newspaper} activeView={activeView} setActiveView={setActiveView}>Manage News</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="manageBlog" icon={FileText} activeView={activeView} setActiveView={setActiveView}>Manage Blog</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="manageFAQ" icon={UserCheck} activeView={activeView} setActiveView={setActiveView}>Manage FAQ</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="manageTourPackages" icon={PackagePlus} activeView={activeView} setActiveView={setActiveView}>Tour Packages</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="oneWayRoutes" icon={Route} activeView={activeView} setActiveView={setActiveView}>One-Way Routes</NavButton>
          </ul>
          <ul className="space-y-1">
            
              <NavButton
                viewName="driverPartners"
                icon={UserCheck}
                activeView={activeView}
                setActiveView={setActiveView}
              >
                Driver Partners
              </NavButton>
           
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="vendorPartners" icon={Users} activeView={activeView} setActiveView={setActiveView}>Vendor Partners</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="carAttachments" icon={Car} activeView={activeView} setActiveView={setActiveView}>Car Attachments</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="tempoTraveller" icon={Car} activeView={activeView} setActiveView={setActiveView}>Tempo Traveller</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="tempoTravellerRoutes" icon={Route} activeView={activeView} setActiveView={setActiveView}>Tempo Traveller Routes</NavButton>
          </ul>
          <ul className="space-y-1">
            <NavButton viewName="heroSubmissions" icon={FileText} activeView={activeView} setActiveView={setActiveView}>Hero Form Submissions</NavButton>
          </ul>


        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
          <button onClick={handleLogout} className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
            <LogOut className="mr-2" size={18} />
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