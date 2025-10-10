


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { navigationLinks } from '../data/navigationData'; 
import { User, LogOut, ChevronDown, Menu, X, UserCircle, BookMarked } from 'lucide-react';


const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("IN");
    const [showLoginModal, setShowLoginModal] = useState(false);


  

    const toggleAccordion = (title) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

   const NavLinks = () => {
  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <nav className="flex flex-col space-y-2 text-lg p-4">
      {navigationLinks.map((nav) => (
        <div key={nav.title} className="border-b pb-2">
          <div
            className="flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
            onClick={() => toggleAccordion(nav.title)}
          >
            <div className="flex items-center gap-2">
              {nav.icon && <nav.icon className="w-5 h-5 text-blue-600" />}
              <span>{nav.title}</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                openAccordion === nav.title ? 'rotate-180' : ''
              }`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openAccordion === nav.title ? 'max-h-96 pt-2' : 'max-h-0'
            }`}
          >
            <ul className="pl-4 space-y-1">
              {nav.dropdown.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </nav>
  );
};

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                {/* Left side: Logo & Menu Button */}
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={28} className="text-gray-700" />
                    </button>
                    <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
                    </div>
                </div>
                
                {/* Right side: Actions */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button 
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)} 
                            className="flex items-center text-sm border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100"
                        >
                            <span className="font-medium text-gray-700">{selectedCountry}</span>
                            <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
                        </button>
                        {showCountryDropdown && (
                            <div className="absolute top-full mt-1 right-0 bg-white border rounded-lg shadow-lg z-50 w-40">
                                <button onClick={() => { setSelectedCountry("IN"); setShowCountryDropdown(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">India (IN)</button>
                                <button onClick={() => { setSelectedCountry("USA"); setShowCountryDropdown(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50">USA</button>
                            </div>
                        )}
                    </div>

                    <button className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50">
                        Request a call
                    </button>
                    
                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
                                className="flex items-center p-2 bg-blue-600 text-white rounded-lg"
                            >
                                <UserCircle className="w-5 h-5" />
                                <ChevronDown size={16} className={`ml-1 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isUserDropdownOpen && (
                                <div 
                                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20"
                                    onMouseLeave={() => setUserDropdownOpen(false)}
                                >
                                    <div className="p-4 border-b">
                                        <p className="font-semibold text-sm">Hi, {user.name}</p>
                                    </div>
                                    <ul className="py-2">
                                        <li><Link to="/profile" onClick={() => setUserDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><UserCircle size={18} className="mr-3" /> Profile</Link></li>
                                        <li><Link to="/my-bookings" onClick={() => setUserDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><BookMarked size={18} className="mr-3" /> My Bookings</Link></li>
                                        <li className="border-t my-1"></li>
                                        <li><button onClick={logout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut size={18} className="mr-3" /> Logout</button></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                             onClick={() => navigate('/login')} 
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-xl font-bold">MENU</div>
                        <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
                    </div>
                    <NavLinks />
                </div>
            </div>
        </header>
    );
};

export default Header;