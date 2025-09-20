export const fleetCategories = [
    { name: 'Compact', slug: 'compact', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png', features: ['Upto 4 passengers', '2 small bags'] },
    { name: 'Sedan', slug: 'sedan', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png', features: ['Upto 4 passengers', '2 mid-sized bags'] },
    { name: 'Small SUV', slug: 'small-suv', image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png', features: ['Upto 5-6 passengers', '3 mid-sized bags'] },
    // Add other categories here...
];

// Detailed fleet data with metaKeywords added
export const fleetDetailsData = {
    compact: {
        name: 'Compact',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Hatchback_2x.png',
        description: 'Most economical cab class, perfect for short trips and budget-conscious travelers.',
        features: [
            'Upto 4 passengers can travel.',
            'Accommodates upto 2 small sized bags.',
            'Available in Diesel and Petrol combustion.'
        ],
        preferences: { comfort: true, premium: true, elite: false },

        content: {
            metaTitle: "Compact Cabs | MotuCab",
            metaDescription: "Book affordable and reliable compact cabs like Indica and Swift for your city travel.",
            metaKeywords: "compact cab, city cab, economical taxi, Indica, Swift, MotuCab",
            h1: "Compact Cars for City Travel",
            h2: "Why Choose a Compact Cab?",
            paragraphs: [
                "Our compact cars are the most economical choice for solo travelers and small families. They are perfect for navigating city traffic and short-distance trips.",
                "With comfortable seating for up to 4 passengers and space for luggage, our compact fleet offers a great balance of affordability and convenience."
            ]
        }
    },

    sedan: {
        name: 'Sedan',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/Sedan_2x.png',
        description: 'An affordable cab category, ideal for city rides and small group travel.',
        features: [
            'Upto 4 passengers can travel.',
            'Accommodates upto 2 mid sized bags.',
            'Available in eco-fuels like CNG combustion.'
        ],
        preferences: { comfort: true, premium: true, elite: false },

        content: {
            metaTitle: "Sedan Cabs | MotuCab",
            metaDescription: "Book comfortable sedan cabs like Dzire and Etios for a premium travel experience.",
            metaKeywords: "sedan cab, Dzire, Etios, premium taxi, city cab, MotuCab",
            h1: "Comfortable Sedan Cars",
            h2: "Experience Premium Travel",
            paragraphs: [
                "Our sedan fleet offers a step up in comfort and space, making it perfect for business travel or families looking for a more premium experience.",
                "Enjoy a smooth ride with professional drivers and ample space for your luggage."
            ]
        }
    },

    'small-suv': {
        name: 'Small SUV',
        image: 'https://jsak.mmtcdn.com/cabs_cdn_dt/image/LighterFunnel_Cabs/SUV_2x.png',
        description: 'Ideal for group travel or road trips, have ample space and comfort.',
        features: [
            'Upto 6 passengers',
            '3 mid-sized bags',
            'Available in Diesel & Petrol'
        ],
        preferences: { comfort: true, premium: true, elite: false },

        content: {
            metaTitle: "Small SUV Cabs | MotuCab",
            metaDescription: "Book spacious small SUV cabs like Ertiga and Xylo for group trips and family outings.",
            metaKeywords: "small suv, ertiga, Xylo, group travel cab, family cab, MotuCab",
            h1: "Spacious Small SUVs",
            h2: "Travel Together in Comfort",
            paragraphs: [
                "Our small SUVs are designed for group travel and road trips, offering more space and comfort than sedans.",
                "With seating for up to 6 passengers and extra luggage capacity, they are the perfect choice for families and friends traveling together."
            ]
        }
    },

    // Add metaKeywords similarly for SUV, Luxury, Tempo Traveler
};

export const servicesTableData = {
    "Vehicle Age": [
        { name: "Age <= 5 years", comfort: "₹", premium: true, elite: true },
        { name: "Age <= 3 years", comfort: false, premium: "₹", elite: "₹" },
    ],
    "Airport Services": [
        { name: "Meet & Greet (Airport pickup only)", comfort: false, premium: "₹", elite: true },
        { name: "Upto 2hr waiting at pickup (Airport pickup only)", comfort: false, premium: "₹", elite: true },
        { name: "Airport entry fee (Airport bound trip only)", comfort: true, premium: true, elite: true },
    ],
    "Cancellation Policy": [
        { name: "Non refundable", comfort: true, premium: false, elite: false },
        { name: "6 Hr cancellation", comfort: true, premium: "₹", elite: false },
        { name: "1 Hr cancellation", comfort: true, premium: true, elite: true },
    ],
    "Other Services": [
        { name: "Driver language", comfort: false, premium: true, elite: true },
        { name: "Water newspaper", comfort: false, premium: true, elite: true },
        { name: "Uniform", comfort: false, premium: false, elite: true },
    ]
};

