

// import { useContext, useState } from "react";
// import { AdminContext } from "../context/AdminContext";
// import UsersTable from "./UsersTable";
// import ReviewsTable from "./ReviewsTable";
// import SearchHistoryTable from "./SearchHistoryTable";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Lucide Icons import karein
// import { LayoutDashboard, Users, Star, History, LogOut } from 'lucide-react';

// export default function Dashboard() {
//   const { logoutAdmin } = useContext(AdminContext);
//   const navigate = useNavigate();

//   // State to manage which view is active
//   const [activeView, setActiveView] = useState('users');

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/admin/logout");
//       logoutAdmin();
//       navigate("/adminLogin");
//     } catch (err) {
//       alert("Logout failed");
//     }
//   };
  
//   // Helper function to render the correct table based on activeView state
//   const renderContent = () => {
//     switch (activeView) {
//       case 'users':
//         return <UsersTable />;
//       case 'reviews':
//         return <ReviewsTable />;
//       case 'searchHistory':
//         return <SearchHistoryTable />;
//       default:
//         return <UsersTable />;
//     }
//   };

//   // Helper function for dynamic title
//   const getTitle = () => {
//      switch (activeView) {
//       case 'users':
//         return "Users Management";
//       case 'reviews':
//         return "Reviews Management";
//       case 'searchHistory':
//         return "Search History";
//       default:
//         return "Dashboard";
//     }
//   }

//   return (
//     <div className="flex h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-gray-200 flex flex-col">
//         <div className="flex items-center justify-center h-20 border-b border-gray-700">
//            <LayoutDashboard className="text-blue-400" size={28} strokeWidth={2} />
//            <h1 className="ml-3 text-2xl font-bold">Admin Panel</h1>
//         </div>
//         <nav className="flex-1 px-4 py-6">
//           <ul>
//             {/* Users Link */}
//             <li>
//               <button
//                 onClick={() => setActiveView('users')}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
//                   activeView === 'users'
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//                 }`}
//               >
//                 <Users className="mr-3" size={20} strokeWidth={2} />
//                 <span>All Users</span>
//               </button>
//             </li>
//             {/* Reviews Link */}
//             <li className="mt-2">
//               <button
//                 onClick={() => setActiveView('reviews')}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
//                   activeView === 'reviews'
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//                 }`}
//               >
//                 <Star className="mr-3" size={20} strokeWidth={2} />
//                 <span>Reviews</span>
//               </button>
//             </li>
//             {/* Search History Link */}
//             <li className="mt-2">
//               <button
//                 onClick={() => setActiveView('searchHistory')}
//                 className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
//                   activeView === 'searchHistory'
//                     ? 'bg-blue-600 text-white'
//                     : 'text-gray-400 hover:bg-gray-700 hover:text-white'
//                 }`}
//               >
//                 <History className="mr-3" size={20} strokeWidth={2} />
//                 <span>Search History</span>
//               </button>
//             </li>
//           </ul>
//         </nav>
//         <div className="px-4 py-4 border-t border-gray-700">
//             <button 
//                 onClick={handleLogout} 
//                 className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
//             >
//                 <LogOut className="mr-2" size={18} strokeWidth={2.5}/>
//                 Logout
//             </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="flex justify-between items-center p-6 bg-white border-b">
//           <h1 className="text-3xl font-bold text-gray-800">{getTitle()}</h1>
//         </header>

//         {/* Content Area */}
//         <div className="flex-1 p-6 overflow-y-auto">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             {renderContent()}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import UsersTable from "./UsersTable";
import ReviewsTable from "./ReviewsTable";
import SearchHistoryTable from "./SearchHistoryTable";
import ManageRentals from "./ManageRentals"; // 👈 स्टेप 1: इम्पोर्ट करें
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Users, Star, History, LogOut, LayoutDashboard, Package } from 'lucide-react'; // 👈 Package आइकन इम्पोर्ट करें

export default function Dashboard() {
  const { logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('users');

  const handleLogout = async () => { /* ... (यह फंक्शन वैसा ही रहेगा) ... */ };
  
  const renderContent = () => {
    switch (activeView) {
      case 'users': return <UsersTable />;
      case 'reviews': return <ReviewsTable />;
      case 'searchHistory': return <SearchHistoryTable />;
      case 'rentals': return <ManageRentals />; // 👈 स्टेप 3: नया केस जोड़ें
      default: return <UsersTable />;
    }
  };

  const getTitle = () => {
     switch (activeView) {
      case 'users': return "Users Management";
      case 'reviews': return "Reviews Management";
      case 'searchHistory': return "Search History";
      case 'rentals': return "Rental Packages Management"; // 👈 नया टाइटल
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

            {/* 👇 स्टेप 2: Rentals के लिए नया लिंक/बटन जोड़ें */}
            <li className="mt-2">
              <button
                onClick={() => setActiveView('rentals')}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                  activeView === 'rentals'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Package className="mr-3" size={20} strokeWidth={2} />
                <span>Manage Rentals</span>
              </button>
            </li>
          </ul>
        </nav>
        {/* ... (Logout button remains same) ... */}
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