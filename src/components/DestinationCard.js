import React from 'react';

const DestinationCard = ({ destination }) => {
  return (
    <a
      href={destination.link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="bg-white rounded-10xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <img
            src={destination.image?.url}
            alt={destination.heading}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x500?text=Destination+Image';
            }}
          />
        </div>

        {/* Content Section */}
        <div className="p-6 bg-white">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
            {destination.heading}
          </h3>
          <p className="text-base text-gray-600 line-clamp-3 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default DestinationCard;
