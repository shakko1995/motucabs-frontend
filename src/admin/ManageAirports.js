import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageAirports = () => {
    const { adminToken } = useContext(AdminContext);

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);
    
    // 👇 Form State को Airport Schema के अनुसार बनाया गया है
    const initialFormData = {
        packageKm: '',
        state: '',
        packageCost: '',
        ac: true,
        seater: '',
        vehicleType: 'Mini',
        advanceAmount: '',
        waitingTimeCharge: '',
        nightDrivingCharge: '',
        extraKmCharge: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/airport-packages');
            setPackages(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch packages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode 
            ? `http://localhost:5000/api/airport-packages/${editMode}` 
            : 'http://localhost:5000/api/airport-packages';
        
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Package successfully ${editMode ? 'updated' : 'created'}!`);
            resetForm();
            fetchPackages();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    const handleEdit = (pkg) => {
        setEditMode(pkg._id);
        setFormData({
            packageKm: pkg.packageKm,
            state: pkg.state,
            packageCost: pkg.packageCost,
            ac: pkg.ac,
            seater: pkg.seater,
            vehicleType: pkg.vehicleType,
            advanceAmount: pkg.advanceAmount,
            waitingTimeCharge: pkg.waitingTimeCharge,
            nightDrivingCharge: pkg.nightDrivingCharge,
            extraKmCharge: pkg.extraKmCharge
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`http://localhost:5000/api/airport-packages/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                alert('Package deleted successfully!');
                fetchPackages();
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete package.');
            }
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-full">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Airport Packages</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-700">
                    {editMode ? <Edit className="mr-2"/> : <PlusCircle className="mr-2"/>}
                    {editMode ? 'Edit Airport Package' : 'Add New Airport Package'}
                </h2>
                {/* 👇 Form को Airport Schema के अनुसार बदला गया है */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" required />
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Mini">Mini</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                    </select>
                    <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="Seater" className="p-2 border rounded" required />
                    <input type="number" name="packageCost" value={formData.packageCost} onChange={handleInputChange} placeholder="Package Cost (₹)" className="p-2 border rounded" required />
                    <input type="number" name="packageKm" value={formData.packageKm} onChange={handleInputChange} placeholder="Package Km" className="p-2 border rounded" required />
                    <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} placeholder="Advance Amount (₹)" className="p-2 border rounded" required />
                    <input type="number" name="extraKmCharge" value={formData.extraKmCharge} onChange={handleInputChange} placeholder="Extra Km Charge (₹/km)" className="p-2 border rounded" required />
                    <input type="number" name="waitingTimeCharge" value={formData.waitingTimeCharge} onChange={handleInputChange} placeholder="Waiting Charge (₹/hr)" className="p-2 border rounded" required />
                    <input type="number" name="nightDrivingCharge" value={formData.nightDrivingCharge} onChange={handleInputChange} placeholder="Night Charge (₹)" className="p-2 border rounded" required />
                    <div className="flex items-center">
                        <input type="checkbox" name="ac" checked={formData.ac} onChange={handleInputChange} id="ac-checkbox" className="h-4 w-4 rounded" />
                        <label htmlFor="ac-checkbox" className="ml-2">AC Available</label>
                    </div>
                    <div className="lg:col-span-4 flex gap-4 mt-2">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
                            {editMode ? 'Update Package' : 'Add Package'}
                        </button>
                        {editMode && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold flex items-center"><XCircle size={18} className="mr-2"/> Cancel Edit</button>}
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Airport Packages</h2>
                {loading ? <p>Loading packages...</p> : (
                    <div className="overflow-x-auto">
                        {/* 👇 Table को Airport Schema के अनुसार बदला गया है */}
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
                                <tr>
                                    <th className="p-3">Vehicle</th>
                                    <th className="p-3">State</th>
                                    <th className="p-3">Package</th>
                                    <th className="p-3">Cost</th>
                                    <th className="p-3">Extra Charges</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{pkg.vehicleType} ({pkg.seater}S / {pkg.ac ? 'AC' : 'Non-AC'})</td>
                                        <td className="p-3">{pkg.state}</td>
                                        <td className="p-3">{pkg.packageKm} km</td>
                                        <td className="p-3">₹{pkg.packageCost}</td>
                                        <td className="p-3 text-xs">
                                            <div>Extra Km: ₹{pkg.extraKmCharge}</div>
                                            <div>Waiting: ₹{pkg.waitingTimeCharge}/hr</div>
                                            <div>Night: ₹{pkg.nightDrivingCharge}</div>
                                        </td>
                                        <td className="p-3 flex gap-3">
                                            <button onClick={() => handleEdit(pkg)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAirports;