import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2 } from 'lucide-react';

const ManageNews = () => {
    const { adminToken } = useContext(AdminContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    const initialFormData = {
        title: '',
        summary: '',
        externalLink: '',
        publicationDate: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchArticles = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/news');
            setArticles(res.data.data || []);
        } catch (err) {
            setError('Failed to fetch articles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchArticles(); }, []);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode ? `http://localhost:5000/api/news/${editMode}` : 'http://localhost:5000/api/news';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Article ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchArticles();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };
    
    const handleEdit = (article) => {
        setEditMode(article._id);
        setFormData({
            title: article.title,
            summary: article.summary,
            externalLink: article.externalLink,
            publicationDate: new Date(article.publicationDate).toISOString().split('T')[0]
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this article?')) {
            try {
                await axios.delete(`http://localhost:5000/api/news/${id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
                alert('Article deleted successfully!');
                fetchArticles();
            } catch (err) {
                setError('Failed to delete article.');
            }
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage News Articles</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">{editMode ? 'Edit Article' : 'Add New Article'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Article Title" className="w-full p-3 border rounded-md" required />
                    <textarea name="summary" value={formData.summary} onChange={handleInputChange} placeholder="Article Summary..." rows="3" className="w-full p-3 border rounded-md" required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="externalLink" value={formData.externalLink} onChange={handleInputChange} placeholder="External Link (URL)" className="w-full p-3 border rounded-md" required />
                        <input name="publicationDate" type="date" value={formData.publicationDate} onChange={handleInputChange} className="w-full p-3 border rounded-md" required />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update Article' : 'Save Article'}</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Articles</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Publication Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map(article => (
                                <tr key={article._id} className="border-b">
                                    <td className="p-3 font-medium">{article.title}</td>
                                    <td className="p-3">{new Date(article.publicationDate).toLocaleDateString()}</td>
                                    <td className="p-3 flex gap-3">
                                        <button onClick={() => handleEdit(article)} className="text-blue-600"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(article._id)} className="text-red-600"><Trash2 size={18}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageNews;