import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageRentals = () => {
    const { adminToken } = useContext(AdminContext);

    // States
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null); // null for new, or package ID for editing
    
     const initialFormData = {
        uptoHour: '',
        state: '',
        uptoKm: '',
        packageRate: '',
        ac: true,
        seater: '',
        vehicleType: 'Mini',
        advanceAmount: '',
        rates: {
            extraKmRate: '',
            extraHourRate: '',
            nightDrivingAllowance: ''
        }
    };
    // Form State
    const [formData, setFormData] = useState(initialFormData);
       

    // Fetch all packages
    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/rental-packages');
            setPackages(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch packages.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    const handleRatesChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            rates: {
                ...prev.rates,
                [name]: value
            }
        }));
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editMode 
            ? `http://localhost:5000/api/rental-packages/${editMode}` 
            : 'http://localhost:5000/api/rental-packages';
        
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            alert(`Package successfully ${editMode ? 'updated' : 'created'}!`);
            resetForm();
            fetchPackages(); // Refresh the list
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
            console.error(err);
        }
    };

    const handleEdit = (pkg) => {
        setEditMode(pkg._id);
        setFormData({
            uptoHour: pkg.uptoHour,
            state: pkg.state,
            uptoKm: pkg.uptoKm,
            packageRate: pkg.packageRate,
            ac: pkg.ac,
            seater: pkg.seater,
            vehicleType: pkg.vehicleType,
            advanceAmount: pkg.advanceAmount,
             rates: {
                extraKmRate: pkg.rates.extraKmRate,
                extraHourRate: pkg.rates.extraHourRate,
                nightDrivingAllowance: pkg.rates.nightDrivingAllowance
            }
        });
        window.scrollTo(0, 0); // Scroll to top to see the form
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`http://localhost:5000/api/rental-packages/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                alert('Package deleted successfully!');
                fetchPackages(); // Refresh the list
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete package.');
                console.error(err);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Rental Packages</h1>

            {/* Form Section */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    {editMode ? <Edit className="mr-2"/> : <PlusCircle className="mr-2"/>}
                    {editMode ? 'Edit Package' : 'Add New Package'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input type="number" name="uptoHour" value={formData.uptoHour} onChange={handleInputChange} placeholder="Upto Hour" className="p-2 border rounded" required />
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" required />
                    <input type="number" name="uptoKm" value={formData.uptoKm} onChange={handleInputChange} placeholder="Upto Km" className="p-2 border rounded" required />
                    <input type="number" name="packageRate" value={formData.packageRate} onChange={handleInputChange} placeholder="Package Rate" className="p-2 border rounded" required />
                    <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="Seater" className="p-2 border rounded" required />
                    <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} placeholder="Advance Amount" className="p-2 border rounded" required />
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="p-2 border rounded">
                        <option value="Mini">Mini</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Traveller / Minivan">Traveller/Minivan</option>
                        <option value="SUV+">SUV+</option>
                    </select>
                    <div className="flex items-center">
                        <input type="checkbox" name="ac" checked={formData.ac} onChange={handleInputChange} id="ac-checkbox" className="h-4 w-4 rounded" />
                        <label htmlFor="ac-checkbox" className="ml-2">AC Available</label>
                    </div>
                    <div className="mt-6 pt-4 border-t">
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">Additional Rates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <input type="number" name="extraKmRate" value={formData.rates.extraKmRate} onChange={handleRatesChange} placeholder="Extra Km Rate (₹/km)" className="p-2 border rounded" required />
                            <input type="number" name="extraHourRate" value={formData.rates.extraHourRate} onChange={handleRatesChange} placeholder="Extra Hour Rate (₹/hr)" className="p-2 border rounded" required />
                            <input type="number" name="nightDrivingAllowance" value={formData.rates.nightDrivingAllowance} onChange={handleRatesChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
                        </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex gap-4">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
                            {editMode ? 'Update Package' : 'Add Package'}
                        </button>
                        {editMode && (
                            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold flex items-center">
                                <XCircle size={18} className="mr-2"/> Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            {/* Table Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Packages</h2>
                {loading ? <p>Loading packages...</p> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-2">Vehicle</th>
                                    <th className="p-2">State</th>
                                    <th className="p-2">Package</th>
                                    <th className="p-2">Rate</th>
                                    <th className="p-2">AC</th>
                                    <th className="p-2">Actions</th>
                                    <th className="p-3">Extra Rates</th>
                                    {/* <th className="p-3">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2 font-medium">{pkg.vehicleType} ({pkg.seater} Seater)</td>
                                        <td className="p-2">{pkg.state}</td>
                                        <td className="p-2">{pkg.uptoHour}hr / {pkg.uptoKm}km</td>
                                        <td className="p-2">₹{pkg.packageRate}</td>
                                        <td className="p-2">{pkg.ac ? 'Yes' : 'No'}</td>
                                        
                                        <td className="p-2 flex gap-2">
                                            <button onClick={() => handleEdit(pkg)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                        </td>
                                         <td className="p-3 text-xs">
                                            <div>Km: ₹{pkg.rates.extraKmRate}</div>
                                            <div>Hr: ₹{pkg.rates.extraHourRate}</div>
                                            <div>Night: ₹{pkg.rates.nightDrivingAllowance}</div>
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

export default ManageRentals;

