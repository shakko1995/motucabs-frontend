// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

// const ManageAirportsSiteMap = () => {
//   const { adminToken } = useContext(AdminContext);
//   const [airports, setAirports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(null);

//   const initialFormData = {
//     name: '',
//     code: '',
//     slug: '',
//     description: '',
//     transfers: [],
//     whyBook: [],
//     extraInfo: '',
//     sections: [],
//     faqs: [],
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [sectionFiles, setSectionFiles] = useState({}); // {0: File, 1: File, ...}

//   // Fetch airports
//   const fetchAirports = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get('http://localhost:5000/api/airports');
//       setAirports(res.data || []);
//     } catch (err) {
//       setError('Failed to fetch airports.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchAirports(); }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "whyBook") {
//       setFormData(prev => ({ ...prev, whyBook: value.split(',').map(item => item.trim()) }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleTransferChange = (index, e) => {
//     const { name, value } = e.target;
//     const newTransfers = [...formData.transfers];
//     newTransfers[index][name] = value;
//     setFormData(prev => ({ ...prev, transfers: newTransfers }));
//   };

//   const addTransfer = () => setFormData(prev => ({
//     ...prev,
//     transfers: [...prev.transfers, { destination: '', price: '' }]
//   }));
//   const removeTransfer = (index) => setFormData(prev => ({
//     ...prev,
//     transfers: formData.transfers.filter((_, i) => i !== index)
//   }));

//   // Sections
//   const handleSectionChange = (index, e) => {
//     const { name, value } = e.target;
//     const newSections = [...formData.sections];
//     newSections[index][name] = value;
//     setFormData(prev => ({ ...prev, sections: newSections }));
//   };

//   const addSection = () => setFormData(prev => ({
//     ...prev,
//     sections: [...prev.sections, { heading: '', paragraph: '', image: '', imageAltText: '' }]
//   }));

//   const removeSection = (index) => {
//     setFormData(prev => ({ ...prev, sections: formData.sections.filter((_, i) => i !== index) }));
//     setSectionFiles(prev => { const copy = { ...prev }; delete copy[index]; return copy; });
//   };

//   // FAQs
//   const handleFaqChange = (index, e) => {
//     const { name, value } = e.target;
//     const newFaqs = [...formData.faqs];
//     newFaqs[index][name] = value;
//     setFormData(prev => ({ ...prev, faqs: newFaqs }));
//   };

//   const addFaq = () => setFormData(prev => ({
//     ...prev,
//     faqs: [...prev.faqs, { question: '', answer: '' }]
//   }));

//   const removeFaq = (index) => setFormData(prev => ({
//     ...prev,
//     faqs: formData.faqs.filter((_, i) => i !== index)
//   }));

//   const resetForm = () => {
//     setEditMode(null);
//     setFormData(initialFormData);
//     setSectionFiles({});
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       for (let key in formData) {
//         if (key === 'sections' || key === 'faqs' || key === 'transfers' || key === 'whyBook') {
//           data.append(key, JSON.stringify(formData[key]));
//         } else {
//           data.append(key, formData[key]);
//         }
//       }

//       Object.keys(sectionFiles).forEach(index => {
//         data.append(`sectionImage_${index}`, sectionFiles[index]);
//       });

//       const url = editMode ? `http://localhost:5000/api/airports/${editMode}` : 'http://localhost:5000/api/airports';
//       const method = editMode ? 'put' : 'post';

//       await axios[method](url, data, {
//         headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'multipart/form-data' }
//       });

//       alert(`Airport ${editMode ? 'updated' : 'created'} successfully!`);
//       resetForm();
//       fetchAirports();
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred.');
//     }
//   };

//   const handleEdit = (airport) => {
//     setEditMode(airport._id);
//     setFormData({
//       name: airport.name,
//       code: airport.code,
//       slug: airport.slug,
//       description: airport.description || '',
//       transfers: airport.transfers || [],
//       whyBook: airport.whyBook || [],
//       extraInfo: airport.extraInfo || '',
//       sections: airport.sections || [],
//       faqs: airport.faqs || [],
//     });
//     setSectionFiles({});
//     window.scrollTo(0, 0);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/airports/${id}`, {
//         headers: { Authorization: `Bearer ${adminToken}` }
//       });
//       alert('Airport deleted successfully!');
//       fetchAirports();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to delete airport.');
//     }
//   };

//   return (
//     <div className="p-6 bg-slate-50 min-h-full">
//       <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Airports</h1>

//       <div className="bg-white p-8 rounded-lg shadow-md mb-8">
//         <h2 className="text-2xl font-semibold mb-6">{editMode ? 'Edit Airport' : 'Add New Airport'}</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Airport Name" className="p-3 border rounded-md" required />
//             <input name="code" value={formData.code} onChange={handleInputChange} placeholder="Airport Code" className="p-3 border rounded-md" required />
//             <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="URL Slug" className="p-3 border rounded-md" required />
//           </div>

//           <div>
//             <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Description" className="p-3 border rounded-md w-full"/>
//           </div>

//           <fieldset className="border p-4 rounded-md">
//             <legend className="px-2 font-semibold">Transfers</legend>
//             {formData.transfers.map((transfer, index) => (
//               <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
//                 <input name="destination" value={transfer.destination} onChange={(e) => handleTransferChange(index, e)} placeholder="Destination" className="p-2 border rounded-md"/>
//                 <input name="price" type="number" value={transfer.price} onChange={(e) => handleTransferChange(index, e)} placeholder="Price" className="p-2 border rounded-md"/>
//                 <button type="button" onClick={() => removeTransfer(index)} className="text-red-500 justify-self-center"><XCircle size={18}/></button>
//               </div>
//             ))}
//             <button type="button" onClick={addTransfer} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Transfer</button>
//           </fieldset>

//           <fieldset className="border p-4 rounded-md">
//             <legend className="px-2 font-semibold">Sections</legend>
//             {formData.sections.map((section, index) => (
//               <div key={index} className="border p-4 rounded-md mb-4 relative">
//                 <button type="button" onClick={() => removeSection(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18} /></button>
//                 <input name="heading" placeholder="Heading" value={section.heading} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
//                 <textarea name="paragraph" placeholder="Paragraph" value={section.paragraph} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2 h-20"/>
//                 <input type="file" accept="image/*" onChange={(e) => setSectionFiles(prev => ({ ...prev, [index]: e.target.files[0] }))} />
//                 {section.image && !sectionFiles[index] && <img src={section.image} alt={section.imageAltText || ''} className="mt-2 w-48 h-32 object-cover" />}
//               </div>
//             ))}
//             <button type="button" onClick={addSection} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Section</button>
//           </fieldset>

//           <fieldset className="border p-4 rounded-md">
//             <legend className="px-2 font-semibold">FAQs</legend>
//             {formData.faqs.map((faq, index) => (
//               <div key={index} className="grid grid-cols-2 gap-2 items-center mb-2">
//                 <input name="question" placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md"/>
//                 <input name="answer" placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md"/>
//                 <button type="button" onClick={() => removeFaq(index)} className="text-red-500 justify-self-center"><XCircle size={18}/></button>
//               </div>
//             ))}
//             <button type="button" onClick={addFaq} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add FAQ</button>
//           </fieldset>

//           <div className="flex justify-end gap-4">
//             <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
//             <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update Airport' : 'Save Airport'}</button>
//           </div>
//         </form>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Existing Airports</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-100 uppercase text-xs">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Slug</th>
//                 <th className="p-3 text-left">Code</th>
//                 <th className="p-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {airports.map(airport => (
//                 <tr key={airport._id} className="border-b">
//                   <td className="p-3 font-medium">{airport.name}</td>
//                   <td className="p-3">/{airport.slug}</td>
//                   <td className="p-3">{airport.code}</td>
//                   <td className="p-3 flex gap-3">
//                     <button onClick={() => handleEdit(airport)} className="text-blue-600"><Edit size={18}/></button>
//                     <button onClick={() => handleDelete(airport._id)} className="text-red-600"><Trash2 size={18}/></button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ManageAirportsSiteMap;

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
    extraInfo: '',
    sections: [],
    faqs: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sectionFiles, setSectionFiles] = useState({}); // {0: File, 1: File, ...}

  // Fetch airports
  const fetchAirports = async () => {
    try {
      setLoading(true);
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

  const addTransfer = () => setFormData(prev => ({
    ...prev,
    transfers: [...prev.transfers, { destination: '', price: '' }]
  }));
  const removeTransfer = (index) => setFormData(prev => ({
    ...prev,
    transfers: formData.transfers.filter((_, i) => i !== index)
  }));

  // Sections
  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...formData.sections];
    newSections[index][name] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => setFormData(prev => ({
    ...prev,
    sections: [...prev.sections, { heading: '', paragraph: '', image: '', imageAltText: '' }]
  }));

  const removeSection = (index) => {
    setFormData(prev => ({ ...prev, sections: formData.sections.filter((_, i) => i !== index) }));
    setSectionFiles(prev => { const copy = { ...prev }; delete copy[index]; return copy; });
  };

  // FAQs
  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const newFaqs = [...formData.faqs];
    newFaqs[index][name] = value;
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };

  const addFaq = () => setFormData(prev => ({
    ...prev,
    faqs: [...prev.faqs, { question: '', answer: '' }]
  }));

  const removeFaq = (index) => setFormData(prev => ({
    ...prev,
    faqs: formData.faqs.filter((_, i) => i !== index)
  }));

  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
    setSectionFiles({});
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === 'sections' || key === 'faqs' || key === 'transfers' || key === 'whyBook') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }

      Object.keys(sectionFiles).forEach(index => {
        data.append(`sectionImage_${index}`, sectionFiles[index]);
      });

      const url = editMode ? `http://localhost:5000/api/airports/${editMode}` : 'http://localhost:5000/api/airports';
      const method = editMode ? 'put' : 'post';

      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'multipart/form-data' }
      });

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
      sections: airport.sections || [],
      faqs: airport.faqs || [],
    });
    setSectionFiles({});
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/airports/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      alert('Airport deleted successfully!');
      fetchAirports();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete airport.');
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Airports</h1>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">{editMode ? 'Edit Airport' : 'Add New Airport'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Airport Name" className="p-3 border rounded-md" required />
            <input name="code" value={formData.code} onChange={handleInputChange} placeholder="Airport Code" className="p-3 border rounded-md" required />
            <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="URL Slug" className="p-3 border rounded-md" required />
          </div>

          <div>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" placeholder="Description" className="p-3 border rounded-md w-full"/>
          </div>

          <div>
            <textarea
              name="whyBook"
              value={formData.whyBook.join(', ')}
              onChange={handleInputChange}
              placeholder="Why Book (comma-separated)"
              className="p-3 border rounded-md w-full"
            />
          </div>

          <div>
            <textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleInputChange}
              placeholder="Extra Info"
              className="p-3 border rounded-md w-full"
            />
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold">Transfers</legend>
            {formData.transfers.map((transfer, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
                <input name="destination" value={transfer.destination} onChange={(e) => handleTransferChange(index, e)} placeholder="Destination" className="p-2 border rounded-md"/>
                <input name="price" type="number" value={transfer.price} onChange={(e) => handleTransferChange(index, e)} placeholder="Price" className="p-2 border rounded-md"/>
                <button type="button" onClick={() => removeTransfer(index)} className="text-red-500 justify-self-center"><XCircle size={18}/></button>
              </div>
            ))}
            <button type="button" onClick={addTransfer} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Transfer</button>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold">Sections</legend>
            {formData.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-md mb-4 relative">
                <button type="button" onClick={() => removeSection(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18} /></button>
                <input name="heading" placeholder="Heading" value={section.heading} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
                <textarea name="paragraph" placeholder="Paragraph" value={section.paragraph} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2 h-20"/>
                <input name="imageAltText" placeholder="Image Alt Text" value={section.imageAltText} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
                <input type="file" accept="image/*" onChange={(e) => setSectionFiles(prev => ({ ...prev, [index]: e.target.files[0] }))} />
                {section.image && !sectionFiles[index] && <img src={section.image} alt={section.imageAltText || ''} className="mt-2 w-48 h-32 object-cover" />}
              </div>
            ))}
            <button type="button" onClick={addSection} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Section</button>
          </fieldset>

          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold">FAQs</legend>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 items-center mb-2">
                <input name="question" placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md"/>
                <input name="answer" placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md"/>
                <button type="button" onClick={() => removeFaq(index)} className="text-red-500 justify-self-center"><XCircle size={18}/></button>
              </div>
            ))}
            <button type="button" onClick={addFaq} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add FAQ</button>
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
