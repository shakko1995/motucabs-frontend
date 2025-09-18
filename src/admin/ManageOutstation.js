// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

// const ManageOutstation = () => {
//     const { adminToken } = useContext(AdminContext);

//     const [packages, setPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null);
    
    
//     const initialFormData = {
//         state: '',
//         vehicleType: 'Mini',
//         ac: true,
//         seater: '',
//         ratePerKm: '',
//         advanceAmount: '',
//         NightDrivingAllowance: ''
//     };

//     const [formData, setFormData] = useState(initialFormData);

    
//     const fetchPackages = async () => {
//         try {
//             setLoading(true);
            
//             const res = await axios.get('http://localhost:5000/api/outstation-packages');
//             setPackages(res.data.data);
//             setError(null);
//         } catch (err) {
//             setError('Failed to fetch packages.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPackages();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//     };

//     const resetForm = () => {
//         setEditMode(null);
//         setFormData(initialFormData);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = editMode 
//             ? `http://localhost:5000/api/outstation-packages/${editMode}` 
//             : 'http://localhost:5000/api/outstation-packages';
        
//         const method = editMode ? 'put' : 'post';

//         try {
//             await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
//             alert(`Package successfully ${editMode ? 'updated' : 'created'}!`);
//             resetForm();
//             fetchPackages();
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred.');
//         }
//     };

//     const handleEdit = (pkg) => {
//         setEditMode(pkg._id);
        
//         setFormData({
//             state: pkg.state,
//             vehicleType: pkg.vehicleType,
//             ac: pkg.ac,
//             seater: pkg.seater,
//             ratePerKm: pkg.ratePerKm,
//             advanceAmount: pkg.advanceAmount,
//             NightDrivingAllowance: pkg.NightDrivingAllowance
//         });
//         window.scrollTo(0, 0);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this package?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/outstation-packages/${id}`, {
//                     headers: { Authorization: `Bearer ${adminToken}` }
//                 });
//                 alert('Package deleted successfully!');
//                 fetchPackages();
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to delete package.');
//             }
//         }
//     };

//     return (
//         <div className="p-6 bg-slate-50 min-h-full">
//             <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Packages</h1>

//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-700">
//                     {editMode ? <Edit className="mr-2"/> : <PlusCircle className="mr-2"/>}
//                     {editMode ? 'Edit Outstation Package' : 'Add New Outstation Package'}
//                 </h2>
               
//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" required />
//                     <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="p-2 border rounded bg-white">
//                         <option value="Mini">Mini</option>
//                         <option value="Sedan">Sedan</option>
//                         <option value="SUV">SUV</option>
//                         <option value="SUV+">SUV+</option>
//                     </select>
//                     <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="Seater" className="p-2 border rounded" required />
//                     <input type="number" name="ratePerKm" value={formData.ratePerKm} onChange={handleInputChange} placeholder="Rate per Km (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} placeholder="Advance Amount (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="NightDrivingAllowance" value={formData.NightDrivingAllowance} onChange={handleInputChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
//                     <div className="flex items-center">
//                         <input type="checkbox" name="ac" checked={formData.ac} onChange={handleInputChange} id="ac-checkbox" className="h-4 w-4 rounded" />
//                         <label htmlFor="ac-checkbox" className="ml-2">AC Available</label>
//                     </div>
//                     <div className="md:col-span-2 lg:col-span-3 flex gap-4 mt-2">
//                         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
//                             {editMode ? 'Update Package' : 'Add Package'}
//                         </button>
//                         {editMode && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold flex items-center"><XCircle size={18} className="mr-2"/> Cancel Edit</button>}
//                     </div>
//                 </form>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4">Existing Outstation Packages</h2>
//                 {loading ? <p>Loading packages...</p> : (
//                     <div className="overflow-x-auto">
                        
//                         <table className="w-full text-sm text-left">
//                             <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                                 <tr>
//                                     <th className="p-3">Vehicle</th>
//                                     <th className="p-3">State</th>
//                                     <th className="p-3">Rate/Km</th>
//                                     <th className="p-3">Night Allowance</th>
//                                     <th className="p-3">Advance</th>
//                                     <th className="p-3">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {packages.map(pkg => (
//                                     <tr key={pkg._id} className="border-b hover:bg-gray-50">
//                                         <td className="p-3 font-medium">{pkg.vehicleType} ({pkg.seater}S / {pkg.ac ? 'AC' : 'Non-AC'})</td>
//                                         <td className="p-3">{pkg.state}</td>
//                                         <td className="p-3">₹{pkg.ratePerKm}</td>
//                                         <td className="p-3">₹{pkg.NightDrivingAllowance}</td>
//                                         <td className="p-3">₹{pkg.advanceAmount}</td>
//                                         <td className="p-3 flex gap-3">
//                                             <button onClick={() => handleEdit(pkg)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
//                                             <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ManageOutstation;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageOutstation = () => {
    const { adminToken } = useContext(AdminContext);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    // Form State को नए Schema के अनुसार अपडेट किया गया
    const initialFormData = {
        state: '',
        vehicleType: 'Mini',
        ac: true,
        seater: '',
        fuelType: 'Petrol',
        ratePerKm: '',
        advanceAmount: '',
        NightDrivingAllowance: '',
        paymentOptions: 'Both' // नया फील्ड
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/outstation-packages');
            setPackages(res.data.data);
        } catch (err) {
            setError('Failed to fetch packages.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPackages(); }, []);

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
            ? `http://localhost:5000/api/outstation-packages/${editMode}` 
            : 'http://localhost:5000/api/outstation-packages';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
            alert(`Package ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchPackages();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    const handleEdit = (pkg) => {
        setEditMode(pkg._id);
        setFormData({
            state: pkg.state,
            vehicleType: pkg.vehicleType,
            ac: pkg.ac,
            seater: pkg.seater,
            fuelType: pkg.fuelType,
            ratePerKm: pkg.ratePerKm,
            advanceAmount: pkg.advanceAmount,
            NightDrivingAllowance: pkg.NightDrivingAllowance,
            paymentOptions: pkg.paymentOptions || 'Both' // Fallback for older data
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`http://localhost:5000/api/outstation-packages/${id}`, {
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
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation (One-Way)</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                    {editMode ? 'Edit Package' : 'Add New Package'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" required />
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Mini">Mini</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="SUV+">SUV+</option>
                    </select>
                    <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="Seater" className="p-2 border rounded" required />
                    <input type="number" name="ratePerKm" value={formData.ratePerKm} onChange={handleInputChange} placeholder="Rate per Km (₹)" className="p-2 border rounded" required />
                    <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} placeholder="Advance Amount (₹)" className="p-2 border rounded" required />
                    <input type="number" name="NightDrivingAllowance" value={formData.NightDrivingAllowance} onChange={handleInputChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
                    <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                    </select>

                    {/* 👇 नया पेमेंट ऑप्शन ड्रॉपडाउन */}
                    <select name="paymentOptions" value={formData.paymentOptions} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Both">Both (Advance & Full)</option>
                        <option value="AdvanceOnly">Advance Only</option>
                        <option value="FullOnly">Full Payment Only</option>
                    </select>

                    <div className="flex items-center lg:col-span-1">
                        <input type="checkbox" name="ac" checked={formData.ac} onChange={handleInputChange} id="ac-checkbox" className="h-4 w-4 rounded" />
                        <label htmlFor="ac-checkbox" className="ml-2">AC Available</label>
                    </div>

                    <div className="lg:col-span-4 flex gap-4 mt-2">
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">{editMode ? 'Update' : 'Add'}</button>
                        {editMode && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>}
                    </div>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Packages</h2>
                {loading ? <p>Loading...</p> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 uppercase text-xs">
                                <tr>
                                    <th className="p-3">Vehicle</th>
                                    <th className="p-3">State</th>
                                    <th className="p-3">Rate/Km</th>
                                    <th className="p-3">Advance</th>
                                    <th className="p-3">Payment Options</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg._id}>
                                        <td className="p-3 font-medium">{pkg.vehicleType} ({pkg.seater}S/{pkg.fuelType})</td>
                                        <td className="p-3">{pkg.state}</td>
                                        <td className="p-3">₹{pkg.ratePerKm}</td>
                                        <td className="p-3">₹{pkg.advanceAmount}</td>
                                        <td className="p-3">{pkg.paymentOptions}</td>
                                        <td className="p-3 flex gap-3">
                                            <button onClick={() => handleEdit(pkg)}><Edit size={18}/></button>
                                            <button onClick={() => handleDelete(pkg._id)}><Trash2 size={18}/></button>
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
export default ManageOutstation;