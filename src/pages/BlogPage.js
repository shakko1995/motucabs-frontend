// import React, { useState, useEffect } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { Search } from 'lucide-react';

// const BlogPage = () => {
//     const [posts, setPosts] = useState([]);
//     const [recentPosts, setRecentPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchPosts = async () => {
//             setLoading(true);
//             try {
//                 const query = searchParams.get('q') || '';
//                 const res = await axios.get(`http://localhost:5000/api/blogs?page=${currentPage}&limit=10&search=${query}`);
//                 setPosts(res.data.blogs || []);
//                 setTotalPages(res.data.pages || 1);

//                 if (currentPage === 1 && !query) {
//                     const recentRes = await axios.get(`http://localhost:5000/api/blogs/recent`);
//                     setRecentPosts(recentRes.data.blogs || []);
//                 }
//             } catch (err) {
//                 console.error("Failed to fetch blog posts", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPosts();
//     }, [currentPage, searchParams]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setCurrentPage(1);
//         setSearchParams({ q: searchTerm });
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen">

//             {/* Banner Section */}
//             <div className="relative h-64 md:h-80">
//                 <img
//                     src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
//                     alt="Blog Banner"
//                     className="absolute inset-0 w-full h-full object-cover opacity-70"
//                 />
//                 <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
//                     <h1 className="text-3xl md:text-5xl font-extrabold text-white">MotuCab Blog</h1>
//                     <p className="mt-2 text-lg md:text-xl text-gray-200 max-w-2xl">
//                         Explore travel tips, updates, and guides from MotuCab.
//                     </p>
//                 </div>
//             </div>

//             {/* Main Blog Content */}
//             <div className="max-w-6xl mx-auto py-12 px-4">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
//                     {/* Blog Posts */}
//                     <div className="md:col-span-2">
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//                             {loading ? (
//                                 <p>Loading posts...</p>
//                             ) : posts.length > 0 ? (
//                                 posts.map(post => (
//                                     <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
//                                         <Link to={`/blog/${post.slug}`}>
//                                             <img 
//                                                 src={post.imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'} 
//                                                 alt={post.title} 
//                                                 className="w-full h-80 md:h-72 object-cover"
//                                             />
//                                         </Link>
//                                         <div className="p-6 flex flex-col flex-grow">
//                                             <p className="text-sm text-gray-500 mb-2">
//                                                 {new Date(post.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                                             </p>
//                                             <h2 className="text-xl font-bold text-slate-800 hover:text-blue-600 flex-grow">
//                                                 <Link to={`/blog/${post.slug}`}>{post.title}</Link>
//                                             </h2>
//                                             <p className="text-slate-600 mt-2 text-sm md:text-base">{post.summary}</p>
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <p>No blog posts found.</p>
//                             )}
//                         </div>

//                         {/* Pagination */}
//                         <div className="mt-12 flex justify-center items-center space-x-2">
//                             <button 
//                                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
//                                 disabled={currentPage === 1} 
//                                 className="p-2 bg-white rounded-md shadow"
//                             >&lt;</button>
//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                                 <button 
//                                     key={page} 
//                                     onClick={() => setCurrentPage(page)} 
//                                     className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white shadow'}`}
//                                 >
//                                     {page}
//                                 </button>
//                             ))}
//                             <button 
//                                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
//                                 disabled={currentPage === totalPages} 
//                                 className="p-2 bg-white rounded-md shadow"
//                             >&gt;</button>
//                         </div>
//                     </div>

//                     {/* Sidebar */}
//                     <aside className="md:col-span-1 space-y-8">
//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="font-bold text-lg mb-4">Search for Travel Content</h3>
//                             <form onSubmit={handleSearch} className="relative">
//                                 <input 
//                                     type="text" 
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     placeholder="Search..." 
//                                     className="w-full p-3 border rounded-l-md"
//                                 />
//                                 <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-white rounded-r-md"><Search size={18}/></button>
//                             </form>
//                         </div>

//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="font-bold text-lg mb-4">About MotuCab Car Rentals</h3>
//                             <p className="text-sm text-slate-600">
//                                 MotuCab is India's premier chauffeur driven car rental service. Since our inception, we have constantly strived to offer reliable, safe and affordable cabs.
//                             </p>
//                         </div>

//                         <div className="bg-white p-6 rounded-lg shadow-md">
//                             <h3 className="font-bold text-lg mb-4">More Travel Topics</h3>
//                             <ul className="space-y-2 text-sm">
//                                 {recentPosts.map(post => (
//                                     <li key={post._id}>
//                                         <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">{post.title}</Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </aside>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BlogPage;


import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const query = searchParams.get('q') || '';
                const res = await axios.get(`http://localhost:5000/api/blogs?page=${currentPage}&limit=10&search=${query}&isPublished=true`);
                setPosts(res.data.blogs || []);
                setTotalPages(res.data.pages || 1);

                if (currentPage === 1 && !query) {
                    const recentRes = await axios.get(`http://localhost:5000/api/blogs?page=1&limit=5&isPublished=true&sort=-publishedDate`);
                    setRecentPosts(recentRes.data.blogs || []);
                }
            } catch (err) {
                console.error("Failed to fetch blog posts", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [currentPage, searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setSearchParams({ q: searchTerm });
    };

    // Get image from admin fields: bannerImage, metaOgImage, or first image section
    const getImageUrl = (post) => {
        return post.bannerImage || 
               post.metaOgImage || 
               post.sections?.find(s => s.blockType === 'image')?.image ||
               'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
    };

    // Get summary from admin fields: subtitle or metaDescription
    const getSummary = (post) => {
        if (post.subtitle) return post.subtitle;
        if (post.metaDescription) return post.metaDescription;
        
        // Fallback: extract from first paragraph section
        const firstPara = post.sections?.find(s => s.blockType === 'paragraph');
        if (firstPara?.paragraph) {
            const text = firstPara.paragraph.replace(/<[^>]*>/g, '');
            return text.length > 120 ? text.substring(0, 120) + '...' : text;
        }
        
        return 'Read more about this topic...';
    };

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Banner Section */}
            <div className="relative h-64 md:h-80">
                <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
                    alt="Blog Banner"
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white">MotuCab Blog</h1>
                    <p className="mt-2 text-lg md:text-xl text-gray-200 max-w-2xl">
                        Explore travel tips, updates, and guides from MotuCab.
                    </p>
                </div>
            </div>

            {/* Main Blog Content */}
            <div className="max-w-6xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    
                    {/* Blog Posts */}
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {loading ? (
                                <p>Loading posts...</p>
                            ) : posts.length > 0 ? (
                                posts.map(post => (
                                    <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                                        <Link to={`/blog/${post.slug}`}>
                                            <img 
                                                src={getImageUrl(post)} 
                                                alt={post.bannerAltText || post.title}
                                                title={post.bannerTitle || post.title}
                                                className="w-full h-80 md:h-72 object-cover"
                                            />
                                        </Link>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <p className="text-sm text-gray-500 mb-2">
                                                {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', { 
                                                    year: 'numeric', 
                                                    month: 'long', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                            <h2 className="text-xl font-bold text-slate-800 hover:text-blue-600 flex-grow">
                                                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h2>
                                            <p className="text-slate-600 mt-2 text-sm md:text-base">
                                                {getSummary(post)}
                                            </p>
                                            
                                            {/* Show category and tags */}
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                                                    {post.category}
                                                </span>
                                                {post.tags && post.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            
                                            {/* Show author and read time if available */}
                                            {(post.authorName || post.readTime) && (
                                                <div className="mt-3 text-xs text-gray-500 flex gap-3">
                                                    {post.authorName && <span>By {post.authorName}</span>}
                                                    {post.readTime && <span>• {post.readTime}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No blog posts found.</p>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-12 flex justify-center items-center space-x-2">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                                disabled={currentPage === 1} 
                                className="p-2 bg-white rounded-md shadow"
                            >&lt;</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button 
                                    key={page} 
                                    onClick={() => setCurrentPage(page)} 
                                    className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white shadow'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                                disabled={currentPage === totalPages} 
                                className="p-2 bg-white rounded-md shadow"
                            >&gt;</button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="md:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg mb-4">Search for Travel Content</h3>
                            <form onSubmit={handleSearch} className="relative">
                                <input 
                                    type="text" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..." 
                                    className="w-full p-3 border rounded-l-md"
                                />
                                <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-white rounded-r-md">
                                    <Search size={18}/>
                                </button>
                            </form>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg mb-4">About MotuCab Car Rentals</h3>
                            <p className="text-sm text-slate-600">
                                MotuCab is India's premier chauffeur driven car rental service. Since our inception, we have constantly strived to offer reliable, safe and affordable cabs.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold text-lg mb-4">More Travel Topics</h3>
                            <ul className="space-y-2 text-sm">
                                {recentPosts.map(post => (
                                    <li key={post._id}>
                                        <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                                            {post.title}
                                        </Link>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
