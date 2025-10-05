import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2 } from 'lucide-react';

const ManageFAQ = () => {
    const { adminToken } = useContext(AdminContext);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categoryName, setCategoryName] = useState("");
    const [faqData, setFaqData] = useState({ question: "", answer: "" });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editingFAQ, setEditingFAQ] = useState(null);

    const API_BASE = "http://localhost:5000/api/faqs"; // Correct base URL

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_BASE}/categories`, { headers: { Authorization: `Bearer ${adminToken}` } });
            setCategories(res.data.categories || []);
        } catch (err) {
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, [adminToken]);

    const handleAddCategory = async () => {
        if (!categoryName) return;
        try {
            await axios.post(`${API_BASE}/category`, { name: categoryName }, { headers: { Authorization: `Bearer ${adminToken}` } });
            setCategoryName("");
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to add category.");
        }
    };

    const handleAddOrUpdateFAQ = async () => {
        if (!selectedCategory || !faqData.question || !faqData.answer) return;
        
        const url = editingFAQ
            ? `${API_BASE}/category/${selectedCategory._id}/faq/${editingFAQ._id}`
            : `${API_BASE}/category/${selectedCategory._id}/faq`;
        const method = editingFAQ ? 'put' : 'post';
        
        try {
            await axios[method](url, faqData, { headers: { Authorization: `Bearer ${adminToken}` } });
            setFaqData({ question: "", answer: "" });
            setEditingFAQ(null);
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save FAQ.');
        }
    };

    const handleDeleteFAQ = async (categoryId, faqId) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await axios.delete(`${API_BASE}/category/${categoryId}/faq/${faqId}`, { headers: { Authorization: `Bearer ${adminToken}` } });
                fetchCategories();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete FAQ.');
            }
        }
    };
    
    const handleEditFAQ = (category, faq) => {
        setSelectedCategory(category);
        setFaqData({ question: faq.question, answer: faq.answer });
        setEditingFAQ(faq);
        window.scrollTo(0, 0);
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage FAQs</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8 space-y-6">
                <div>
                    <label className="font-semibold mb-2 block">Create New Category</label>
                    <div className="flex gap-2">
                        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Category Name" className="w-full p-2 border rounded"/>
                        <button onClick={handleAddCategory} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
                    </div>
                </div>

                <div>
                    <label className="font-semibold mb-2 block">Add or Edit FAQ</label>
                    <select value={selectedCategory?._id || ""} onChange={(e) => setSelectedCategory(categories.find(c => c._id === e.target.value))} className="w-full p-2 border rounded mb-2 bg-white">
                        <option value="">-- Select a Category --</option>
                        {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>

                    {selectedCategory && (
                        <div className="space-y-2 mt-2">
                            <input type="text" value={faqData.question} onChange={(e) => setFaqData({ ...faqData, question: e.target.value })} placeholder="Question" className="w-full p-2 border rounded"/>
                            <textarea value={faqData.answer} onChange={(e) => setFaqData({ ...faqData, answer: e.target.value })} placeholder="Answer" rows="3" className="w-full p-2 border rounded"></textarea>
                            <button onClick={handleAddOrUpdateFAQ} className="bg-green-600 text-white px-4 py-2 rounded">{editingFAQ ? "Update FAQ" : "Add FAQ"}</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing FAQs by Category</h2>
                {categories.map(category => (
                    <div key={category._id} className="mb-4">
                        <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                        <ul className="space-y-2">
                            {category.faqs.map(faq => (
                                <li key={faq._id} className="flex justify-between items-start bg-gray-50 p-3 rounded">
                                    <div>
                                        <p className="font-semibold">{faq.question}</p>
                                        <p className="text-sm text-gray-600">{faq.answer}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditFAQ(category, faq)}><Edit size={18}/></button>
                                        <button onClick={() => handleDeleteFAQ(category._id, faq._id)}><Trash2 size={18}/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageFAQ;