// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { AdminContext } from '../context/AdminContext';
// import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

// const ManageOutstationsSiteMap = () => {
//     const { adminToken } = useContext(AdminContext);
//     const [outstations, setOutstations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(null);

//     const initialFormData = {
//         name: '',
//         slug: '',
//         description: '',
//         atAGlance: '',
//         fares: [],
//         whyBook: [],
//         extraInfo: '',
//         faqs: []
//     };
//     const [formData, setFormData] = useState(initialFormData);

//     const fetchOutstations = async () => {
//         try {
//             const res = await axios.get('http://localhost:5000/api/outstations');
//             setOutstations(res.data || []);
//         } catch (err) {
//             setError('Failed to fetch outstation data.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { fetchOutstations(); }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "whyBook") {
//             setFormData(prev => ({ ...prev, whyBook: value.split('\n') }));
//         } else {
//             setFormData(prev => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleNestedChange = (type, index, e) => {
//         const { name, value } = e.target;
//         const newArr = [...formData[type]];
//         newArr[index][name] = value;
//         setFormData(prev => ({ ...prev, [type]: newArr }));
//     };

//     const addNestedItem = (type) => {
//         const newItem = type === 'fares' ? { route: '', price: '' } : { question: '', answer: '' };
//         setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
//     };

//     const removeNestedItem = (type, index) => {
//         setFormData(prev => ({ ...prev, [type]: formData[type].filter((_, i) => i !== index) }));
//     };
    
//     const resetForm = () => {
//         setEditMode(null);
//         setFormData(initialFormData);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = editMode ? `http://localhost:5000/api/outstations/${editMode}` : 'http://localhost:5000/api/outstations';
//         const method = editMode ? 'put' : 'post';

//         try {
//             await axios[method](url, formData, { headers: { Authorization: `Bearer ${adminToken}` } });
//             alert(`Outstation location ${editMode ? 'updated' : 'created'} successfully!`);
//             resetForm();
//             fetchOutstations();
//         } catch (err) {
//             setError(err.response?.data?.message || 'An error occurred.');
//         }
//     };

//     const handleEdit = (outstation) => {
//         setEditMode(outstation.slug);
//         setFormData({
//             name: outstation.name,
//             slug: outstation.slug,
//             description: outstation.description || '',
//             atAGlance: outstation.atAGlance || '',
//             fares: outstation.fares || [],
//             whyBook: outstation.whyBook || [],
//             extraInfo: outstation.extraInfo || '',
//             faqs: outstation.faqs || []
//         });
//         window.scrollTo(0, 0);
//     };

//     const handleDelete = async (slug) => {
//         if(window.confirm('Are you sure?')) {
//             try {
//                 await axios.delete(`http://localhost:5000/api/outstations/${slug}`, { headers: { Authorization: `Bearer ${adminToken}` } });
//                 alert('Outstation location deleted successfully!');
//                 fetchOutstations();
//             } catch (err) {
//                 setError('Failed to delete outstation location.');
//             }
//         }
//     };

//     return (
//         <div className="p-6 bg-slate-50 min-h-full">
//             <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Pages</h1>
//             <div className="bg-white p-8 rounded-lg shadow-md mb-8">
//                 <h2 className="text-2xl font-semibold mb-6">{editMode ? `Editing: ${formData.name}` : 'Add New Outstation Location'}</h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Location Name (e.g., Gurgaon)" className="p-3 border rounded-md" required/>
//                         <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="URL Slug (e.g., gurgaon)" className="p-3 border rounded-md" required/>
//                     </div>
//                     <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description..." rows="3" className="w-full p-3 border rounded-md"/>
                    
//                     <fieldset className="border p-4 rounded-md">
//                         <legend className="px-2 font-semibold">Popular Fares</legend>
//                         {formData.fares.map((fare, index) => (
//                             <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
//                                 <input name="route" value={fare.route} onChange={(e) => handleNestedChange('fares', index, e)} placeholder="Route (e.g., Delhi to Jaipur)" className="p-2 border rounded-md"/>
//                                 <input name="price" type="number" value={fare.price} onChange={(e) => handleNestedChange('fares', index, e)} placeholder="Price (₹)" className="p-2 border rounded-md"/>
//                                 <button type="button" onClick={() => removeNestedItem('fares', index)} className="text-red-500 justify-self-center"><XCircle/></button>
//                             </div>
//                         ))}
//                         <button type="button" onClick={() => addNestedItem('fares')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add Fare</button>
//                     </fieldset>

//                     <fieldset className="border p-4 rounded-md">
//                         <legend className="px-2 font-semibold">FAQs</legend>
//                         {formData.faqs.map((faq, index) => (
//                             <div key={index} className="grid grid-cols-1 gap-2 mb-2 relative">
//                                 <button type="button" onClick={() => removeNestedItem('faqs', index)} className="absolute top-2 right-2 text-red-500"><XCircle size={16}/></button>
//                                 <input name="question" value={faq.question} onChange={(e) => handleNestedChange('faqs', index, e)} placeholder="Question" className="p-2 border rounded-md"/>
//                                 <textarea name="answer" value={faq.answer} onChange={(e) => handleNestedChange('faqs', index, e)} placeholder="Answer" rows="2" className="p-2 border rounded-md"/>
//                             </div>
//                         ))}
//                         <button type="button" onClick={() => addNestedItem('faqs')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add FAQ</button>
//                     </fieldset>

//                     <div className="flex justify-end gap-4 border-t pt-4">
//                         <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
//                         <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update' : 'Save'}</button>
//                     </div>
//                 </form>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-2xl font-semibold mb-4">Existing Outstation Locations</h2>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-sm">
//                         <thead className="bg-gray-100 uppercase text-xs">
//                             <tr>
//                                 <th className="p-3 text-left">Name</th>
//                                 <th className="p-3 text-left">Slug</th>
//                                 <th className="p-3 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {outstations.map(outstation => (
//                                 <tr key={outstation._id} className="border-b">
//                                     <td className="p-3 font-medium">{outstation.name}</td>
//                                     <td className="p-3 text-gray-500">/outstation-cabs/{outstation.slug}</td>
//                                     <td className="p-3 flex gap-3">
//                                         <button onClick={() => handleEdit(outstation)} className="text-blue-600"><Edit size={18}/></button>
//                                         <button onClick={() => handleDelete(outstation.slug)} className="text-red-600"><Trash2 size={18}/></button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ManageOutstationsSiteMap;





import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManageOutstationsSiteMap = () => {
  const { adminToken } = useContext(AdminContext);
  const [outstations, setOutstations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const initialFormData = {
    name: '',
    slug: '',
    descriptions: [],
    atAGlance: '',
    fares: [],
    whyBook: [],
    extraInfo: '',
    faqs: [],
    sections: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [sectionFiles, setSectionFiles] = useState({}); // index: File

  const fetchOutstations = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/outstations');
      setOutstations(res.data || []);
    } catch (err) {
      setError('Failed to fetch outstation data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOutstations(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "whyBook") {
      setFormData(prev => ({ ...prev, whyBook: value.split('\n').filter(Boolean) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // --- Description Blocks ---
  const handleDescriptionChange = (index, e) => {
    const { name, value } = e.target;
    const newDescriptions = [...formData.descriptions];
    newDescriptions[index][name] = value;
    setFormData(prev => ({ ...prev, descriptions: newDescriptions }));
  };

  const addDescription = () => setFormData(prev => ({
    ...prev,
    descriptions: [...prev.descriptions, { title: '', content: '', order: 0 }]
  }));

  const removeDescription = (index) =>
    setFormData(prev => ({
      ...prev,
      descriptions: prev.descriptions.filter((_, i) => i !== index)
    }));

  // --- Fares ---
  const handleNestedChange = (type, index, e) => {
    const { name, value } = e.target;
    const newArr = [...formData[type]];
    newArr[index][name] = value;
    setFormData(prev => ({ ...prev, [type]: newArr }));
  };

  const addNestedItem = (type) => {
    const newItem = type === 'fares' ? { route: '', price: '' } : { question: '', answer: '' };
    setFormData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
  };

  const removeNestedItem = (type, index) =>
    setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));

  // --- Sections ---
  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...formData.sections];
    newSections[index][name] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => setFormData(prev => ({
    ...prev,
    sections: [...prev.sections, { heading: '', headingType: 'h2', subheading: '', paragraph: '', paragraphAlign: 'left', image: '', imageTitle: '', imageAltText: '' }]
  }));

  const removeSection = (index) => {
    setFormData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== index) }));
    setSectionFiles(prev => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  // --- Submit Form ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === 'descriptions' || key === 'sections' || key === 'faqs' || key === 'fares' || key === 'whyBook') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
      Object.keys(sectionFiles).forEach(index => data.append('sectionImages', sectionFiles[index]));

      const url = editMode
        ? `http://localhost:5000/api/outstations/${editMode}`
        : 'http://localhost:5000/api/outstations';
      const method = editMode ? 'put' : 'post';

      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'multipart/form-data' }
      });

      alert(`Outstation ${editMode ? 'updated' : 'created'} successfully!`);
      resetForm();
      fetchOutstations();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleEdit = (outstation) => {
    setEditMode(outstation.slug);
    setFormData({
      name: outstation.name,
      slug: outstation.slug,
      descriptions: outstation.descriptions || [],
      atAGlance: outstation.atAGlance || '',
      fares: outstation.fares || [],
      whyBook: outstation.whyBook || [],
      extraInfo: outstation.extraInfo || '',
      faqs: outstation.faqs || [],
      sections: outstation.sections?.map(sec => ({
        ...sec,
        headingType: sec.headingType || 'h2',
        paragraphAlign: sec.paragraphAlign || 'left'
      })) || []
    });
    setSectionFiles({});
    window.scrollTo(0, 0);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/outstations/${slug}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      alert('Outstation location deleted successfully!');
      fetchOutstations();
    } catch (err) {
      setError('Failed to delete outstation location.');
    }
  };

  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
    setSectionFiles({});
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Outstation Pages</h1>
      
      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">{editMode ? `Editing: ${formData.name}` : 'Add New Outstation Location'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Location Name (e.g., Gurgaon)" className="p-3 border rounded-md" required/>
            <input name="slug" value={formData.slug} onChange={handleInputChange} placeholder="URL Slug (e.g., gurgaon)" className="p-3 border rounded-md" required/>
          </div>

          {/* Descriptions */}
          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold">Descriptions</legend>
            {formData.descriptions.map((desc, index) => (
              <div key={index} className="border p-4 rounded-md mb-4 relative">
                <button type="button" onClick={() => removeDescription(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={16}/></button>
                <input name="title" placeholder="Title" value={desc.title} onChange={(e) => handleDescriptionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
                <textarea name="content" placeholder="Content" value={desc.content} onChange={(e) => handleDescriptionChange(index, e)} className="p-2 border rounded-md w-full h-20 mb-2"/>
                <input name="order" type="number" placeholder="Order" value={desc.order} onChange={(e) => handleDescriptionChange(index, e)} className="p-2 border rounded-md w-full"/>
              </div>
            ))}
            <button type="button" onClick={addDescription} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Description</button>
          </fieldset>

          {/* Popular Fares */}
          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold">Popular Fares</legend>
            {formData.fares.map((fare, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 items-center mb-2">
                <input name="route" value={fare.route} onChange={(e) => handleNestedChange('fares', index, e)} placeholder="Route" className="p-2 border rounded-md"/>
                <input name="price" type="number" value={fare.price} onChange={(e) => handleNestedChange('fares', index, e)} placeholder="Price (₹)" className="p-2 border rounded-md"/>
                <button type="button" onClick={() => removeNestedItem('fares', index)} className="text-red-500 justify-self-center"><XCircle/></button>
              </div>
            ))}
            <button type="button" onClick={() => addNestedItem('fares')} className="flex items-center gap-2 text-sm text-blue-600"><PlusCircle size={16}/> Add Fare</button>
          </fieldset>

          {/* Why Book */}
          <textarea name="whyBook" value={formData.whyBook.join('\n')} onChange={handleInputChange} placeholder="Why Book (one per line)" rows="4" className="w-full p-3 border rounded-md"/>

          {/* Extra Info */}
          <textarea name="extraInfo" value={formData.extraInfo} onChange={handleInputChange} placeholder="Extra Info" rows="3" className="w-full p-3 border rounded-md"/>

          {/* Sections (With Images) */}
          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 font-semibold text-gray-700">Sections</legend>
            {formData.sections.map((section, index) => (
              <div key={index} className="border p-4 rounded-md mb-4 relative">
                <button type="button" onClick={() => removeSection(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18} /></button>

                <input name="heading" placeholder="Heading" value={section.heading} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
                <label className="text-sm font-medium">Heading Type</label>
                <select name="headingType" value={section.headingType} onChange={(e) => handleSectionChange(index, e)} className="mt-1 w-full p-2 border rounded-md bg-white mb-2">
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                  <option value="p">Paragraph</option>
                </select>

                <input name="subheading" placeholder="Subheading" value={section.subheading || ''} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
                <textarea name="paragraph" placeholder="Paragraph" value={section.paragraph} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2 h-20"/>

                <label className="text-sm font-medium">Paragraph Align</label>
                <select name="paragraphAlign" value={section.paragraphAlign} onChange={(e) => handleSectionChange(index, e)} className="mt-1 w-full p-2 border rounded-md bg-white mb-2">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>

                {/* Section Image */}
                <input type="file" accept="image/*" onChange={(e) => setSectionFiles(prev => ({ ...prev, [index]: e.target.files[0] }))} />
                {section.image && !sectionFiles[index] && (
                  <img src={section.image} alt={section.imageAltText || "Section"} className="h-16 w-auto rounded-md border mt-2" />
                )}
                <input name="imageTitle" placeholder="Image Title" value={section.imageTitle || ''} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mt-2" />
                <input name="imageAltText" placeholder="Image Alt Text" value={section.imageAltText || ''} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mt-2" />
              </div>
            ))}
            <button type="button" onClick={addSection} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Section</button>
          </fieldset>

          {/* FAQs */}
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

          {/* Actions */}
          <div className="flex justify-end gap-4 border-t pt-4">
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg">{editMode ? 'Update' : 'Save'}</button>
          </div>
        </form>
      </div>

      {/* Existing Outstations Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Outstation Locations</h2>
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
              {outstations.map(outstation => (
                <tr key={outstation._id} className="border-b">
                  <td className="p-3 font-medium">{outstation.name}</td>
                  <td className="p-3 text-gray-500">/outstation-cabs/{outstation.slug}</td>
                  <td className="p-3 flex gap-3">
                    <button onClick={() => handleEdit(outstation)} className="text-blue-600"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(outstation.slug)} className="text-red-600"><Trash2 size={18}/></button>
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

export default ManageOutstationsSiteMap;
