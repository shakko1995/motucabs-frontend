import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const DynamicPage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/pages/${slug}`);
                setPage(res.data.page);
            } catch (err) {
                setError("Failed to load page.");
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!page) return null;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* SEO */}
            <Helmet>
                <title>{page.metaTitle || page.title}</title>
                <meta name="description" content={page.metaDescription} />
                <meta name="keywords" content={page.metaKeywords?.join(", ")} />
                <meta property="og:title" content={page.metaOgTitle || page.title} />
                <meta property="og:description" content={page.metaOgDescription || page.metaDescription} />
                {page.metaOgImage && <meta property="og:image" content={page.metaOgImage} />}
            </Helmet>

            {/* Hero Banner */}
          {/* Hero Banner */}
{page.bannerImage && (
  <div className="relative w-full h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
    <img
      src={page.bannerImage}
      alt={page.bannerAltText || page.title}
      className="w-full h-full object-contain"
    />
    <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center p-6 md:p-12 text-center">
      {page.bannerTitle && (
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg"
        >
          {page.bannerTitle}
        </motion.h1>
      )}
      {page.bannerSubtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/90 mt-2 text-lg md:text-2xl"
        >
          {page.bannerSubtitle}
        </motion.p>
      )}
      {page.ctaText && page.ctaLink && (
        <motion.a
          href={page.ctaLink}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
        >
          {page.ctaText}
        </motion.a>
      )}
    </div>
  </div>
)}

            {/* Page Title & Subtitle */}
            <div className="max-w-6xl mx-auto px-4 py-10 text-center md:text-left">
                <h2 className="text-4xl font-bold text-gray-900">{page.title}</h2>
                {page.subtitle && <p className="text-gray-700 mt-2 text-lg">{page.subtitle}</p>}
            </div>

            {/* Sections */}
            <div className="max-w-6xl mx-auto px-4 space-y-12 py-6">
                {page.sections?.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className={`flex flex-col md:flex-row items-center md:space-x-8 ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {section.image && (
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={section.image}
                                alt={section.imageAltText || section.heading}
                                title={section.imageTitle || ""}
                                className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-xl shadow-lg"
                            />
                        )}
                        <div className="mt-4 md:mt-0 md:w-1/2">
                            {section.heading && (
                                <h3 className="text-2xl font-semibold text-gray-900">{section.heading}</h3>
                            )}
                            {section.subheading && (
                                <h4 className="text-gray-700 mt-1">{section.subheading}</h4>
                            )}
                            {section.paragraph && <p className="mt-3 text-gray-600 leading-relaxed">{section.paragraph}</p>}
                            {section.ctaText && section.ctaLink && (
                                <a
                                    href={section.ctaLink}
                                    className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-lg transition"
                                >
                                    {section.ctaText}
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* FAQs */}
            {page.faqs?.length > 0 && (
                <div className="max-w-6xl mx-auto px-4 py-10">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h3>
                    <div className="space-y-4">
                        {page.faqs.map((faq, idx) => (
                            <details
                                key={idx}
                                className="bg-white rounded-xl shadow-md p-4 transition-all duration-300"
                            >
                                <summary className="cursor-pointer font-semibold text-gray-900">{faq.question}</summary>
                                <p className="mt-2 text-gray-600">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            )}

            {/* Published/Draft Badge */}
            <div className="max-w-6xl mx-auto px-4 py-4 text-center md:text-left">
                <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${page.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                >
                    {page.isPublished ? "Published" : "Draft"}
                </span>
            </div>
        </div>
    );
};

export default DynamicPage;
