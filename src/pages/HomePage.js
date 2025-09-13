import RideBookingForm from "../components/RideBookingForm";
import FeaturesSection from "../components/FeaturesSection";
import ReviewsSection from "../components/ReviewsSection";
import VideoSection from "../components/VideoSection";
import BusinessSection from "../components/BusinessSection";
import AttachTaxiSection from "../components/AttachTaxiSection";
import OutstationServiceSection from "../components/OutstationServiceSection"
import Footer from "../components/Footer";

// Home Page Component
export default function HomePage() {
  return (
    <div className="bg-blue-50">
      {/* Booking Form */}
      <div className="flex justify-center">
        <RideBookingForm />
      </div>


      <div >
        <FeaturesSection />
      </div>
      <div>
        <ReviewsSection />

      </div>
      <div>
        <VideoSection />

      </div>
      <div>
        <BusinessSection />

      </div>
      <div>
        <AttachTaxiSection />

      </div>
      <div>
        <OutstationServiceSection/>

      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}
