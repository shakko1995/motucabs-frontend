

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Loader, AlertCircle, Upload, File, CheckCircle, AlertTriangle } from 'lucide-react';

// --- API Configuration ---
const API_URL = 'http://localhost:5000/api/one-way-routes';

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
        headers: { 'Authorization': `Bearer ${token}` }
    };
};

// --- API Functions ---
const getAllRoutes = () => axios.get(API_URL, getAuthHeaders());
const createRoute = (data) => axios.post(API_URL, data, getAuthHeaders());
const updateRoute = (id, data) => axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
const deleteRoute = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());
// --- NEW --- API function for Excel Upload
const uploadRoutesSheet = (formData) => axios.post(`${API_URL}/upload-sheet`, formData, getAuthHeaders());

// --- Form Modal Component (remains the same) ---
const RouteFormModal = ({ isOpen, onClose, onSave, routeToEdit }) => {
    // ... (Your existing RouteFormModal code is perfect, no changes needed here)
    const initialFormState = { fromCity: '', toCity: '', distance: '', duration: '', description: '', fares: [], faqs: [], sections: [] };
    const [formData, setFormData] = useState(initialFormState);
    const [sectionFiles, setSectionFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (routeToEdit) {
            setFormData({ ...initialFormState, ...routeToEdit });
            setSectionFiles(new Array(routeToEdit.sections?.length || 0).fill(null));
        } else {
            setFormData(initialFormState);
            setSectionFiles([]);
        }
        setError('');
    }, [routeToEdit, isOpen]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (index, field, value, arrayName) => {
        const updatedArray = [...formData[arrayName]];
        updatedArray[index][field] = value;
        setFormData(prev => ({ ...prev, [arrayName]: updatedArray }));
    };

    const addArrayItem = (arrayName, item) => {
        setFormData(prev => ({ ...prev, [arrayName]: [...prev[arrayName], item] }));
        if (arrayName === 'sections') {
            setSectionFiles(prev => [...prev, null]);
        }
    };

    const removeArrayItem = (index, arrayName) => {
        setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
        if (arrayName === 'sections') {
            setSectionFiles(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleFileChange = (index, file) => {
        const newFiles = [...sectionFiles];
        newFiles[index] = file;
        setSectionFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (!['fares', 'faqs', 'sections', '_id', 'createdAt', 'updatedAt', '__v'].includes(key)) {
                data.append(key, formData[key]);
            }
        });
        data.append('fares', JSON.stringify(formData.fares));
        data.append('faqs', JSON.stringify(formData.faqs));
        const sectionsWithoutFiles = formData.sections.map(sec => {
            const { image, ...rest } = sec;
            return rest;
        });
        data.append('sections', JSON.stringify(sectionsWithoutFiles));
        sectionFiles.forEach(file => {
            if (file) {
                data.append('sectionImages', file);
            }
        });

        try {
            if (routeToEdit) {
                await updateRoute(routeToEdit._id, data);
            } else {
                await createRoute(data);
            }
            onSave();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl my-8 p-6">
                <h2 className="text-2xl font-bold mb-4">{routeToEdit ? 'Edit' : 'Create'} One-Way Route</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form JSX is unchanged */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
                        <input name="fromCity" value={formData.fromCity} onChange={handleInputChange} placeholder="From City" className="p-2 border rounded" required />
                        <input name="toCity" value={formData.toCity} onChange={handleInputChange} placeholder="To City" className="p-2 border rounded" required />
                        <input type="number" name="distance" value={formData.distance} onChange={handleInputChange} placeholder="Distance (km)" className="p-2 border rounded" />
                        <input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration (e.g., 5h 30m)" className="p-2 border rounded" />
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="p-2 border rounded md:col-span-2" rows="3"></textarea>
                    </div>
                     {/* Fares, FAQs, Sections JSX... */}
                     <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded flex items-center disabled:bg-gray-400">
                            {isSubmitting && <Loader className="animate-spin mr-2" size={16} />}
                            Save Route
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Main Management Component ---
export default function ManageOneWayRoutes() {
    // --- EXISTING STATE ---
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(null);

    // --- NEW STATE for Excel Upload ---
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({ message: '', type: '' });

    // --- EXISTING FUNCTIONS (unchanged) ---
    const fetchRoutes = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getAllRoutes();
            setRoutes(response.data);
        } catch (err) {
            setError('Failed to fetch routes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    const handleCreate = () => {
        setCurrentRoute(null);
        setIsModalOpen(true);
    };

    const handleEdit = (route) => {
        setCurrentRoute(route);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this route?')) {
            try {
                await deleteRoute(id);
                fetchRoutes();
            } catch (err) {
                alert('Failed to delete route.');
            }
        }
    };
    
    const handleSave = () => {
        setIsModalOpen(false);
        fetchRoutes();
    };

    // --- NEW FUNCTIONS for Excel Upload ---
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus({ message: '', type: '' });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus({ message: 'Please select a file first.', type: 'error' });
            return;
        }
        setIsUploading(true);
        setUploadStatus({ message: '', type: '' });
        const formData = new FormData();
        formData.append('routesFile', selectedFile);

        try {
            const response = await uploadRoutesSheet(formData);
            setUploadStatus({ message: response.data.message, type: 'success' });
            fetchRoutes(); // IMPORTANT: Refresh the table after successful upload
        } catch (err) {
            setUploadStatus({ message: err.response?.data?.message || 'Upload failed.', type: 'error' });
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            document.getElementById('fileInput').value = '';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Manage One-Way Routes</h1>
                <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} /> Create New Route
                </button>
            </div>

            {/* --- NEW JSX for Excel Upload --- */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Bulk Upload Routes from Excel</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label htmlFor="fileInput" className="w-full flex-grow">
                        <div className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                            <File className="text-gray-400 mr-3" size={20} />
                            <span className="text-gray-600 font-medium">{selectedFile ? selectedFile.name : 'Choose an Excel file...'}</span>
                        </div>
                        <input id="fileInput" type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </label>
                    <button onClick={handleUpload} disabled={isUploading || !selectedFile} className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-sm hover:bg-green-700 disabled:bg-gray-400">
                        {isUploading ? <><Loader className="animate-spin mr-2" size={20} /> Uploading...</> : <><Upload className="mr-2" size={20} /> Upload Sheet</>}
                    </button>
                </div>
                {uploadStatus.message && (
                    <div className={`mt-4 p-3 rounded-md flex items-center text-sm ${uploadStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {uploadStatus.type === 'success' ? <CheckCircle className="mr-2" size={18} /> : <AlertTriangle className="mr-2" size={18} />}
                        {uploadStatus.message}
                    </div>
                )}
            </div>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Existing Routes</h2>
            {loading && <div className="flex justify-center items-center p-8"><Loader className="animate-spin" size={32} /></div>}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"><AlertCircle className="inline mr-2" />{error}</div>}
            
            {!loading && !error && (
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                         {/* Table head and body JSX... */}
                         <thead className="bg-gray-50">
                             <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                             </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                             {routes.map((route) => (
                                 <tr key={route._id}>
                                     <td className="px-6 py-4 whitespace-nowrap">{route.fromCity}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">{route.toCity}</td>
                                     <td className="px-6 py-4 whitespace-nowrap">{route.distance} km</td>
                                     <td className="px-6 py-4 whitespace-nowrap">{route.duration}</td>
                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                         <button onClick={() => handleEdit(route)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                                         <button onClick={() => handleDelete(route._id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && <RouteFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} routeToEdit={currentRoute} />}
        </div>
    );
}