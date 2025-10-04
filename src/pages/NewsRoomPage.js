import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsRoomPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/news');
                setArticles(res.data.data || []);
            } catch (err) {
                console.error("Failed to fetch news articles", err);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    // ✅ Ensure URL has https:// if missing
    const getFullUrl = (url) => {
        if (!url) return '#';
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };

    return (
        <div className="bg-white">
            {/* Hero Banner */}
            <div className="relative h-80 md:h-[28rem] w-full">
                <img
                    src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1600"
                    alt="News background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                        News Room
                    </h1>
                    <p className="text-white text-xl mt-3 drop-shadow-md">
                        Latest updates and stories from MotuCab
                    </p>
                </div>
            </div>

            {/* News Cards */}
            <div className="max-w-6xl mx-auto py-20 px-4">
                {loading ? (
                    <p className="text-center text-gray-500 text-lg">Loading articles...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {articles.map(article => (
                            <div key={article._id} className="flex flex-col bg-white rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                {article.imageUrl && (
                                    <img
                                        src={article.imageUrl}
                                        alt={article.title}
                                        className="h-64 md:h-72 w-full object-cover"
                                    />
                                )}
                                <div className="p-8 flex flex-col flex-grow">
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 line-clamp-2">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-5">
                                        {new Date(article.publicationDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-slate-600 flex-grow text-lg line-clamp-4">
                                        {article.summary}
                                    </p>
                                    <div className="mt-8 text-right">
                                        <a
                                            href={getFullUrl(article.externalLink)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 text-white font-semibold py-3 px-7 rounded-xl text-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsRoomPage;
