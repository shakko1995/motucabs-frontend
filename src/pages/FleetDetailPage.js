

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { fleetDetailsData, servicesTableData } from '../data/fleetData';
import { Helmet } from 'react-helmet-async'; 
const TableRow = ({ item }) => (
    <tr className="border-b bg-white">
        <td className="p-4 pl-8">{item.name}</td>
        <td className="p-4 text-center">{item.comfort === true ? <Check className="mx-auto text-green-500"/> : item.comfort || ''}</td>
        <td className="p-4 text-center">{item.premium === true ? <Check className="mx-auto text-green-500"/> : item.premium || ''}</td>
        <td className="p-4 text-center">{item.elite === true ? <Check className="mx-auto text-green-500"/> : item.elite || ''}</td>
    </tr>
);

const FleetDetailPage = () => {
    const { carType } = useParams();
    const navigate = useNavigate();
    const carData = fleetDetailsData[carType];

    if (!carData) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold">Car type not found!</h2>
                <button onClick={() => navigate('/fleet')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Fleet Overview</button>
            </div>
        );
    }

    const Footer = () => (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative max-w-7xl mx-auto px-8 py-12">
                <div className="text-center mb-8">
                    <div className="text-3xl font-bold mb-4">
                        <span className="text-blue-400">Motu</span><span className="text-orange-400">Cab</span>
                    </div>
                    <p className="text-gray-300 max-w-2xl mx-auto">Your trusted partner for reliable, comfortable, and affordable travel across India.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-sm">
                    <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</a>
                    <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a>
                    <a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
                    <a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a>
                    <a href="/terms-and-conditions" className="text-gray-300 hover:text-blue-400 transition-colors">Terms & Conditions</a>
                </div>
                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );

    return (
        <div className="bg-white">
            {/* ✅ Helmet for dynamic meta tags */}
            <Helmet>
                <title>{carData.content.metaTitle}</title>
                <meta name="description" content={carData.content.metaDescription} />
                <meta name="keywords" content={carData.content.metaKeywords} />
            </Helmet>

            <div className="max-w-5xl mx-auto px-6 py-12">
                <button onClick={() => navigate('/fleet')} className="flex items-center text-sm text-blue-600 font-semibold mb-6">
                    <ArrowLeft size={16} className="mr-2"/> Back to All Fleets
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img src={carData.image} alt={carData.name} className="rounded-lg shadow-xl w-full"/>
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800">{carData.content.h1}</h1>
                        <p className="mt-4 text-lg text-gray-600">{carData.description}</p>
                        <ul className="mt-6 space-y-3">
                            {carData.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <Check size={20} className="text-green-500 mr-3"/>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigate('/')} 
                            className="mt-8 bg-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-orange-600 transition-all transform hover:scale-105"
                        >
                            Book Now
                        </button>
                    </div>
                </div>

                <div className="mt-16 prose max-w-none">
                    <h2>{carData.content.h2}</h2>
                    {carData.content.paragraphs.map((p, index) => (
                        <p key={index}>{p}</p>
                    ))}
                </div>

                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Service Levels for {carData.name}</h2>
                    <div className="overflow-x-auto shadow-lg rounded-lg border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-700 text-white">
                                <tr>
                                    <th className="p-4 w-2/5 font-semibold">TRAVEL PREFERENCE</th>
                                    <th className="p-4 text-center font-semibold">COMFORT</th>
                                    <th className="p-4 text-center font-semibold">PREMIUM</th>
                                    <th className="p-4 text-center font-semibold">ELITE</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border-b">
                                    <td className="p-4 font-semibold">{carData.name}</td>
                                    <td className="p-4 text-center">{carData.preferences.comfort && <Check className="mx-auto text-green-500"/>}</td>
                                    <td className="p-4 text-center">{carData.preferences.premium && <Check className="mx-auto text-green-500"/>}</td>
                                    <td className="p-4 text-center">{carData.preferences.elite && <Check className="mx-auto text-green-500"/>}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="overflow-x-auto shadow-lg rounded-lg border mt-8">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-700 text-white">
                                <tr>
                                    <th className="p-4 w-2/5 font-semibold">ADDITIONAL SERVICES</th>
                                    <th className="p-4 text-center font-semibold">COMFORT</th>
                                    <th className="p-4 text-center font-semibold">PREMIUM</th>
                                    <th className="p-4 text-center font-semibold">ELITE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(servicesTableData).map(([category, items]) => (
                                    <React.Fragment key={category}>
                                        <tr className="border-b bg-gray-50">
                                            <td colSpan="4" className="p-4 font-bold text-gray-700">{category}</td>
                                        </tr>
                                        {items.map(item => <TableRow key={item.name} item={item} />)}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FleetDetailPage;
