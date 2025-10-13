import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Loader, AlertCircle, Upload, File, CheckCircle, AlertTriangle, Car, HelpCircle, FileText } from 'lucide-react';

// --- API Configuration ---
const API_URL = 'http://localhost:5000/api/car-attachment';

const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-Type' is set by axios for FormData
        }
    };
};

// --- API Functions ---
const getAllAttachments = () => axios.get(API_URL, getAuthHeaders());
const createAttachment = (data) => axios.post(API_URL, data, getAuthHeaders());
const updateAttachment = (id, data) => axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
const deleteAttachment = (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders());
const uploadAttachmentsSheet = (formData) => axios.post(`${API_URL}/upload-sheet`, formData, {
     headers: { ...getAuthHeaders().headers, 'Content-Type': 'multipart/form-data' }
});


// --- Form Modal Component ---
const AttachmentFormModal = ({ isOpen, onClose, onSave, attachmentToEdit }) => {
    const initialFormState = {
        city: '',
        title: '',
        description: '',
        metaTitle: '',
        metaDescription: '',
        fleets: [],
        faqs: [],
        sections: [],
    };

    const [formData, setFormData] = useState(initialFormState);
    const [sectionFiles, setSectionFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (attachmentToEdit) {
            setFormData({ ...initialFormState, ...attachmentToEdit });
            setSectionFiles(new Array(attachmentToEdit.sections?.length || 0).fill(null));
        } else {
            setFormData(initialFormState);
            setSectionFiles([]);
        }
        setError('');
    }, [attachmentToEdit, isOpen]);

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
        if (arrayName === 'sections') setSectionFiles(prev => [...prev, null]);
    };

    const removeArrayItem = (index, arrayName) => {
        setFormData(prev => ({ ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) }));
        if (arrayName === 'sections') setSectionFiles(prev => prev.filter((_, i) => i !== index));
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

        // Append simple fields
        Object.keys(formData).forEach(key => {
            if (!['fleets', 'faqs', 'sections', '_id', 'createdAt', 'updatedAt', '__v', 'slug'].includes(key)) {
                data.append(key, formData[key]);
            }
        });

        // Append arrays without images as JSON strings
        data.append('fleets', JSON.stringify(formData.fleets));
        data.append('faqs', JSON.stringify(formData.faqs));

        // For sections, stringify the text data and append files separately
        const sectionsWithoutFiles = formData.sections.map(s => ({ ...s, image: s.image || '' }));
        data.append('sections', JSON.stringify(sectionsWithoutFiles));

        sectionFiles.forEach(file => {
            if (file) {
                data.append('sectionImages', file); // Must match the key in your backend route
            }
        });

        try {
            if (attachmentToEdit) {
                await updateAttachment(attachmentToEdit._id, data);
            } else {
                await createAttachment(data);
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
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{attachmentToEdit ? 'Edit' : 'Create'} Car Attachment Page</h2>
                {error && <div className="mb-4 p-3 rounded-md bg-red-100 text-red-800 flex items-center"><AlertTriangle size={18} className="mr-2" />{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- Basic Info --- */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-gray-700">Basic Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="city" value={formData.city} onChange={handleInputChange} placeholder="City (e.g., Patna)" className="p-2 border rounded" required />
                            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Page Title" className="p-2 border rounded" />
                            <input name="metaTitle" value={formData.metaTitle} onChange={handleInputChange} placeholder="Meta Title (for SEO)" className="p-2 border rounded" />
                            <input name="metaDescription" value={formData.metaDescription} onChange={handleInputChange} placeholder="Meta Description (for SEO)" className="p-2 border rounded" />
                            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Short Description" className="p-2 border rounded md:col-span-2" rows="3"></textarea>
                        </div>
                    </fieldset>

                    {/* --- Fleet Types --- */}
                    <fieldset className="border p-4 rounded-md space-y-4">
                        <legend className="text-lg font-semibold px-2 text-gray-700 flex items-center gap-2"><Car size={20} /> Fleet Types</legend>
                        {formData.fleets.map((fleet, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-md relative">
                                <input value={fleet.vehicleType} onChange={(e) => handleArrayChange(index, 'vehicleType', e.target.value, 'fleets')} placeholder="Vehicle Type (e.g., Hatchback)" className="p-2 border rounded" />
                                <input type="number" value={fleet.capacity} onChange={(e) => handleArrayChange(index, 'capacity', e.target.value, 'fleets')} placeholder="Capacity (e.g., 4)" className="p-2 border rounded" />
                                <input value={fleet.description} onChange={(e) => handleArrayChange(index, 'description', e.target.value, 'fleets')} placeholder="Description" className="p-2 border rounded" />
                                <button type="button" onClick={() => removeArrayItem(index, 'fleets')} className="absolute top-1 right-1 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('fleets', { vehicleType: '', capacity: '', description: '' })} className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                            Add Fleet Type
                        </button>
                    </fieldset>

                    {/* --- FAQs --- */}
                    <fieldset className="border p-4 rounded-md space-y-4">
                        <legend className="text-lg font-semibold px-2 text-gray-700 flex items-center gap-2"><HelpCircle size={20} /> FAQs</legend>
                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md relative space-y-2">
                                <input value={faq.question} onChange={(e) => handleArrayChange(index, 'question', e.target.value, 'faqs')} placeholder="Question" className="p-2 border rounded w-full" />
                                <textarea value={faq.answer} onChange={(e) => handleArrayChange(index, 'answer', e.target.value, 'faqs')} placeholder="Answer" className="p-2 border rounded w-full" rows="2"></textarea>
                                <button type="button" onClick={() => removeArrayItem(index, 'faqs')} className="absolute top-1 right-1 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                            Add FAQ
                        </button>
                    </fieldset>

                    {/* --- Content Sections --- */}
                    <fieldset className="border p-4 rounded-md space-y-4">
                        <legend className="text-lg font-semibold px-2 text-gray-700 flex items-center gap-2"><FileText size={20} /> Content Sections</legend>
                        {formData.sections.map((section, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md relative space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input value={section.heading} onChange={(e) => handleArrayChange(index, 'heading', e.target.value, 'sections')} placeholder="Heading" className="p-2 border rounded" />
                                    <input value={section.subheading} onChange={(e) => handleArrayChange(index, 'subheading', e.target.value, 'sections')} placeholder="Subheading" className="p-2 border rounded" />
                                </div>
                                <textarea value={section.paragraph} onChange={(e) => handleArrayChange(index, 'paragraph', e.target.value, 'sections')} placeholder="Paragraph Content" className="p-2 border rounded w-full" rows="3"></textarea>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input value={section.imageTitle} onChange={(e) => handleArrayChange(index, 'imageTitle', e.target.value, 'sections')} placeholder="Image Title" className="p-2 border rounded" />
                                    <input value={section.imageAltText} onChange={(e) => handleArrayChange(index, 'imageAltText', e.target.value, 'sections')} placeholder="Image Alt Text" className="p-2 border rounded" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(index, e.target.files[0])} className="flex-grow p-1 border rounded text-sm" />
                                    <input type="number" value={section.order} onChange={(e) => handleArrayChange(index, 'order', e.target.value, 'sections')} placeholder="Order" className="w-20 p-2 border rounded" />
                                </div>
                                <button type="button" onClick={() => removeArrayItem(index, 'sections')} className="absolute top-1 right-1 text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem('sections', { heading: '', subheading: '', paragraph: '', imageTitle: '', imageAltText: '', order: 0 })} className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                            Add Section
                        </button>
                    </fieldset>

                    {/* --- Actions --- */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded flex items-center disabled:bg-gray-400 hover:bg-green-700">
                            {isSubmitting && <Loader className="animate-spin mr-2" size={16} />}
                            Save Attachment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Main Management Component ---
export default function ManageCarAttachments() {
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAttachment, setCurrentAttachment] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({ message: '', type: '' });

    const fetchAttachments = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getAllAttachments();
            setAttachments(response.data);
        } catch (err) {
            setError('Failed to fetch car attachments.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttachments();
    }, []);

    const handleCreate = () => {
        setCurrentAttachment(null);
        setIsModalOpen(true);
    };

    const handleEdit = (attachment) => {
        setCurrentAttachment(attachment);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car attachment entry?')) {
            try {
                await deleteAttachment(id);
                fetchAttachments();
            } catch (err) {
                alert('Failed to delete car attachment.');
            }
        }
    };

    const handleSave = () => {
        setIsModalOpen(false);
        fetchAttachments();
    };

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
        formData.append('carAttachmentsFile', selectedFile);

        try {
            const response = await uploadAttachmentsSheet(formData);
            setUploadStatus({ message: response.data.message, type: 'success' });
            fetchAttachments();
        } catch (err) {
            setUploadStatus({ message: err.response?.data?.message || 'Upload failed.', type: 'error' });
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            if(document.getElementById('fileInput')) {
                document.getElementById('fileInput').value = '';
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Manage Car Attachments</h1>
                <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} /> Create New Attachment
                </button>
            </div>

            {/* --- Excel Upload Section --- */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Bulk Upload Attachments from Excel</h2>
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
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Existing Car Attachments</h2>
            {loading && <div className="flex justify-center items-center p-8"><Loader className="animate-spin" size={32} /></div>}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"><AlertCircle className="inline mr-2" />{error}</div>}
            
            {!loading && !error && (
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fleets</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FAQs</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {attachments.map((attachment) => (
                                <tr key={attachment._id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{attachment.city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{attachment.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{attachment.fleets?.length || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">{attachment.faqs?.length || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(attachment)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(attachment._id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && <AttachmentFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} attachmentToEdit={currentAttachment} />}
        </div>
    );
}