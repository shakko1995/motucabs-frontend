


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Edit, Trash2, PlusCircle, XCircle } from 'lucide-react';

const ManagePages = () => {
  const { adminToken } = useContext(AdminContext);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const initialFormData = {
    title: '',
    subtitle: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    metaOgTitle: '',
    metaOgDescription: '',
    metaOgImage: '',
    bannerImage: '',
    bannerTitle: '',
    bannerAltText: '',
    sections: [],
    faqs: [],
    isPublished: true,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [bannerFile, setBannerFile] = useState(null);
  const [sectionFiles, setSectionFiles] = useState({}); // {0: File, 1: File, ...}

  // Fetch pages
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/pages', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setPages(res.data.pages || []);
    } catch (err) {
      setError('Failed to fetch pages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (adminToken) fetchPages(); }, [adminToken]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "metaKeywords") {
      setFormData(prev => ({ ...prev, metaKeywords: value.split(',').map(k => k.trim()) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  // Section input change
  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;
    const newSections = [...formData.sections];
    newSections[index][name] = value;
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const addSection = () => setFormData(prev => ({
    ...prev,
    sections: [...prev.sections, { heading: '', paragraph: '', image: '', imageTitle: '', imageAltText: '' }]
  }));
  const removeSection = (index) => {
    setFormData(prev => ({ ...prev, sections: formData.sections.filter((_, i) => i !== index) }));
    setSectionFiles(prev => { const copy = { ...prev }; delete copy[index]; return copy; });
  };

  // FAQs input change
  const handleFaqChange = (index, e) => {
    const { name, value } = e.target;
    const newFaqs = [...formData.faqs];
    newFaqs[index][name] = value;
    setFormData(prev => ({ ...prev, faqs: newFaqs }));
  };
  const addFaq = () => setFormData(prev => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));
  const removeFaq = (index) => setFormData(prev => ({ ...prev, faqs: formData.faqs.filter((_, i) => i !== index) }));

  const resetForm = () => {
    setEditMode(null);
    setFormData(initialFormData);
    setBannerFile(null);
    setSectionFiles({});
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        if (key === 'sections' || key === 'faqs' || key === 'metaKeywords') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }
      if (bannerFile) data.append('bannerImage', bannerFile);
      Object.keys(sectionFiles).forEach(index => data.append('sectionImages', sectionFiles[index]));

      const url = editMode ? `http://localhost:5000/api/pages/${editMode}` : 'http://localhost:5000/api/pages';
      const method = editMode ? 'put' : 'post';

      await axios[method](url, data, {
        headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'multipart/form-data' }
      });

      alert(`Page ${editMode ? 'updated' : 'created'} successfully!`);
      resetForm();
      fetchPages();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleEdit = (page) => {
    setEditMode(page._id);
    setFormData({
      ...page,
      metaKeywords: page.metaKeywords || [],
      sections: page.sections?.map(sec => ({ ...sec, imageTitle: sec.imageTitle || '', imageAltText: sec.imageAltText || '' })) || [],
      faqs: page.faqs || [],
      bannerImage: page.bannerImage || '',
      bannerTitle: page.bannerTitle || '',
      bannerAltText: page.bannerAltText || '',
    });
    setBannerFile(null);
    setSectionFiles({});
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/pages/${id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      alert('Page deleted successfully!');
      fetchPages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete page.');
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Custom Pages</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-8 space-y-6">
        {/* Page Info */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold text-gray-700">Page Info</legend>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="title" placeholder="Title (H1)" value={formData.title} onChange={handleInputChange} className="p-3 border rounded-md" required />
            <input name="subtitle" placeholder="Subtitle (H2)" value={formData.subtitle} onChange={handleInputChange} className="p-3 border rounded-md" />
            <input name="slug" placeholder="URL Slug" value={formData.slug} onChange={handleInputChange} className="p-3 border rounded-md" required />
          </div>
        </fieldset>

        {/* SEO Fields */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold text-gray-700">SEO & Meta</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="metaTitle" placeholder="Meta Title" value={formData.metaTitle} onChange={handleInputChange} className="p-3 border rounded-md" />
            <input name="metaDescription" placeholder="Meta Description" value={formData.metaDescription} onChange={handleInputChange} className="p-3 border rounded-md" />
            <input name="metaKeywords" placeholder="Meta Keywords (comma separated)" value={formData.metaKeywords.join(', ')} onChange={handleInputChange} className="p-3 border rounded-md" />
          </div>
        </fieldset>

        {/* Banner Image */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold text-gray-700">Banner Image</legend>
          <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} />
          {formData.bannerImage && !bannerFile && (
            <img src={formData.bannerImage} alt={formData.bannerAltText || "Banner"} className="h-16 w-auto rounded-md border mt-2" />
          )}
          <input
            name="bannerTitle"
            placeholder="Banner Title"
            value={formData.bannerTitle}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full mt-2"
          />
          <input
            name="bannerAltText"
            placeholder="Banner Alt Text"
            value={formData.bannerAltText}
            onChange={handleInputChange}
            className="p-2 border rounded-md w-full mt-2"
          />
        </fieldset>

        {/* Sections */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold text-gray-700">Sections</legend>
          {formData.sections.map((section, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              <button type="button" onClick={() => removeSection(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18} /></button>
              <input name="heading" placeholder="Heading" value={section.heading} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
              <textarea name="paragraph" placeholder="Paragraph" value={section.paragraph} onChange={(e) => handleSectionChange(index, e)} className="p-2 border rounded-md w-full mb-2 h-20"/>
              
              {/* Section Image Upload */}
              <input type="file" accept="image/*" onChange={(e) => setSectionFiles(prev => ({ ...prev, [index]: e.target.files[0] }))} />
              {section.image && !sectionFiles[index] && (
                <img src={section.image} alt={section.imageAltText || "Section Image"} className="h-16 w-auto rounded-md border mt-2" />
              )}
              <input
                name="imageTitle"
                placeholder="Image Title"
                value={section.imageTitle || ''}
                onChange={(e) => handleSectionChange(index, e)}
                className="p-2 border rounded-md w-full mt-2"
              />
              <input
                name="imageAltText"
                placeholder="Image Alt Text"
                value={section.imageAltText || ''}
                onChange={(e) => handleSectionChange(index, e)}
                className="p-2 border rounded-md w-full mt-2"
              />
            </div>
          ))}
          <button type="button" onClick={addSection} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add Section</button>
        </fieldset>

        {/* FAQs */}
        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 font-semibold text-gray-700">FAQs</legend>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="border p-4 rounded-md mb-4 relative">
              <button type="button" onClick={() => removeFaq(index)} className="absolute top-2 right-2 text-red-500"><XCircle size={18}/></button>
              <input name="question" placeholder="Question" value={faq.question} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md w-full mb-2"/>
              <textarea name="answer" placeholder="Answer" value={faq.answer} onChange={(e) => handleFaqChange(index, e)} className="p-2 border rounded-md w-full h-20"/>
            </div>
          ))}
          <button type="button" onClick={addFaq} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-md"><PlusCircle size={16}/> Add FAQ</button>
        </fieldset>

        {/* Publish & Actions */}
        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} id="isPublished" className="h-4 w-4"/>
            <label htmlFor="isPublished">Publish Page</label>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">{editMode ? 'Update Page' : 'Save Page'}</button>
          </div>
        </div>
      </form>

      {/* Existing Pages Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Existing Pages</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 uppercase text-xs">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Slug</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(page => (
                <tr key={page._id} className="border-b">
                  <td className="p-3 font-medium">{page.title}</td>
                  <td className="p-3 text-gray-500">/page/{page.slug}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${page.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {page.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button onClick={() => handleEdit(page)} className="text-blue-600"><Edit size={18}/></button>
                    <button onClick={() => handleDelete(page._id)} className="text-red-600"><Trash2 size={18}/></button>
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

export default ManagePages;


