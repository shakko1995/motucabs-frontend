
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
      { name: "Delhi", link: "/destinations/delhi" },
      { name: "Mumbai", link: "/destinations/mumbai" },
      { name: "Bengaluru", link: "/destinations/bengaluru" },
      { name: "Chennai", link: "/destinations/chennai" },
      { name: "Hyderabad", link: "/destinations/hyderabad" },
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
    ],
  },
  {
    title: "Services",
    icon: Briefcase,
    mainLink: "#",
    dropdown: [
      { name: "Airport Transfers", link: "/airport-transfers" },
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
