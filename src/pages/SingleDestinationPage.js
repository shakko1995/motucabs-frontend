import React from 'react';
import { useParams } from 'react-router-dom';

const SingleDestinationPage = () => {
  const { slug } = useParams();

  // Yahan aap slug ka istemal karke us specific destination ka data API se fetch kar sakte hain.
  // Abhi ke liye, hum sirf heading dikha rahe hain.
  const heading = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">Welcome to {heading}</h1>
      <p className="mt-4">This is the detailed page for {heading}.</p>
      {/* Yahan par aap us shehar ki details, photos, booking form etc. daal sakte hain */}
    </div>
  );
};

export default SingleDestinationPage;