
import {
  MapPin,
  Car,
  Briefcase,
  Users,
  Puzzle,
  Handshake,
  Building2,
  Phone,
  Info,
} from "lucide-react";

export const navigationLinks = [
  {
    title: "Destinations",
    icon: MapPin,
    mainLink: "#",
    dropdown: [
      { name: "Delhi", link: "/car-rentals/delhi" },
      { name: "Mumbai", link: "/car-rentals/mumbai" },
      { name: "Bengaluru", link: "/car-rentals/bengaluru" },
      { name: "Chennai", link: "/car-rentals/chennai" },
      { name: "Jaipur", link: "/car-rentals/jaipur" },
      { name: "All Top Destinations", link: "/destinations" },
    ],
  },
  {
    title: "Fleet",
    icon: Car,
    mainLink: "/fleet",
    dropdown: [
      { name: "Compact", link: "/fleet/compact" },
      { name: "Sedan", link: "/fleet/sedan" },
      { name: "Small SUV", link: "/fleet/small-suv" },
      { name: "Large SUV", link: "/fleet/large-suv" },
      { name: "Premium", link: "/fleet/premium" },
      { name: "Luxury", link: "/fleet/luxury" },
      { name: "Business Sedan", link: "/fleet/business-sedan" },
      { name: "Tempo Traveler", link: "/fleet/tempo-traveler" }
    ],
  },
  {
    title: "Services",
    icon: Briefcase,
    mainLink: "#",
    dropdown: [
      { name: "Airport Transfers", link: "/airport-transfers-page" },
      { name: "Rental Cabs", link: "/rental-page" },
      { name: "OneWay Cabs", link: "/one-way-cabs" },
      { name: "RoundTrip Cabs", link: "/round-trip-cabs" },
      { name: "Point to Point", link: "/point-to-point" },
      { name: "Planned Itineraries", link: "/itineraries" },
      { name: "Hourly Service", link: "/hourly-service" },
      { name: "Concierge Service", link: "/concierge" },
      { name: "Meet and Assist", link: "/meet-and-assist" },
      { name: "Event Solutions", link: "/event-solutions" },
    ],
  },
  {
    title: "Partners",
    icon: Handshake,
    mainLink: "#",
    dropdown: [
      { name: "Cab Vendors", link: "/drive-with-us" },
      { name: "Travel Agents", link: "/partners" },
      { name: "International Partners", link: "/travel-agents" },
      { name: "Cross-Promotion Network", link: "/cross-promotion" },
    ],
  },
  {
    title: "Solutions",
    icon: Puzzle,
    mainLink: "#",
    dropdown: [
      { name: "White Label Solution", link: "/white-label" },
      { name: "SaaS", link: "/saas" },
    ],
  },
  {
    title: "Community",
    icon: Users,
    mainLink: "#",
    dropdown: [
      { name: "Friends and Family", link: "/friends-and-family" },
      { name: "Honoring Our Armed Forces", link: "/armed-forces" },
      { name: "Gozo for Students", link: "/students-program" },
      { name: "Gozo for our Seniors", link: "/senior-citizens-program" },
    ],
  },
  {
    title: "Company",
    icon: Building2,
    mainLink: "#",
    dropdown: [
      { name: "About Us", link: "/about", icon: Info },
      { name: "Contact Us", link: "/contact", icon: Phone },
    ],
  },
];
