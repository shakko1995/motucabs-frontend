import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageCarRentals = () => {
    const { adminToken } = useContext(AdminContext);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    const initialFormData = {
        name: '',
        slug: '',
        atAGlance: '',
        description: [],
        packages: [],
        outstationFares: [],
        whyBook: [],
        faqs: []
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchRentals = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/car-rentals');
            setRentals(res.data || []);
        } catch (err) {
            setError('Failed to fetch car rentals.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRentals(); }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (["description", "whyBook"].includes(name)) {
            setFormData(prev => ({ ...prev, [name]: value.split('\n') }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNestedChange = (type, index, e) => {
        const { name, value } = e.target;
        const newArr = [...formData[type]];
        newArr[index][name] = value;
        setFormData(prev => ({ ...prev, [type]: newArr }));
    };

    const addNestedItem = (type) => {
        const newItem = type === 'packages' ? { hours: '', distanceLimitKm: '', price: '' } :
                        type === 'outstationFares' ? { destination: '', startingPrice: '' } :
                        { question: '', answer: '' };
        setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    };

    const removeNestedItem = (type, index) => {
        setFormData(prev => ({ ...prev, [type]: formData[type].filter((_, i) => i !== index) }));
    };
    
    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode ? `http://localhost:5000/api/car-rentals/${editMode}` : 'http://localhost:5000/api/car-rentals';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Rental ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchRentals();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    const handleEdit = (rental) => {
        setEditMode(rental.slug);
        setFormData({
            name: rental.name,
            slug: rental.slug,
            atAGlance: rental.atAGlance || '',
            description: rental.description || [],
            packages: rental.packages || [],
            outstationFares: rental.outstationFares || [],
            whyBook: rental.whyBook || [],
            faqs: rental.faqs || []
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (slug) => {
        if(window.confirm('Are you sure?')) {
            try {
                await axios.delete(`http://localhost:5000/api/car-rentals/${slug}`, { headers: { Authorization: `Bearer ${adminToken}` } });
                alert('Rental deleted successfully!');
                fetchRentals();
            } catch (err) {
                setError('Failed to delete rental.');
            }
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Car Rental Pages</h1>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">{editMode ? `Editing: ${formData.name}` : 'Add New Car Rental Location'}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Location Name (e.g., Delhi)" className="p-3 border rounded-md" required/>
                        <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="URL Slug (e.g., delhi)" className="p-3 border rounded-md" required/>
                    </div>
                    <textarea name="atAGlance" value={formData.atAGlance} onChange={handleInputChange} placeholder="At a Glance Text..." rows="3" className="w-full p-3 border rounded-md"/>
                    <textarea name="description" value={formData.description.join('\n')} onChange={handleInputChange} placeholder="Description (one paragraph per line)..." rows="4" className="w-full p-3 border rounded-md"/>
                    <textarea name="whyBook" value={formData.whyBook.join('\n')} onChange={handleInputChange} placeholder="Why Book With Us Points (one point per line)..." rows="4" className="w-full p-3 border rounded-md"/>
                    
                    <fieldset className="border p-4 rounded-md">
                        <legend className="px-2 font-semibold">Hourly Packages</legend>
                        {formData.packages.map((pkg, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 items-center mb-2">
                                <input name="hours" value={pkg.hours} onChange={(e) => handleNestedChange('packages', index, e)} placeholder="Hours" type="number" className="p-2 border rounded-md"/>
                                <input name="distanceLimitKm" value={pkg.distanceLimitKm} onChange={(e) => handleNestedChange('packages', index, e)} placeholder="KMs" type="number" className="p-2 border rounded-md"/>
                                <input name="price" value={pkg.price} onChange={(e) => handleNestedChange('packages', index, e)} placeholder="Price (₹)" type="number" className="p-2 border rounded-md"/>
                                <button type="button" onClick={() => removeNestedItem('packages', index)} className="text-red-500 justify-self-center"><XCircle/></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedItem('packages')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add Package</button>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md">
                        <legend className="px-2 font-semibold">Outstation Fares</legend>
                        {formData.outstationFares.map((fare, index) => (
                            <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
                                <input name="destination" value={fare.destination} onChange={(e) => handleNestedChange('outstationFares', index, e)} placeholder="Destination" className="p-2 border rounded-md"/>
                                <input name="startingPrice" value={fare.startingPrice} onChange={(e) => handleNestedChange('outstationFares', index, e)} placeholder="Starting Price (₹)" type="number" className="p-2 border rounded-md"/>
                                <button type="button" onClick={() => removeNestedItem('outstationFares', index)} className="text-red-500 justify-self-center"><XCircle/></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedItem('outstationFares')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add Outstation Fare</button>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md">
                        <legend className="px-2 font-semibold">FAQs</legend>
                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="grid grid-cols-1 gap-2 mb-2 relative">
                                <button type="button" onClick={() => removeNestedItem('faqs', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={16}/></button>
                                <input name="question" value={faq.question} onChange={(e) => handleNestedChange('faqs', index, e)} placeholder="Question" className="p-2 border rounded-md"/>
                                <textarea name="answer" value={faq.answer} onChange={(e) => handleNestedChange('faqs', index, e)} placeholder="Answer" rows="2" className="p-2 border rounded-md"/>
                            </div>
                        ))}
                        <button type="button" onClick={() => addNestedItem('faqs')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add FAQ</button>
                    </fieldset>

                    <div className="flex justify-end gap-4 border-t pt-4">
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update Rental' : 'Save Rental'}</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Locations</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 uppercase text-xs">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Slug</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentals.map(rental => (
                                <tr key={rental._id} className="border-b">
                                    <td className="p-3 font-medium">{rental.name}</td>
                                    <td className="p-3 text-gray-500">/rental/{rental.slug}</td>
                                    <td className="p-3 flex gap-3">
                                        <button onClick={() => handleEdit(rental)} className="text-blue-600"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(rental.slug)} className="text-red-600"><Trash2 size={18}/></button>
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

export default ManageCarRentals;