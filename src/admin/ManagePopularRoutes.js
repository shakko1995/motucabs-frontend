import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManagePopularRoutes = () => {
  const { adminToken } = useContext(AdminContext);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const initialFormData = {
    from: '',
    to: '',
    tripType: 'one-way',
    distance: '',
    duration: '',
    descriptions: [],
    sections: [],
    fares: [],
    faqs: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sectionFiles, setSectionFiles] = useState({}); // {0: File, 1: File, ...}

  // Fetch popular routes
  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/book-taxi', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setRoutes(res.data || []);
    } catch (err) {
      setError('Failed to fetch routes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (adminToken) fetchRoutes(); }, [adminToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (type, index, e) => {
    const { name, value } = e.target;
    const newArr = [...formData[type]];
    newArr[index][name] = value;
    setFormData(prev => ({ ...prev, [type]: newArr }));
  };

  const addNestedItem = (type) => {
    const newItem =
      type === 'descriptions' ? { title: '', content: '' } :
      type === 'fares' ? { vehicleType: 'Sedan', price: '' } :
      type === 'faqs' ? { question: '', answer: '' } :
      { heading: '', headingType: 'h2', subheading: '', paragraph: '', paragraphAlign: 'left', image: '', imageTitle: '', imageAltText: '' };
    setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  const removeNestedItem = (type, index) => {
    setFormData(prev => ({ ...prev, [type]: formData[type].filter((_, i) => i !== index) }));
    if(type === 'sections') {
      setSectionFiles(prev => { const copy = {...prev}; delete copy[index]; return copy; });
    }
  };

  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
    setSectionFiles({});
  };

  // Cloudinary upload
  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // replace with your Cloudinary preset
    const res = await axios.post('https://api.cloudinary.com/v1_1/dpmphvctp/image/upload', data); // replace YOUR_CLOUD_NAME
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = { ...formData };

      // Upload section images
      for (let index in sectionFiles) {
        if(sectionFiles[index]) {
          const url = await uploadToCloudinary(sectionFiles[index]);
          updatedForm.sections[index].image = url;
        }
      }

      const url = editMode ? `http://localhost:5000/api/book-taxi/${editMode}` : 'http://localhost:5000/api/book-taxi';
      const method = editMode ? 'put' : 'post';

      await axios[method](url, updatedForm, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      alert(`Route ${editMode ? 'updated' : 'created'} successfully!`);
      resetForm();
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleEdit = (route) => {
    setEditMode(route._id);
    setFormData({
      ...initialFormData,
      ...route,
      sections: route.sections?.map(sec => ({
        ...sec,
        headingType: sec.headingType || 'h2',
        paragraphAlign: sec.paragraphAlign || 'left',
        imageTitle: sec.imageTitle || '',
        imageAltText: sec.imageAltText || ''
      })) || [],
      fares: route.fares || [],
      faqs: route.faqs || [],
    });
    setSectionFiles({});
    window.scrollTo(0,0);
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/book-taxi/${id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      alert('Route deleted successfully!');
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete route.');
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Popular Routes</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="from" placeholder="From City" value={formData.from} onChange={handleInputChange} className="p-3 border rounded-md" required/>
          <input name="to" placeholder="To City" value={formData.to} onChange={handleInputChange} className="p-3 border rounded-md" required/>
        </div>

        {/* Fares */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold">Fares by Vehicle</legend>
          {formData.fares.map((fare, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
              <select name="vehicleType" value={fare.vehicleType} onChange={(e) => handleNestedChange('fares', index, e)} className="p-2 border rounded bg-white">
                <option>Sedan</option><option>SUV</option><option>Mini</option>
              </select>
              <input name="price" type="number" value={fare.price} onChange={(e) => handleNestedChange('fares', index, e)} placeholder="Price (₹)"/>
              <button type="button" onClick={() => removeNestedItem('fares', index)}><XCircle/></button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem('fares')} className="flex items-center gap-2"><PlusCircle/> Add Fare</button>
        </fieldset>

        {/* Sections */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold">Sections</legend>
          {formData.sections.map((section, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              <button type="button" onClick={() => removeNestedItem('sections', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18}/></button>
              <input name="heading" placeholder="Heading" value={section.heading} onChange={(e) => handleNestedChange('sections', index, e)} className="p-2 border rounded-md w-full mb-2"/>
              <input name="subheading" placeholder="Subheading" value={section.subheading} onChange={(e) => handleNestedChange('sections', index, e)} className="p-2 border rounded-md w-full mb-2"/>
              <textarea name="paragraph" placeholder="Paragraph" value={section.paragraph} onChange={(e) => handleNestedChange('sections', index, e)} className="p-2 border rounded-md w-full mb-2 h-20"/>

              {/* Section Image */}
              <input type="file" accept="image/*" onChange={(e) => setSectionFiles(prev => ({ ...prev, [index]: e.target.files[0] }))}/>
              {section.image && !sectionFiles[index] && (
                <img src={section.image} alt={section.imageAltText || "Section Image"} className="h-16 w-auto rounded-md border mt-2"/>
              )}
              <input name="imageTitle" placeholder="Image Title" value={section.imageTitle || ''} onChange={(e) => handleNestedChange('sections', index, e)} className="p-2 border rounded-md w-full mt-2"/>
              <input name="imageAltText" placeholder="Image Alt Text" value={section.imageAltText || ''} onChange={(e) => handleNestedChange('sections', index, e)} className="p-2 border rounded-md w-full mt-2"/>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem('sections')} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Section</button>
        </fieldset>

        {/* FAQs */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold">FAQs</legend>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              <button type="button" onClick={() => removeNestedItem('faqs', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18}/></button>
              <input name="question" placeholder="Question" value={faq.question} onChange={(e) => handleNestedChange('faqs', index, e)} className="p-2 border rounded-md w-full mb-2"/>
              <textarea name="answer" placeholder="Answer" value={faq.answer} onChange={(e) => handleNestedChange('faqs', index, e)} className="p-2 border rounded-md w-full h-20"/>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem('faqs')} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add FAQ</button>
        </fieldset>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">{editMode ? 'Update Route' : 'Save Route'}</button>
        </div>
      </form>

      {/* Existing Routes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Popular Routes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Route</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map(route => (
                <tr key={route._id}>
                  <td className="p-3 font-medium">{route.from} to {route.to}</td>
                  <td className="p-3 text-gray-500">/book-taxi/{route.slug}</td>
                  <td className="p-3 flex gap-3">
                    <button onClick={() => handleEdit(route)}><Edit size={18}/></button>
                    <button onClick={() => handleDelete(route._id)}><Trash2 size={18}/></button>
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

export default ManagePopularRoutes;
