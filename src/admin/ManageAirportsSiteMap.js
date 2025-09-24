import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageAirportsSiteMap = () => {
    const { adminToken } = useContext(AdminContext);
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    const initialFormData = {
        name: '',
        code: '',
        slug: '',
        description: '',
        transfers: [],
        whyBook: [],
        extraInfo: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchAirports = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/airports');
            setAirports(res.data || []);
        } catch (err) {
            setError('Failed to fetch airports.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAirports(); }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "whyBook") {
            setFormData(prev => ({ ...prev, whyBook: value.split(',').map(item => item.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTransferChange = (index, e) => {
        const { name, value } = e.target;
        const newTransfers = [...formData.transfers];
        newTransfers[index][name] = value;
        setFormData(prev => ({ ...prev, transfers: newTransfers }));
    };

    const addTransfer = () => {
        setFormData(prev => ({ ...prev, transfers: [...prev.transfers, { destination: '', price: '' }] }));
    };

    const removeTransfer = (index) => {
        setFormData(prev => ({ ...prev, transfers: formData.transfers.filter((_, i) => i !== index) }));
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode ? `http://localhost:5000/api/airports/${editMode}` : 'http://localhost:5000/api/airports';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Airport ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchAirports();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };
    
    const handleEdit = (airport) => {
        setEditMode(airport._id);
        setFormData({
            name: airport.name,
            code: airport.code,
            slug: airport.slug,
            description: airport.description || '',
            transfers: airport.transfers || [],
            whyBook: airport.whyBook || [],
            extraInfo: airport.extraInfo || '',
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this airport?')) {
            try {
                await axios.delete(`http://localhost:5000/api/airports/${id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
                alert('Airport deleted successfully!');
                fetchAirports();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete airport.');
            }
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Airports for Sitemap</h1>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">{editMode ? 'Edit Airport' : 'Add New Airport'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm font-medium">Airport Name</label>
                            <input name="name" value={formData.name} onChange={handleInputChange} className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Airport Code (e.g., ATQ)</label>
                            <input name="code" value={formData.code} onChange={handleInputChange} className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                        <div>
                            <label className="text-sm font-medium">URL Slug (e.g., amritsar-airport)</label>
                            <input name="slug" value={formData.slug} onChange={handleInputChange} className="mt-1 w-full p-3 border rounded-md" required />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="mt-1 w-full p-3 border rounded-md"></textarea>
                    </div>
                    
                    <fieldset className="border p-4 rounded-md">
                        <legend className="px-2 font-semibold">Popular Transfers</legend>
                        {formData.transfers.map((transfer, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
                                <input name="destination" value={transfer.destination} onChange={(e) => handleTransferChange(index, e)} placeholder="Destination City" className="p-2 border rounded-md"/>
                                <input name="price" type="number" value={transfer.price} onChange={(e) => handleTransferChange(index, e)} placeholder="Price (₹)" className="p-2 border rounded-md"/>
                                <button type="button" onClick={() => removeTransfer(index)} className="text-red-500 justify-self-center"><XCircle size={18}/></button>
                            </div>
                        ))}
                        <button type="button" onClick={addTransfer} className="flex items-center gap-2 bg-gray-200 text-sm py-2 px-4 rounded-md"><PlusCircle size={16}/> Add Transfer</button>
                    </fieldset>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update Airport' : 'Save Airport'}</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-2xl font-semibold mb-4">Existing Airports</h2>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Slug</th>
                                <th className="p-3 text-left">Code</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {airports.map(airport => (
                                <tr key={airport._id} className="border-b">
                                    <td className="p-3 font-medium">{airport.name}</td>
                                    <td className="p-3">/{airport.slug}</td>
                                    <td className="p-3">{airport.code}</td>
                                    <td className="p-3 flex gap-3">
                                        <button onClick={() => handleEdit(airport)} className="text-blue-600"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(airport._id)} className="text-red-600"><Trash2 size={18}/></button>
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

export default ManageAirportsSiteMap;