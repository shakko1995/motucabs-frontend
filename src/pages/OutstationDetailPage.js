import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOutstationBySlug } from "../api/outstationApi"; 
import { CheckCircle, ChevronRight } from 'lucide-react';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

export default function OutstationDetailPage() {
  const { slug } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOutstationBySlug(slug)
      .then((data) => {
          if(data) {
              setCity(data);
          } else {
              setError("City details not found.");
          }
      })
      .catch((err) => setError("Failed to fetch city details."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="bg-white">
        {/* <Header /> */}
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        Outstation Cabs in {city.name}
                    </h1>
                    <div className="prose max-w-none text-slate-600">
                        <p>{city.description}</p>
                    </div>

                    {city.fares && city.fares.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Popular Outstation Fares from {city.name}</h2>
                            <div className="space-y-3">
                                {city.fares.map((fare, index) => (
                                    <Link to="#" key={index} className="flex justify-between items-center p-4 border rounded-lg hover:bg-slate-50">
                                        <span className="font-semibold">{fare.route}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm">starting at</span>
                                            <span className="font-bold">₹{fare.price}</span>
                                            <ChevronRight size={20}/>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-8">
                         <div className="bg-slate-50 p-6 rounded-lg border">
                            <h3 className="font-bold text-xl text-slate-800 mb-4">{city.atAGlance}</h3>
                            <p className="text-sm text-slate-600">{city.extraInfo}</p>
                         </div>
                         <div className="bg-slate-50 p-6 rounded-lg border">
                            <h4 className="font-bold text-xl text-slate-800 mb-4">Why book with us</h4>
                            <ul className="space-y-3">
                                {city.whyBook?.map((point, index) => (
                                     <li key={index} className="flex items-center gap-3">
                                         <CheckCircle size={18} className="text-green-500"/>
                                         <span>{point}</span>
                                     </li>
                                ))}
                            </ul>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <Footer /> */}
    </div>
  );
}