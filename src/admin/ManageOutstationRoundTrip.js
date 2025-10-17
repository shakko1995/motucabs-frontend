// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

// const ManageOutstationRoundTrip = () => {
//     const { adminToken } = useContext(AdminContext);

//     const [packages, setPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null);
    
    
//     const initialFormData = {
//         fleet: 'Mini',
//         packagePerDay: '',
//         advance: '',
//         includingKm: '',
//         includingHour: '',
//         extraKmRate: '',
//         extraHourRate: '',
//         nightDrivingAllowance: ''
//     };

//     const [formData, setFormData] = useState(initialFormData);

//     const fetchPackages = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get('http://localhost:5000/api/outstation-roundtrip');
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
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const resetForm = () => {
//         setEditMode(null);
//         setFormData(initialFormData);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = editMode 
//             ? `http://localhost:5000/api/outstation-roundtrip/${editMode}` 
//             : 'http://localhost:5000/api/outstation-roundtrip';
        
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
//             fleet: pkg.fleet,
//             packagePerDay: pkg.packagePerDay,
//             advance: pkg.advance,
//             includingKm: pkg.includingKm,
//             includingHour: pkg.includingHour,
//             extraKmRate: pkg.extraKmRate,
//             extraHourRate: pkg.extraHourRate,
//             nightDrivingAllowance: pkg.nightDrivingAllowance
//         });
//         window.scrollTo(0, 0);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this package?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/outstation-roundtrip/${id}`, {
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
//             <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Round Trips</h1>

//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-700">
//                     {editMode ? <Edit className="mr-2"/> : <PlusCircle className="mr-2"/>}
//                     {editMode ? 'Edit Round Trip Package' : 'Add New Round Trip Package'}
//                 </h2>
//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <select name="fleet" value={formData.fleet} onChange={handleInputChange} className="p-2 border rounded bg-white">
//                         <option value="Mini">Mini</option>
//                         <option value="Sedan">Sedan</option>
//                         <option value="SUV">SUV</option>
//                         <option value="SUV+">SUV+</option>
//                     </select>
//                     <input type="number" name="packagePerDay" value={formData.packagePerDay} onChange={handleInputChange} placeholder="Package per Day " className="p-2 border rounded" required />
//                     <input type="number" name="advance" value={formData.advance} onChange={handleInputChange} placeholder="Advance (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="includingKm" value={formData.includingKm} onChange={handleInputChange} placeholder="Included Km / Day" className="p-2 border rounded" required />
//                     {/* <input type="number" name="includingHour" value={formData.includingHour} onChange={handleInputChange} placeholder="Included Hours / Day" className="p-2 border rounded" required /> */}
//                     <input type="number" name="extraKmRate" value={formData.extraKmRate} onChange={handleInputChange} placeholder="Extra Km Rate (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="extraHourRate" value={formData.extraHourRate} onChange={handleInputChange} placeholder="Extra Hour Rate (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="nightDrivingAllowance" value={formData.nightDrivingAllowance} onChange={handleInputChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
//                     <div className="lg:col-span-4 flex gap-4 mt-2">
//                         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
//                             {editMode ? 'Update Package' : 'Add Package'}
//                         </button>
//                         {editMode && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold flex items-center"><XCircle size={18} className="mr-2"/> Cancel Edit</button>}
//                     </div>
//                 </form>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4">Existing Round Trip Packages</h2>
//                 {loading ? <p>Loading packages...</p> : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-sm text-left">
//                             <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                                 <tr>
//                                     <th className="p-3">Fleet</th>
//                                     <th className="p-3">Package/Day</th>
//                                     {/* <th className="p-3">Included</th> */}
//                                     <th className="p-3">Extra Rates</th>
//                                     <th className="p-3">Advance</th>
//                                     <th className="p-3">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {packages.map(pkg => (
//                                     <tr key={pkg._id} className="border-b hover:bg-gray-50">
//                                         <td className="p-3 font-medium">{pkg.fleet}</td>
//                                         <td className="p-3">₹{pkg.packagePerDay}</td>
//                                         <td className="p-3 text-xs">{pkg.includingKm}km / {pkg.includingHour}hr</td>
//                                         <td className="p-3 text-xs">Km: ₹{pkg.extraKmRate}, Hr: ₹{pkg.extraHourRate}</td>
//                                         <td className="p-3">₹{pkg.advance}</td>
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

// export default ManageOutstationRoundTrip;


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

// const ManageOutstationRoundTrip = () => {
//     const { adminToken } = useContext(AdminContext);
//     const [packages, setPackages] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null);

//     const initialFormData = {
//         car: 'Mini',
//         state: '',
//         noOfDays: '',
//         includingKm: '',
//         fare: '',
//         extraKmRate: '',
//         extraHourRate: '',
//         nightDrivingAllowance: ''
//     };
//     const [formData, setFormData] = useState(initialFormData);

//     const fetchPackages = async () => {
//         try {
//             setLoading(true);
//             const res = await axios.get('http://localhost:5000/api/outstation-roundtrip');
//             setPackages(res.data.data);
//         } catch (err) {
//             setError('Failed to fetch packages.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchPackages(); }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const resetForm = () => {
//         setEditMode(null);
//         setFormData(initialFormData);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = editMode 
//             ? `http://localhost:5000/api/outstation-roundtrip/${editMode}` 
//             : 'http://localhost:5000/api/outstation-roundtrip';
//         const method = editMode ? 'put' : 'post';

//         try {
//             await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
//             alert(`Package ${editMode ? 'updated' : 'created'} successfully!`);
//             resetForm();
//             fetchPackages();
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred.');
//         }
//     };

//     const handleEdit = (pkg) => {
//         setEditMode(pkg._id);
//         setFormData({
//             car: pkg.car,
//             state: pkg.state,
//             noOfDays: pkg.noOfDays,
//             includingKm: pkg.includingKm,
//             fare: pkg.fare,
//             extraKmRate: pkg.extraKmRate,
//             extraHourRate: pkg.extraHourRate,
//             nightDrivingAllowance: pkg.nightDrivingAllowance
//         });
//         window.scrollTo(0, 0);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this package?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/outstation-roundtrip/${id}`, {
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
//             <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Round Trips</h1>

//             <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h2 className="text-2xl font-semibold mb-4 text-slate-700">
//                     {editMode ? 'Edit Round Trip Package' : 'Add New Round Trip Package'}
//                 </h2>
//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                     <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State (e.g., West Bengal)" className="p-2 border rounded" required />
//                     <select name="car" value={formData.car} onChange={handleInputChange} className="p-2 border rounded bg-white">
//                         <option value="Mini">Mini</option>
//                         <option value="Sedan">Sedan</option>
//                         <option value="SUV">SUV</option>
//                         <option value="SUV+">SUV+</option>
//                     </select>
//                     <input type="number" name="noOfDays" value={formData.noOfDays} onChange={handleInputChange} placeholder="Number of Days" className="p-2 border rounded" required />
//                     <input type="number" name="fare" value={formData.fare} onChange={handleInputChange} placeholder="Total Fare (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="includingKm" value={formData.includingKm} onChange={handleInputChange} placeholder="Included Km" className="p-2 border rounded" required />
//                     <input type="number" name="extraKmRate" value={formData.extraKmRate} onChange={handleInputChange} placeholder="Extra Km Rate (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="extraHourRate" value={formData.extraHourRate} onChange={handleInputChange} placeholder="Extra Hour Rate (₹)" className="p-2 border rounded" required />
//                     <input type="number" name="nightDrivingAllowance" value={formData.nightDrivingAllowance} onChange={handleInputChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
//                     <div className="lg:col-span-4 flex gap-4 mt-2">
//                         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
//                             {editMode ? 'Update Package' : 'Add Package'}
//                         </button>
//                         {editMode && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold">Cancel Edit</button>}
//                     </div>
//                 </form>
//                 {error && <p className="text-red-500 mt-4">{error}</p>}
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4">Existing Packages</h2>
//                 {loading ? <p>Loading...</p> : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-sm text-left">
//                             <thead className="bg-gray-100 uppercase text-xs text-gray-600">
//                                 <tr>
//                                     <th className="p-3">Car</th>
//                                     <th className="p-3">State</th>
//                                     <th className="p-3">Package</th>
//                                     <th className="p-3">Fare</th>
//                                     <th className="p-3">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {packages.map(pkg => (
//                                     <tr key={pkg._id} className="border-b hover:bg-gray-50">
//                                         <td className="p-3 font-medium">{pkg.car}</td>
//                                         <td className="p-3">{pkg.state}</td>
//                                         <td className="p-3">{pkg.noOfDays} Day(s) / {pkg.includingKm} km</td>
//                                         <td className="p-3">₹{pkg.fare}</td>
//                                         <td className="p-3 flex gap-3">
//                                             <button onClick={() => handleEdit(pkg)} className="text-blue-600"><Edit size={18}/></button>
//                                             <button onClick={() => handleDelete(pkg._id)} className="text-red-600"><Trash2 size={18}/></button>
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
// export default ManageOutstationRoundTrip;



import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageOutstationRoundTrip = () => {
    const { adminToken } = useContext(AdminContext);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);

    // Form state updated to match the new schema
    const initialFormData = {
        car: 'Mini',
        state: '',
        noOfDays: '',
        includingKm: '',
        fare: '',
        seater: '',
        ac: true,
        fuelType: 'Petrol',
        advanceAmount: '',
        extraKmRate: '',
        extraHourRate: '',
        nightDrivingAllowance: ''
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/outstation-roundtrip');
            setPackages(res.data.data || []);
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
        setError(null);
        const url = editMode 
            ? `http://localhost:5000/api/outstation-roundtrip/${editMode}` 
            : 'http://localhost:5000/api/outstation-roundtrip';
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
            car: pkg.car,
            state: pkg.state,
            noOfDays: pkg.noOfDays,
            includingKm: pkg.includingKm,
            fare: pkg.fare,
            seater: pkg.seater,
            ac: pkg.ac,
            fuelType: pkg.fuelType,
            advanceAmount: pkg.advanceAmount,
            extraKmRate: pkg.extraKmRate,
            extraHourRate: pkg.extraHourRate,
            nightDrivingAllowance: pkg.nightDrivingAllowance
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await axios.delete(`http://localhost:5000/api/outstation-roundtrip/${id}`, {
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
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Round Trips</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-slate-700">
                    {editMode ? 'Edit Package' : 'Add New Package'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Form fields updated to match new schema */}
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="p-2 border rounded" required />
                    <select name="car" value={formData.car} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Mini">Mini</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="SUV+">SUV+</option>
                        <option value="Traveller / Minivan">Traveller/Minivan</option>
                    </select>
                    <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="p-2 border rounded bg-white">
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="CNG">CNG</option>
                    </select>
                    <input type="number" name="seater" value={formData.seater} onChange={handleInputChange} placeholder="Seater" className="p-2 border rounded" required />
                    <input type="number" name="noOfDays" value={formData.noOfDays} onChange={handleInputChange} placeholder="Number of Days" className="p-2 border rounded" required />
                    <input type="number" name="includingKm" value={formData.includingKm} onChange={handleInputChange} placeholder="Included Km" className="p-2 border rounded" required />
                    <input type="number" name="fare" value={formData.fare} onChange={handleInputChange} placeholder="Total Fare (₹)" className="p-2 border rounded" required />
                    <input type="number" name="advanceAmount" value={formData.advanceAmount} onChange={handleInputChange} placeholder="Advance Amount (₹)" className="p-2 border rounded" required />
                    <input type="number" name="extraKmRate" value={formData.extraKmRate} onChange={handleInputChange} placeholder="Extra Km Rate (₹)" className="p-2 border rounded" required />
                    <input type="number" name="extraHourRate" value={formData.extraHourRate} onChange={handleInputChange} placeholder="Extra Hour Rate (₹)" className="p-2 border rounded" required />
                    <input type="number" name="nightDrivingAllowance" value={formData.nightDrivingAllowance} onChange={handleInputChange} placeholder="Night Allowance (₹)" className="p-2 border rounded" required />
                    <div className="flex items-center">
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
                                    <th className="p-3">Car</th>
                                    <th className="p-3">State</th>
                                    <th className="p-3">Package</th>
                                    <th className="p-3">Fare</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packages.map(pkg => (
                                    <tr key={pkg._id}>
                                        <td className="p-3 font-medium">{pkg.car} ({pkg.seater}S/{pkg.fuelType})</td>
                                        <td className="p-3">{pkg.state}</td>
                                        <td className="p-3">{pkg.noOfDays} Day(s) / {pkg.includingKm} km</td>
                                        <td className="p-3">₹{pkg.fare}</td>
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
export default ManageOutstationRoundTrip;