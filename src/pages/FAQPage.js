import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/faqs/categories');
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Banner */}
      <div className="relative h-72 md:h-96 bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1581091215364-3e0b66e1f33f?auto=format&fit=crop&w=1600&q=80"
          alt="FAQ Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <HelpCircle size={60} className="text-blue-400 mb-4" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">Frequently Asked Questions</h1>
          <p className="mt-2 text-lg md:text-xl text-gray-200 max-w-2xl">
            Find answers to the most common questions about MotuCab services.
          </p>
        </div>
      </div>

      {/* Category Boxes */}
      {!loading && (
        <div className="max-w-6xl mx-auto py-10 px-4 md:px-6">
          <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-2">
            {categories.map(category => (
              <button
                key={category._id}
                onClick={() => scrollToCategory(category._id)}
                className="flex-shrink-0 bg-white shadow rounded-lg px-4 py-2 text-center hover:shadow-lg transition-shadow text-sm md:text-base font-medium text-gray-700 whitespace-nowrap"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Content */}
      <div className="max-w-5xl mx-auto py-16 px-4 md:px-6 space-y-12">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading FAQs...</p>
        ) : (
          categories.map(category => (
            <div key={category._id} id={category._id}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-400">
                {category.name}
              </h2>
              <div className="space-y-4">
                {category.faqs.map(faq => (
                  <div
                    key={faq._id}
                    className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden transition-shadow hover:shadow-lg"
                  >
                    <button
                      onClick={() => toggleFaq(faq._id)}
                      className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`transition-transform ${openFaq === faq._id ? 'rotate-180 text-blue-500' : 'text-gray-400'}`}
                      />
                    </button>
                    {openFaq === faq._id && (
                      <div className="p-4 border-t bg-gray-50 text-gray-600">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FAQPage;
