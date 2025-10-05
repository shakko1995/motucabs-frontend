import RideBookingForm from "../components/RideBookingForm";
import FeaturesSection from "../components/FeaturesSection";
import ReviewsSection from "../components/ReviewsSection";
import VideoSection from "../components/VideoSection";
import BusinessSection from "../components/BusinessSection";
import AttachTaxiSection from "../components/AttachTaxiSection";
import OutstationServiceSection from "../components/OutstationServiceSection"
import CabRoutesPage from "../components/CabRoutesPage";
import Footer from "../components/Footer";

// Home Page Component
// export default function HomePage() {
//   return (
//     <div className="bg-blue-50">
//       {/* Booking Form */}
//       <div className="">
//         <RideBookingForm />
//       </div>


//       <div >
//         <FeaturesSection />
//       </div>
//       <div>
//         <ReviewsSection />

//       </div>
//       <div>
//         <VideoSection />

//       </div>
//       <div>
//         <BusinessSection />

//       </div>
//       <div>
//         <AttachTaxiSection />

//       </div>
//       <div>
//         <OutstationServiceSection/>

//       </div>
//       <div>
//         <Footer/>
//       </div>
//     </div>
//   );
// }

export default function HomePage() {
  return (
    <div className="bg-blue-50">
      <RideBookingForm />
      <FeaturesSection />
      <ReviewsSection />
      <VideoSection />
      <BusinessSection />
      <AttachTaxiSection />
      <OutstationServiceSection />
      <CabRoutesPage/>
      <Footer />
    </div>
  );
}

