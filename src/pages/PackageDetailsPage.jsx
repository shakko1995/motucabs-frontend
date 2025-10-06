import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Clock, IndianRupee, ArrowLeft } from "lucide-react";

const PackageDetailsPage = () => {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${slug}`);
        setPkg(res.data.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 animate-pulse text-lg">Loading...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Package not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={20} /> Back to Packages
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-96 mt-4">
        <img
          src={pkg.images?.[0] || "/placeholder.jpg"}
          alt={pkg.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {pkg.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            {pkg.fromCity}, {pkg.fromState}
          </p>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
              <Clock className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold text-lg">
                  {pkg.days} Days / {pkg.nights} Nights
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
              <IndianRupee className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-semibold text-lg">
                  ₹{pkg.price?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {pkg.description && (
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
            </div>
          )}

          {/* Destination Details */}
          {pkg.destinations?.length > 0 && (
            <div className="mb-8">
              {pkg.destinations.map((dest, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {dest.name}:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{dest.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Booking CTA */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Call / Email us to book</p>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{pkg.price?.toLocaleString()}
                </p>
              </div>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Itinerary */}
          {pkg.itinerary?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Itinerary
              </h2>
              <div className="space-y-6">
                {pkg.itinerary.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Day {item.day}: {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions */}
          {pkg.inclusions?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Inclusion:
              </h2>
              <ul className="space-y-2">
                {pkg.inclusions.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-blue-600 mr-2">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Exclusions */}
          {pkg.exclusions?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Exclusion:
              </h2>
              <ul className="space-y-2">
                {pkg.exclusions.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Notes & Disclaimers */}
          {pkg.notes?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Notes and Disclaimers:
              </h2>
              <ul className="space-y-2">
                {pkg.notes.map((note, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-gray-600 mr-2">{index + 1}.</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Final CTA */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Call / Email us to book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;



// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import { Clock, IndianRupee, ArrowLeft } from "lucide-react";

// const PackageDetailsPage = () => {
//   const { slug } = useParams();
//   const [pkg, setPkg] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/packages/${slug}`);
//         setPkg(res.data.data);
//       } catch (error) {
//         console.error("Error fetching package:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackage();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600 animate-pulse text-lg">Loading...</p>
//       </div>
//     );
//   }

//   if (!pkg) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-gray-600">Package not found</p>
//       </div>
//     );
//   }

//   // 🔹 Convert price string to number
//   const priceNumber = Number(pkg.price.replace(/\D/g, "")); // Remove non-digit characters
//   const discountNumber = Number(pkg.discountPrice);
//   const hasDiscount = discountNumber > 0 && discountNumber < priceNumber;
//   const discountPercentage = hasDiscount
//     ? Math.round(((priceNumber - discountNumber) / priceNumber) * 100)
//     : 0;

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Back Button */}
//       <div className="max-w-6xl mx-auto px-6 pt-6">
//         <Link
//           to="/packages"
//           className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//         >
//           <ArrowLeft size={20} /> Back to Packages
//         </Link>
//       </div>

//       {/* Hero Image */}
//       <div className="relative w-full h-96 mt-4">
//         <img
//           src={pkg.images?.[0] || "/placeholder.jpg"}
//           alt={pkg.title}
//           className="object-cover w-full h-full"
//         />
//         {hasDiscount && (
//           <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full font-semibold text-sm">
//             {discountPercentage}% OFF
//           </span>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-6 py-8">
//         <div className="bg-white rounded-2xl shadow-md p-8">
//           {/* Title */}
//           <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
//             {pkg.title}
//           </h1>
//           <p className="text-gray-600 text-lg mb-6">
//             {pkg.fromCity}, {pkg.fromState}
//           </p>

//           {/* Quick Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
//             <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
//               <Clock className="text-blue-600" size={24} />
//               <div>
//                 <p className="text-sm text-gray-600">Duration</p>
//                 <p className="font-semibold text-lg">
//                   {pkg.days} Days / {pkg.nights} Nights
//                 </p>
//               </div>
//             </div>

//             {/* Price / Discount */}
//             <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
//               <IndianRupee className="text-green-600" size={24} />
//               <div>
//                 <p className="text-sm text-gray-600">Price</p>
//                 {hasDiscount ? (
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <p className="font-bold text-lg text-green-700">
//                       ₹{discountNumber.toLocaleString()}
//                     </p>
//                     <p className="text-gray-500 line-through text-sm">
//                       ₹{priceNumber.toLocaleString()}
//                     </p>
//                     <span className="text-red-600 text-sm font-medium">
//                       ({discountPercentage}% OFF)
//                     </span>
//                   </div>
//                 ) : (
//                   <p className="font-semibold text-lg">
//                     ₹{priceNumber.toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Description */}
//           {pkg.description && (
//             <div className="mb-8">
//               <p className="text-gray-700 leading-relaxed">{pkg.description}</p>
//             </div>
//           )}

//           {/* Destination Details */}
//           {pkg.destinations?.length > 0 && (
//             <div className="mb-8">
//               {pkg.destinations.map((dest, index) => (
//                 <div key={index} className="mb-6">
//                   <h3 className="text-xl font-semibold text-slate-800 mb-2">
//                     {dest.name}:
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed">{dest.description}</p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Booking CTA */}
//           <div className="bg-blue-50 p-6 rounded-lg mb-8">
//             <div className="flex justify-between items-center flex-wrap gap-4">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Call / Email us to book</p>
//                 {hasDiscount ? (
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <p className="text-2xl font-bold text-blue-600">
//                       ₹{discountNumber.toLocaleString()}
//                     </p>
//                     <p className="text-gray-500 line-through text-lg">
//                       ₹{priceNumber.toLocaleString()}
//                     </p>
//                     <span className="text-red-600 text-sm font-medium">
//                       ({discountPercentage}% OFF)
//                     </span>
//                   </div>
//                 ) : (
//                   <p className="text-2xl font-bold text-blue-600">
//                     ₹{priceNumber.toLocaleString()}
//                   </p>
//                 )}
//               </div>

//               <Link
//                 to="/login"
//                 className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//               >
//                 Book Now
//               </Link>
//             </div>
//           </div>

//           {/* Itinerary */}
//           {pkg.itinerary?.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">Itinerary</h2>
//               <div className="space-y-6">
//                 {pkg.itinerary.map((item, index) => (
//                   <div key={index} className="border-l-4 border-blue-500 pl-4">
//                     <h3 className="text-lg font-semibold text-slate-800 mb-2">
//                       Day {item.day}: {item.title}
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Inclusions */}
//           {pkg.inclusions?.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">Inclusion:</h2>
//               <ul className="space-y-2">
//                 {pkg.inclusions.map((item, index) => (
//                   <li key={index} className="text-gray-700 flex items-start">
//                     <span className="text-blue-600 mr-2">{index + 1}.</span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Exclusions */}
//           {pkg.exclusions?.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">Exclusion:</h2>
//               <ul className="space-y-2">
//                 {pkg.exclusions.map((item, index) => (
//                   <li key={index} className="text-gray-700 flex items-start">
//                     <span className="text-red-600 mr-2">{index + 1}.</span>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Notes & Disclaimers */}
//           {pkg.notes?.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-slate-800 mb-4">
//                 Notes and Disclaimers:
//               </h2>
//               <ul className="space-y-2">
//                 {pkg.notes.map((note, index) => (
//                   <li key={index} className="text-gray-700 flex items-start">
//                     <span className="text-gray-600 mr-2">{index + 1}.</span>
//                     {note}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Final CTA */}
//           <div className="text-center">
//             <Link
//               to="/login"
//               className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Call / Email us to book
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PackageDetailsPage;

