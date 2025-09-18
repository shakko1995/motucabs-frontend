import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Languages } from 'lucide-react';

// Language content object
const content = {
    en: {
        title: "White Label Solution",
        aboutTitle: "About White Label Solution",
        aboutText: "Motu Cabs White Label Solution provides everything you need to start or scale your taxi business effortlessly, with a comprehensive taxi service software solution for your website, tailored for the pan-India market. White Label Solution provides an opportunity for you to offer the entire range of Gozo Cabs services under your own brand.",
        whatYouGetTitle: "What you get?",
        features: [
            "Customizable Booking Platform: An intuitive and user-friendly webpage interface for your customers.",
            "Custom Branding: Personalisation with your logo, color scheme, and unique branding.",
            "Fare Management: Automatic fare calculation based on distance, time, or custom settings."
        ],
        benefitsTitle: "Benefits",
        benefits: [
            "Fast Deployment: Get your taxi webpage live in a matter of days, not months.",
            "Cost-Effective: Save on development costs with our ready-made solution.",
            "Scalable: Start small and scale as your business grows without any limitations.",
            "User-Friendly: Intuitive interfaces designed to deliver a smooth and efficient user experience."
        ],
        howItWorksTitle: "How It Works?",
        stepsTitle: "Get Started in 3 Simple Steps",
        steps: [
            "Customize Your Page: Provide your branding elements, and we will tailor the platform to fit your business.",
            "Launch & Operate: Go live and start accepting bookings immediately.",
            "Manage & Grow: Use the powerful admin panel to monitor performance, adjust pricing, and scale your operations."
        ],
        formTitle: "Fill your details here:",
        placeholders: {
            companyName: "Enter Business Entity Name",
            firstName: "Your First Name",
            lastName: "Your Last Name",
            email: "Enter primary email",
            phone: "081234 56789",
            state: "State",
            city: "City where your business is located"
        },
        submitButton: "SUBMIT"
    },
    hi: {
        title: "व्हाइट लेबल समाधान",
        aboutTitle: "व्हाइट लेबल समाधान के बारे में",
        aboutText: "मोटू कैब्स व्हाइट लेबल समाधान आपको अपने टैक्सी व्यवसाय को सहजता से शुरू करने या बढ़ाने के लिए आवश्यक सब कुछ प्रदान करता है, जिसमें आपकी वेबसाइट के लिए एक व्यापक टैक्सी सेवा सॉफ्टवेयर समाधान है, जो अखिल भारतीय बाजार के लिए तैयार किया गया है।",
        whatYouGetTitle: "आपको क्या मिलता है?",
        features: [
            "अनुकूलन योग्य बुकिंग प्लेटफ़ॉर्म: आपके ग्राहकों के लिए एक सहज और उपयोगकर्ता-अनुकूल वेबपेज इंटरफ़ेस।",
            "कस्टम ब्रांडिंग: आपके लोगो, रंग योजना और अद्वितीय ब्रांडिंग के साथ वैयक्तिकरण।",
            "किराया प्रबंधन: दूरी, समय या कस्टम सेटिंग्स के आधार पर स्वचालित किराया गणना।"
        ],
        benefitsTitle: "लाभ",
        benefits: [
            "तेज परिनियोजन: अपनी टैक्सी वेबपेज को कुछ ही दिनों में लाइव करें, महीनों में नहीं।",
            "लागत प्रभावी: हमारे तैयार समाधान के साथ विकास लागतों पर बचत करें।",
            "अनुमापक: छोटा शुरू करें और बिना किसी सीमा के अपने व्यवसाय के बढ़ने के साथ विस्तार करें।",
            "उपयोगकर्ता-अनुकूल: आपके ग्राहकों के लिए एक सहज और कुशल उपयोगकर्ता अनुभव प्रदान करने के लिए डिज़ाइन किए गए सहज इंटरफेस।"
        ],
        howItWorksTitle: "यह कैसे काम करता है?",
        stepsTitle: "3 सरल चरणों में शुरू करें",
        steps: [
            "अपना पेज अनुकूलित करें: अपने ब्रांडिंग तत्व प्रदान करें, और हम आपके व्यवसाय के अनुरूप प्लेटफ़ॉर्म को तैयार करेंगे।",
            "लॉन्च और संचालन: लाइव हों और तुरंत बुकिंग स्वीकार करना शुरू करें।",
            "प्रबंधन और विकास: प्रदर्शन की निगरानी, मूल्य निर्धारण समायोजित करने और अपने संचालन को बढ़ाने के लिए शक्तिशाली व्यवस्थापक पैनल का उपयोग करें।"
        ],
        formTitle: "अपना विवरण यहाँ भरें:",
        placeholders: {
            companyName: "व्यावसायिक इकाई का नाम दर्ज करें",
            firstName: "आपका पहला नाम",
            lastName: "आपका अंतिम नाम",
            email: "प्राथमिक ईमेल दर्ज करें",
            phone: "081234 56789",
            state: "राज्य",
            city: "शहर जहाँ आपका व्यवसाय स्थित है"
        },
        submitButton: "सबमिट करें"
    }
};

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <a href="/about" className="hover:text-blue-600">About Us</a>
                    <a href="/contact" className="hover:text-blue-600">Contact Us</a>
                </nav>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-500">
            <div className="text-xl font-bold mb-4">
                <span className="text-blue-600">Motu</span><span className="text-orange-500">Cab</span>
            </div>
            <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                <a href="/" className="hover:text-blue-600">Home</a>
                <a href="/about" className="hover:text-blue-600">About Us</a>
                <a href="/contact" className="hover:text-blue-600">Contact Us</a>
            </div>
            <p className="text-xs">&copy; {new Date().getFullYear()} MotuCab Technologies Pvt. Ltd. All Rights Reserved.</p>
        </div>
    </footer>
);

const WhiteLabelPage = () => {
    const [lang, setLang] = useState('en');
    const [formData, setFormData] = useState({
        companyName: '', firstName: '', lastName: '',
        email: '', phone: '', state: '', city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/business', formData);
            if (res.data.message) {
                alert(res.data.message);
                setFormData({ companyName: '', firstName: '', lastName: '', email: '', phone: '', state: '', city: '' });
            }
        } catch (error) {
            alert(error.response?.data?.message || "Submission failed. Please try again.");
        }
    };
    
    const t = content[lang];

    return (
        <div className="bg-white">
            <Header />
            
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800">{t.title}</h1>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 border">
                        <Languages size={20} className="text-slate-500"/>
                        <button onClick={() => setLang('en')} className={`font-semibold px-3 py-1 rounded-md text-sm ${lang === 'en' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}>ENG</button>
                        <button onClick={() => setLang('hi')} className={`font-semibold px-3 py-1 rounded-md text-sm ${lang === 'hi' ? 'bg-white text-blue-600 shadow' : 'text-gray-500'}`}>हिन्दी</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-3 space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.aboutTitle}</h2>
                            <p className="text-gray-600 leading-relaxed">{t.aboutText}</p>
                        </div>

                        {/* Video Placeholder */}
                        <div className="bg-slate-200 w-full h-80 rounded-2xl flex items-center justify-center text-slate-500 shadow-inner">
                            <p className="text-lg font-medium">(Video will be added here)</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.whatYouGetTitle}</h3>
                            <ul className="space-y-3">
                                {t.features.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0"/> <span className="text-gray-700">{item}</span></li>
                                ))}
                            </ul>
                        </div>
                        
                         <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t.howItWorksTitle}</h3>
                            <h4 className="font-bold text-gray-700 mb-3">{t.stepsTitle}</h4>
                             <ul className="space-y-3">
                                {t.steps.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3"><CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0"/> <span className="text-gray-700">{item}</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (Form) */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border sticky top-28">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.formTitle}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label className="text-sm font-semibold text-gray-700">Company Name*</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder={t.placeholders.companyName} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">First Name*</label>
                                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder={t.placeholders.firstName} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Last Name*</label>
                                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder={t.placeholders.lastName} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                                </div>
                            </div>
                             <div>
                                <label className="text-sm font-semibold text-gray-700">Email*</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t.placeholders.email} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                            </div>
                             <div>
                                <label className="text-sm font-semibold text-gray-700">Phone*</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t.placeholders.phone} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">State*</label>
                                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder={t.placeholders.state} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">City*</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder={t.placeholders.city} className="mt-1 w-full p-3 border rounded-md shadow-sm" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                                {t.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default WhiteLabelPage;