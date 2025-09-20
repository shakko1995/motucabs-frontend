// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { navigationLinks } from '../data/navigationData';
// import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

// const Header = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useContext(AuthContext);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [openAccordion, setOpenAccordion] = useState(null);

//     const toggleAccordion = (title) => {
//         setOpenAccordion(openAccordion === title ? null : title);
//     };

//     const NavLinks = ({ isMobile }) => (
//         <nav className={`flex ${isMobile ? 'flex-col space-y-2 text-lg p-4' : 'items-center gap-6 text-sm'}`}>
//             {navigationLinks.map(nav => (
//                 <div key={nav.title} className="relative group">
//                     <div 
//                         className="flex items-center justify-between text-gray-600 font-medium hover:text-blue-600 transition-colors cursor-pointer"
//                         onClick={() => isMobile ? toggleAccordion(nav.title) : navigate(nav.mainLink)}
//                     >
//                         <span>{nav.title}</span>
//                         <ChevronDown size={16} className={`ml-1 transition-transform ${openAccordion === nav.title && isMobile ? 'rotate-180' : ''} ${isMobile ? '' : 'group-hover:rotate-180'}`} />
//                     </div>
//                     <div className={`
//                         ${isMobile ? `overflow-hidden transition-all duration-300 ${openAccordion === nav.title ? 'max-h-96' : 'max-h-0'}` : 'absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg border z-20 hidden group-hover:block'}
//                     `}>
//                         <ul className="py-1 pl-4 sm:pl-0">
//                             {nav.dropdown.map(item => (
//                                 <li key={item.name}>
//                                     <Link 
//                                         to={item.link}
//                                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </nav>
//     );

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden">
//                         <Menu size={24} className="text-gray-700" />
//                     </button>
//                     <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//                         <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//                     </div>
//                 </div>
                
//                 <div className="hidden md:flex">
//                     <NavLinks isMobile={false} />
//                 </div>

//                 <div className="flex items-center gap-2">
//                     {user ? (
//                         <div className="hidden md:flex">{/* Desktop User Button */}</div>
//                     ) : (
//                         <button onClick={() => navigate('/login')} className="hidden md:inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm">Login</button>
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Menu Overlay & Panel */}
//             <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
//                 <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4"><X size={24}/></button>
//                     <NavLinks isMobile={true} />
//                     <div className="border-t pt-4 mt-4">
//                          {user ? (
//                             <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center font-medium">
//                                 <LogOut className="w-5 h-5 mr-2" />
//                                 Logout
//                             </button>
//                         ) : (
//                             <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                                 Login / Signup
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;



// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { navigationLinks } from '../data/navigationData'; // Assuming you have this file
// import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

// const Header = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useContext(AuthContext);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [openAccordion, setOpenAccordion] = useState(null);

//     const toggleAccordion = (title) => {
//         setOpenAccordion(openAccordion === title ? null : title);
//     };

//     // This component is now only for the slide-in menu content
//     const NavLinks = () => (
//         <nav className="flex flex-col space-y-2 text-lg p-4">
//             {navigationLinks.map(nav => (
//                 <div key={nav.title} className="border-b pb-2">
//                     <div 
//                         className="flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
//                         onClick={() => toggleAccordion(nav.title)}
//                     >
//                         <span>{nav.title}</span>
//                         <ChevronDown size={20} className={`transition-transform ${openAccordion === nav.title ? 'rotate-180' : ''}`} />
//                     </div>
//                     <div className={`overflow-hidden transition-all duration-300 ${openAccordion === nav.title ? 'max-h-96 pt-2' : 'max-h-0'}`}>
//                         <ul className="pl-4 space-y-1">
//                             {nav.dropdown.map(item => (
//                                 <li key={item.name}>
//                                     <Link 
//                                         to={item.link}
//                                         className="block py-2 text-sm text-gray-600 hover:text-blue-600"
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </nav>
//     );

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     {/* Hamburger Menu Icon - Always visible */}
//                     <button onClick={() => setIsMobileMenuOpen(true)}>
//                         <Menu size={28} className="text-gray-700" />
//                     </button>
//                     <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//                         <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//                     </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                     {/* Add other buttons like "Request a call" or "Login" here as needed */}
//                     <button className="hidden sm:inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50">Request a call</button>
//                     {user ? (
//                         <div>{/* User Button/Dropdown can go here */}</div>
//                     ) : (
//                         <button onClick={() => navigate('/login')} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm">Login</button>
//                     )}
//                 </div>
//             </div>

//             {/* Slide-in Menu Panel */}
//             <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
//                 <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="font-bold text-xl">MENU</h2>
//                         <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
//                     </div>
//                     <NavLinks />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { navigationLinks } from '../data/navigationData';
// import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

// const Header = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useContext(AuthContext);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [openAccordion, setOpenAccordion] = useState(null);

//     const toggleAccordion = (title) => {
//         setOpenAccordion(openAccordion === title ? null : title);
//     };

//     const NavLinks = ({ isMobile }) => (
//         <nav className={`flex ${isMobile ? 'flex-col space-y-2 text-lg p-4' : 'items-center gap-6 text-sm'}`}>
//             {navigationLinks.map(nav => (
//                 <div key={nav.title} className="border-b pb-2 md:border-none md:pb-0">
//                     <div 
//                         className="flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
//                         onClick={() => isMobile ? toggleAccordion(nav.title) : navigate(nav.mainLink)}
//                     >
//                         <span>{nav.title}</span>
//                         <ChevronDown size={20} className={`transition-transform ${openAccordion === nav.title && isMobile ? 'rotate-180' : ''}`} />
//                     </div>
//                     <div className={`overflow-hidden transition-all duration-300 ${openAccordion === nav.title ? 'max-h-96 pt-2' : 'max-h-0'}`}>
//                         <ul className="pl-4 space-y-1">
//                             {nav.dropdown.map(item => (
//                                 <li key={item.name}>
//                                     <Link 
//                                         to={item.link}
//                                         className="block py-2 text-sm text-gray-600 hover:text-blue-600"
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </nav>
//     );

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden">
//                         <Menu size={28} className="text-gray-700" />
//                     </button>
//                     <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//                         <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//                     </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                     <button className="hidden sm:inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50">Request a call</button>
//                     {user ? (
//                         <div className="relative group hidden md:flex">
//                              <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg">
//                                 <User className="w-5 h-5 mr-2 text-blue-600" />
//                                 Hi, {user?.name?.split(' ')[0] || 'User'}
//                             </button>
//                             <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-20 hidden group-hover:block">
//                                 <button onClick={logout} className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center text-sm font-medium">
//                                     <LogOut className="w-4 h-4 mr-2" />
//                                     Logout
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <button onClick={() => navigate('/login')} className="hidden md:inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm">Login</button>
//                     )}
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
//                 <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <div className="flex justify-between items-center mb-6">
//                         <div className="text-xl font-bold">MENU</div>
//                         <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
//                     </div>
//                     <NavLinks />
//                     <div className="border-t pt-4 mt-4">
//                          {user ? (
//                             <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center font-medium">
//                                 <LogOut className="w-5 h-5 mr-2" />
//                                 Logout
//                             </button>
//                         ) : (
//                             <button onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }} className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                                 Login / Signup
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

// import React, { useState, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { navigationLinks } from '../data/navigationData'; // Assuming you have this file
// import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

// const Header = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useContext(AuthContext);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [openAccordion, setOpenAccordion] = useState(null);

//     const toggleAccordion = (title) => {
//         setOpenAccordion(openAccordion === title ? null : title);
//     };

//     // This component is now only for the slide-in menu content
//     const NavLinks = () => (
//         <nav className="flex flex-col space-y-2 text-lg p-4">
//             {navigationLinks.map(nav => (
//                 <div key={nav.title} className="border-b pb-2">
//                     <div 
//                         className="flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
//                         onClick={() => toggleAccordion(nav.title)}
//                     >
//                         <span>{nav.title}</span>
//                         <ChevronDown size={20} className={`transition-transform ${openAccordion === nav.title ? 'rotate-180' : ''}`} />
//                     </div>
//                     <div className={`overflow-hidden transition-all duration-300 ${openAccordion === nav.title ? 'max-h-96 pt-2' : 'max-h-0'}`}>
//                         <ul className="pl-4 space-y-1">
//                             {nav.dropdown.map(item => (
//                                 <li key={item.name}>
//                                     <Link 
//                                         to={item.link}
//                                         className="block py-2 text-sm text-gray-600 hover:text-blue-600"
//                                         onClick={() => setIsMobileMenuOpen(false)}
//                                     >
//                                         {item.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </nav>
//     );

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-40">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     {/* Hamburger Menu Icon - Always visible */}
//                     <button onClick={() => setIsMobileMenuOpen(true)}>
//                         <Menu size={28} className="text-gray-700" />
//                     </button>
//                     <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
//                         <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
//                     </div>
//                 </div>
                
//                 <div className="flex items-center gap-2">
//                     {/* Add other buttons like "Request a call" or "Login" here as needed */}
//                     <button className="hidden sm:inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm hover:bg-blue-50">Request a call</button>
//                     {user ? (
//                         <div>{/* User Button/Dropdown can go here */}</div>
//                     ) : (
//                         <button onClick={() => navigate('/login')} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm">Login</button>
//                     )}
//                 </div>
//             </div>

//             {/* Slide-in Menu Panel */}
//             <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//                 <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileMenuOpen(false)}></div>
//                 <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white shadow-xl p-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="font-bold text-xl">MENU</h2>
//                         <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
//                     </div>
//                     <NavLinks />
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { navigationLinks } from '../data/navigationData'; // Make sure this file exists
import { User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(null);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("IN");

    const toggleAccordion = (title) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    const NavLinks = () => (
        <nav className="flex flex-col space-y-2 text-lg p-4">
            {navigationLinks.map(nav => (
                <div key={nav.title} className="border-b pb-2">
                    <div 
                        className="flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
                        onClick={() => toggleAccordion(nav.title)}
                    >
                        <span>{nav.title}</span>
                        <ChevronDown size={20} className={`transition-transform ${openAccordion === nav.title ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${openAccordion === nav.title ? 'max-h-96 pt-2' : 'max-h-0'}`}>
                        <ul className="pl-4 space-y-1">
                            {nav.dropdown.map(item => (
                                <li key={item.name}>
                                    <Link 
                                        to={item.link}
                                        className="block py-2 text-sm text-gray-600 hover:text-blue-600"
                                        onClick={() => setIsMobileMenuOpen(false)}
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

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu size={28} className="text-gray-700" />
                    </button>
                    <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* 👇 "IN" वाला बटन यहाँ जोड़ा गया है */}
                    <div className="relative">
                        <button 
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)} 
                            className="flex items-center text-sm border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
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

                    <button className="hidden sm:inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50">
                        Request a call
                    </button>
                    
                    {user ? (
                        <div className="relative group">
                             <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg">
                                <User className="w-5 h-5 mr-2 text-blue-600" />
                                Hi, {user?.name?.split(' ')[0] || 'User'}
                            </button>
                            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-20 hidden group-hover:block">
                                <button onClick={logout} className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center text-sm font-medium">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-sm">
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