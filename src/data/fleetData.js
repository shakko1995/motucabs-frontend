export const fleetCategories = [
  { 
    name: 'Compact', 
    slug: 'compact', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 4 passengers', 
      '2 small bags', 
      'Air-conditioned', 
      'Fuel-efficient', 
      'Ideal for city travel'
    ] 
  },
  { 
    name: 'Sedan', 
    slug: 'sedan', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 4 passengers', 
      '2 mid-sized bags', 
      'Comfortable seating', 
      'Smooth ride', 
      'Perfect for business trips'
    ] 
  },
  { 
    name: 'Small SUV', 
    slug: 'small-suv', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 6 passengers', 
      '3 mid-sized bags', 
      'Spacious interiors', 
      'AC & Non-AC options', 
      'Ideal for family trips'
    ] 
  },
  { 
    name: 'Large SUV', 
    slug: 'large-suv', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 7 passengers', 
      '4 mid-sized bags', 
      'Premium interiors', 
      'AC & Non-AC options', 
      'Perfect for long journeys'
    ] 
  },
  { 
    name: 'Premium', 
    slug: 'premium', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 4 passengers', 
      '3 mid-sized bags', 
      'Luxury interiors', 
      'Professional drivers', 
      'High-end comfort'
    ] 
  },
  { 
    name: 'Business Sedan', 
    slug: 'business-sedan', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 4 passengers', 
      '3 mid-sized bags', 
      'Executive seating', 
      'Smooth & quiet ride', 
      'Perfect for corporate travel'
    ] 
  },
  { 
    name: 'Traveller / Minivan', 
    slug: 'tempo-traveler', 
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', 
    features: [
      'Upto 12 passengers', 
      '8 bags', 
      'AC & Non-AC options', 
      'Group travel friendly', 
      'Ideal for tours & school trips'
    ] 
  }
];


export const fleetDetailsData = {
  compact: {
    name: 'Compact',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
    description: 'Economical cab class, perfect for solo travelers and small families for short city trips.',
    features: [
      'Upto 4 passengers can travel comfortably.',
      'Accommodates upto 2 small sized bags.',
      'Air-conditioned and fuel-efficient.',
      'Easy to navigate through city traffic.',
      'Affordable option for daily commuting and errands.'
    ],
    preferences: { comfort: true, premium: false, elite: false },
    content: {
      metaTitle: "Compact Cabs | MotuCab",
      metaDescription: "Book affordable and reliable compact cabs like Indica and Swift for city travel.",
      metaKeywords: "compact cab, city cab, economical taxi, Indica, Swift, MotuCab",
      h1: "Compact Cars for City Travel",
      h2: "Why Choose a Compact Cab?",
      paragraphs: [
        "Our compact cars are perfect for city travel, solo travelers, and small families who want a cost-effective and reliable ride.",
        "With comfortable seating for up to 4 passengers, space for luggage, and fuel-efficient engines, these cars strike a balance between convenience and affordability.",
        "Ideal for short trips, airport transfers, and quick errands, our compact fleet ensures smooth city navigation and timely arrivals."
      ]
    }
  },
  sedan: {
    name: 'Sedan',
    image: 'https://drive.google.com/file/d/1asRxmzRZ7U5xdox-kREt8baVGwLN4ao-/view?usp=sharing',
    description: 'Comfortable cab for city rides or small group travel with extra space and amenities.',
    features: [
      'Upto 4 passengers can travel comfortably.',
      'Accommodates upto 2 mid-sized bags.',
      'Smooth and stable ride for long distances.',
      'Ideal for business and family travel.',
      'Air-conditioned with comfortable seating.'
    ],
    preferences: { comfort: true, premium: true, elite: false },
    content: {
      metaTitle: "Sedan Cabs | MotuCab",
      metaDescription: "Book comfortable sedan cabs like Dzire and Etios for premium city travel.",
      metaKeywords: "sedan cab, Dzire, Etios, premium taxi, city cab, MotuCab",
      h1: "Comfortable Sedan Cars",
      h2: "Experience Premium Travel",
      paragraphs: [
        "Sedans are ideal for business travelers or small families looking for a smooth and comfortable ride.",
        "These vehicles provide extra legroom, ample luggage space, and professional drivers ensuring a stress-free journey.",
        "Perfect for city rides, airport transfers, and intercity travel, offering premium travel experience at affordable rates."
      ]
    }
  },
  'small-suv': {
    name: 'Small SUV',
    image: 'https://drive.google.com/file/d/1asRxmzRZ7U5xdox-kREt8baVGwLN4ao-/view?usp=sharing',
    description: 'Spacious cab suitable for family trips or small group travel with extra luggage capacity.',
    features: [
      'Upto 6 passengers can travel comfortably.',
      'Accommodates upto 3 mid-sized bags.',
      'Spacious interiors and legroom.',
      'AC & Non-AC options available.',
      'Perfect for family trips and road journeys.'
    ],
    preferences: { comfort: true, premium: true, elite: false },
    content: {
      metaTitle: "Small SUV Cabs | MotuCab",
      metaDescription: "Book small SUVs like Ertiga and Xylo for family trips and group travel.",
      metaKeywords: "small suv, Ertiga, Xylo, family cab, group travel, MotuCab",
      h1: "Spacious Small SUVs",
      h2: "Travel Together in Comfort",
      paragraphs: [
        "Small SUVs are perfect for family trips, group travel, or road trips, offering more space and comfort than sedans.",
        "These vehicles accommodate up to 6 passengers with luggage space for 3 bags, ensuring comfort for everyone.",
        "Ideal for long journeys, city tours, and intercity travel while keeping passengers comfortable and relaxed."
      ]
    }
  },
  'large-suv': {
    name: 'Large SUV',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Large_SUV_2x.png',
    description: 'Large SUV cab ideal for bigger groups, long journeys, and premium comfort.',
    features: [
      'Upto 7 passengers can travel comfortably.',
      'Accommodates upto 4 mid-sized bags.',
      'Premium interiors with high-quality seats.',
      'AC & Non-AC options available.',
      'Perfect for family outings, business trips, and long journeys.'
    ],
    preferences: { comfort: true, premium: true, elite: true },
    content: {
      metaTitle: "Large SUV Cabs | MotuCab",
      metaDescription: "Book large SUVs like Innova Crysta for comfortable group travel.",
      metaKeywords: "large suv, Innova Crysta, group travel, family cab, MotuCab",
      h1: "Spacious Large SUVs",
      h2: "Comfort for Everyone",
      paragraphs: [
        "Large SUVs offer ample space and comfort for bigger groups, making them ideal for long journeys and family outings.",
        "Premium interiors, air-conditioning, and spacious seating ensure a luxurious travel experience for all passengers.",
        "Perfect for road trips, corporate travel, and intercity journeys with comfort and style."
      ]
    }
  },
  premium: {
    name: 'Premium',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Premium_2x.png',
    description: 'Luxury cab for premium travel experience with high-end comfort and professional drivers.',
    features: [
      'Upto 4 passengers can travel comfortably.',
      'Accommodates upto 3 mid-sized bags.',
      'Luxury interiors and high-quality seating.',
      'Professional chauffeur service included.',
      'Ideal for corporate and VIP travel.'
    ],
    preferences: { comfort: true, premium: true, elite: true },
    content: {
      metaTitle: "Premium Cabs | MotuCab",
      metaDescription: "Book premium cabs like Honda City for luxury travel.",
      metaKeywords: "premium cab, luxury taxi, Honda City, elite travel, MotuCab",
      h1: "Premium Cars for Luxury Travel",
      h2: "Travel in Style and Comfort",
      paragraphs: [
        "Premium cabs offer top-notch comfort, luxury interiors, and professional chauffeurs for a seamless travel experience.",
        "Perfect for business travelers, VIP clients, or anyone looking for a comfortable, stylish, and reliable ride.",
        "Ideal for corporate travel, airport transfers, and city tours."
      ]
    }
  },
  luxury: {
    name: 'Luxury',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Luxury_2x.png',
    description: 'Top-tier luxury cabs for executives, VIPs, and high-end travelers.',
    features: [
      'Upto 4 passengers can travel.',
      'Accommodates upto 4 mid-sized bags.',
      'Premium amenities with leather interiors.',
      'Chauffeur-driven with top service.',
      'Perfect for corporate and VIP clients.'
    ],
    preferences: { comfort: true, premium: true, elite: true },
    content: {
      metaTitle: "Luxury Cabs | MotuCab",
      metaDescription: "Book luxury cabs like Audi, BMW, or Mercedes for VIP travel.",
      metaKeywords: "luxury cab, BMW, Audi, Mercedes, VIP travel, MotuCab",
      h1: "Luxury Cars for VIP Travel",
      h2: "Top-Tier Comfort & Style",
      paragraphs: [
        "Luxury cabs provide elegant interiors, premium comfort, and high-end amenities for executive and VIP travelers.",
        "Perfect for corporate clients, airport transfers, or anyone seeking a luxurious, comfortable, and safe ride.",
        "Enjoy a superior travel experience with professional chauffeurs and premium vehicles."
      ]
    }
  },
  'business-sedan': {
    name: 'Business Sedan',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Business_Sedan_2x.png',
    description: 'Executive sedan ideal for corporate travel, airport pickups, and premium city rides.',
    features: [
      'Upto 4 passengers can travel comfortably.',
      'Accommodates upto 3 mid-sized bags.',
      'Executive seating with extra legroom.',
      'Smooth and quiet ride for professional travel.',
      'Perfect for business trips and corporate clients.'
    ],
    preferences: { comfort: true, premium: true, elite: true },
    content: {
      metaTitle: "Business Sedan Cabs | MotuCab",
      metaDescription: "Book Business Sedans like Honda City or Toyota Corolla for premium corporate travel.",
      metaKeywords: "business sedan, corporate cab, Honda City, Toyota Corolla, executive travel, MotuCab",
      h1: "Business Sedans for Corporate Travel",
      h2: "Travel with Comfort & Professionalism",
      paragraphs: [
        "Business Sedans are perfect for corporate clients and executives seeking comfortable, professional, and stylish travel.",
        "These vehicles provide ample legroom, smooth ride quality, and luggage space for up to 3 bags.",
        "Ideal for airport pickups, city commutes, business meetings, and corporate events ensuring a premium travel experience."
      ]
    }
  },
  'tempo-traveler': {
    name: 'Tempo Traveler',
    image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Tempo_2x.png',
    description: 'Large passenger van ideal for group travel, tours, and school trips.',
    features: [
      'Upto 12 passengers can travel comfortably.',
      'Accommodates upto 8 bags.',
      'AC & Non-AC options available.',
      'Spacious seating for group travel.',
      'Ideal for tours, school trips, and large families.'
    ],
    preferences: { comfort: true, premium: false, elite: true },
    content: {
      metaTitle: "Tempo Traveler Cabs | MotuCab",
      metaDescription: "Book tempo travelers for group travel or long trips.",
      metaKeywords: "tempo traveler, group travel, AC van, family trips, MotuCab",
      h1: "Spacious Tempo Travelers",
      h2: "Ideal for Large Groups",
      paragraphs: [
        "Tempo Travelers are perfect for group travel, school trips, and family outings with plenty of space and luggage capacity.",
        "Comfortable seating for up to 12 passengers, along with AC and Non-AC options for convenience.",
        "Perfect for long-distance travel, guided tours, and group excursions ensuring safety and comfort for everyone."
      ]
    }
  }
};


export const servicesTableData = {
  "Vehicle Age": [
    { name: "Age <= 5 years", comfort: "₹", premium: "₹", elite: "₹" },
    { name: "Age <= 3 years", comfort: false, premium: "₹", elite: "₹" },
    { name: "Luxury Fleet Age <= 2 years", comfort: false, premium: false, elite: "₹" },
    { name: "Well-maintained and sanitized vehicles", comfort: "₹", premium: "₹", elite: "₹" },
    { name: "Modern safety features like ABS & airbags", comfort: true, premium: true, elite: true },
  ],

  "Airport Services": [
    { name: "Meet & Greet (Airport pickup only)", comfort: false, premium: "₹", elite: true },
    { name: "Upto 2hr waiting at pickup (Airport pickup only)", comfort: false, premium: "₹", elite: true },
    { name: "Airport entry fee (Airport bound trip only)", comfort: true, premium: true, elite: true },
    { name: "Luggage assistance by driver", comfort: false, premium: "₹", elite: true },
    { name: "Priority pick-up & drop-off for elite customers", comfort: false, premium: false, elite: true },
  ],

  "Cancellation Policy": [
    { name: "Non refundable", comfort: true, premium: false, elite: false },
    { name: "6 Hr cancellation", comfort: true, premium: "₹", elite: false },
    { name: "1 Hr cancellation", comfort: true, premium: true, elite: true },
    { name: "Free cancellation for elite members up to 12 hours", comfort: false, premium: false, elite: true },
    { name: "Flexible rebooking options", comfort: true, premium: true, elite: true },
  ],

  "Other Services": [
    { name: "Driver language: English & Hindi", comfort: false, premium: true, elite: true },
    { name: "Complimentary water & newspaper", comfort: false, premium: true, elite: true },
    { name: "Driver uniform & professional appearance", comfort: false, premium: false, elite: true },
    { name: "GPS tracking & live ride updates", comfort: true, premium: true, elite: true },
    { name: "Priority support & helpline for premium and elite rides", comfort: false, premium: true, elite: true },
  ],

  "Ride Comfort & Amenities": [
    { name: "Air-conditioned ride", comfort: true, premium: true, elite: true },
    { name: "Clean, sanitized vehicle interior", comfort: true, premium: true, elite: true },
    { name: "Spacious legroom for all passengers", comfort: true, premium: true, elite: true },
    { name: "Music & entertainment options on premium and elite", comfort: false, premium: "₹", elite: true },
    { name: "Adjustable seating and cushioned comfort", comfort: false, premium: true, elite: true },
  ],

  "Extra Services": [
    { name: "Child seat availability on request", comfort: false, premium: true, elite: true },
    { name: "Extra luggage support for long trips", comfort: true, premium: true, elite: true },
    { name: "Customized route options", comfort: false, premium: "₹", elite: true },
    { name: "Multi-city or long-distance booking", comfort: true, premium: true, elite: true },
    { name: "Special requests like refreshments or stops", comfort: false, premium: "₹", elite: true },
  ],

  "Safety & Security": [
    { name: "Trained drivers with verified background", comfort: true, premium: true, elite: true },
    { name: "24/7 ride monitoring & GPS tracking", comfort: true, premium: true, elite: true },
    { name: "Insurance coverage for passengers", comfort: true, premium: true, elite: true },
    { name: "Emergency contact support", comfort: true, premium: true, elite: true },
    { name: "Vehicle safety features (ABS, airbags, fire extinguisher)", comfort: true, premium: true, elite: true },
  ],
};

