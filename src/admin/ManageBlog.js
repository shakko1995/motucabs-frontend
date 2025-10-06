

import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';
import { Editor } from '@tinymce/tinymce-react';
import { Edit, Trash2, Plus, Minus, MoveUp, MoveDown, X } from 'lucide-react';

const ManageBlog = () => {
    const { adminToken } = useContext(AdminContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [blogMode, setBlogMode] = useState('simple'); // 'simple' or 'advanced'
    const [showBasicInfo, setShowBasicInfo] = useState(true);
    const [showBanner, setShowBanner] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);
    const [showSEO, setShowSEO] = useState(false);
    const [showOG, setShowOG] = useState(false);
    const [showPublishing, setShowPublishing] = useState(false);

    const initialFormData = {
        title: '',
        subtitle: '',
        slug: '',
        category: 'Travel',
        tags: [],
        metaTitle: '',
        metaDescription: '',
        metaKeywords: [],
        metaRobots: 'index, follow',
        metaOgTitle: '',
        metaOgDescription: '',
        metaOgImage: '',
        bannerImage: '',
        bannerAltText: '',
        bannerTitle: '',
        bannerAlign: 'center',
        sections: [],
        authorName: 'Admin',
        authorAvatar: '',
        authorBio: '',
        readTime: '',
        publishedDate: new Date().toISOString().split('T')[0],
        isPublished: true,
        isFeatured: false,
        adminNotes: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const editorRef = useRef(null);

    const categoryOptions = [
        "Travel", "Festival", "Events", "Offers", "Guides", "Tips",
        "Technology", "Company Updates", "News", "Stories", "Lifestyle",
        "Culture", "Occasions", "Announcements", "Destinations", "Tourism",
        "Partnerships", "Adventure", "Luxury Travel", "Other"
    ];

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/blogs', {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            setPosts(res.data.blogs || []);
        } catch (err) {
            setError('Failed to fetch blog posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, [adminToken]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (["tags", "metaKeywords"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(tag => tag.trim()).filter(tag => tag)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    // Generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: generateSlug(title)
        }));
    };

    // Section Management Functions
    const addSection = (blockType) => {
        const newSection = {
            blockType,
            order: formData.sections.length,
            ...(blockType === 'heading' && { heading: '', headingType: 'h2', subheading: '' }),
            ...(blockType === 'paragraph' && { paragraph: '', paragraphAlign: 'left' }),
            ...(blockType === 'image' && { image: '', imageTitle: '', imageAltText: '', imageCaption: '' }),
            ...(blockType === 'list' && { listItems: [''], listType: 'unordered' }),
            ...(blockType === 'code' && { codeLanguage: 'javascript', codeContent: '' }),
            ...(blockType === 'highlight' && { highlightText: '', highlightColor: '#fff7cc' }),
            ...(blockType === 'table' && { tableData: { headers: ['Header 1'], rows: [['Cell 1']] } }),
        };
        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
    };

    const updateSection = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.map((section, i) =>
                i === index ? { ...section, [field]: value } : section
            )
        }));
    };

    const deleteSection = (index) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
        }));
    };

    const moveSection = (index, direction) => {
        const newSections = [...formData.sections];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newSections.length) {
            [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
            newSections.forEach((section, i) => section.order = i);
            setFormData(prev => ({ ...prev, sections: newSections }));
        }
    };

    // List item management
    const addListItem = (sectionIndex) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].listItems.push('');
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const updateListItem = (sectionIndex, itemIndex, value) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].listItems[itemIndex] = value;
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const deleteListItem = (sectionIndex, itemIndex) => {
        const newSections = [...formData.sections];
        if (newSections[sectionIndex].listItems.length > 1) {
            newSections[sectionIndex].listItems = newSections[sectionIndex].listItems.filter((_, i) => i !== itemIndex);
            setFormData(prev => ({ ...prev, sections: newSections }));
        }
    };

    // Table management
    const addTableRow = (sectionIndex) => {
        const newSections = [...formData.sections];
        const colCount = newSections[sectionIndex].tableData.headers.length;
        newSections[sectionIndex].tableData.rows.push(Array(colCount).fill(''));
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const addTableColumn = (sectionIndex) => {
        const newSections = [...formData.sections];
        const headerCount = newSections[sectionIndex].tableData.headers.length + 1;
        newSections[sectionIndex].tableData.headers.push(`Header ${headerCount}`);
        newSections[sectionIndex].tableData.rows = newSections[sectionIndex].tableData.rows.map(row => [...row, '']);
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const deleteTableRow = (sectionIndex, rowIndex) => {
        const newSections = [...formData.sections];
        if (newSections[sectionIndex].tableData.rows.length > 1) {
            newSections[sectionIndex].tableData.rows = newSections[sectionIndex].tableData.rows.filter((_, i) => i !== rowIndex);
            setFormData(prev => ({ ...prev, sections: newSections }));
        }
    };

    const deleteTableColumn = (sectionIndex, colIndex) => {
        const newSections = [...formData.sections];
        if (newSections[sectionIndex].tableData.headers.length > 1) {
            newSections[sectionIndex].tableData.headers = newSections[sectionIndex].tableData.headers.filter((_, i) => i !== colIndex);
            newSections[sectionIndex].tableData.rows = newSections[sectionIndex].tableData.rows.map(row =>
                row.filter((_, i) => i !== colIndex)
            );
            setFormData(prev => ({ ...prev, sections: newSections }));
        }
    };

    const updateTableHeader = (sectionIndex, headerIndex, value) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].tableData.headers[headerIndex] = value;
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const updateTableCell = (sectionIndex, rowIndex, colIndex, value) => {
        const newSections = [...formData.sections];
        newSections[sectionIndex].tableData.rows[rowIndex][colIndex] = value;
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const resetForm = () => {
        setEditMode(null);
        setFormData(initialFormData);
        setBlogMode('simple');
        setShowBasicInfo(true);
        setShowBanner(false);
        setShowAuthor(false);
        setShowSEO(false);
        setShowOG(false);
        setShowPublishing(false);
        if (editorRef.current) editorRef.current.setContent('');
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let finalData = { ...formData };

        // If simple mode, use TinyMCE content
        if (blogMode === 'simple') {
            const content = editorRef.current ? editorRef.current.getContent() : '';
            finalData.sections = [{ blockType: 'paragraph', paragraph: content, order: 0 }];
        }

        const url = editMode
            ? `http://localhost:5000/api/blogs/${editMode}`
            : 'http://localhost:5000/api/blogs';
        const method = editMode ? 'put' : 'post';

        try {
            await axios[method](url, finalData, {
                headers: { Authorization: `Bearer ${adminToken}` }
            });
            alert(`Blog post ${editMode ? 'updated' : 'created'} successfully!`);
            resetForm();
            fetchPosts();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving the blog post.');
        }
    };

    const handleEdit = (post) => {
        setEditMode(post._id);

        // Properly handle sections array
        const sectionsToSet = post.sections && Array.isArray(post.sections) ? post.sections : [];

        setFormData({
            ...initialFormData,
            ...post,
            sections: sectionsToSet,
            tags: Array.isArray(post.tags) ? post.tags : [],
            metaKeywords: Array.isArray(post.metaKeywords) ? post.metaKeywords : [],
            publishedDate: post.publishedDate ? new Date(post.publishedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        });

        // Determine mode based on sections
        if (sectionsToSet.length === 1 && sectionsToSet[0].blockType === 'paragraph') {
            setBlogMode('simple');
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.setContent(sectionsToSet[0].paragraph || '');
                }
            }, 100);
        } else {
            setBlogMode('advanced');
        }

        // Open all sections for editing
        setShowBasicInfo(true);
        setShowBanner(true);
        setShowAuthor(true);
        setShowSEO(true);
        setShowOG(true);
        setShowPublishing(true);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${adminToken}` }
                });
                alert('Blog post deleted successfully!');
                fetchPosts();
            } catch (err) {
                setError('Failed to delete post.');
            }
        }
    };

    const renderSectionEditor = (section, index) => {
        switch (section.blockType) {
            case 'heading':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Type</label>
                            <select
                                value={section.headingType || 'h2'}
                                onChange={(e) => updateSection(index, 'headingType', e.target.value)}
                                className="p-2 border rounded-md w-full"
                            >
                                <option value="h1">H1 - Main Title</option>
                                <option value="h2">H2 - Section Title</option>
                                <option value="h3">H3 - Subsection</option>
                                <option value="h4">H4 - Minor Heading</option>
                                <option value="h5">H5 - Small Heading</option>
                                <option value="h6">H6 - Smallest Heading</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Heading Text</label>
                            <input
                                value={section.heading || ''}
                                onChange={(e) => updateSection(index, 'heading', e.target.value)}
                                placeholder="Enter heading text"
                                className="w-full p-3 border rounded-md font-semibold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subheading (Optional)</label>
                            <input
                                value={section.subheading || ''}
                                onChange={(e) => updateSection(index, 'subheading', e.target.value)}
                                placeholder="Enter subheading"
                                className="w-full p-3 border rounded-md text-gray-600"
                            />
                        </div>
                    </div>
                );

            case 'paragraph':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
                            <select
                                value={section.paragraphAlign || 'left'}
                                onChange={(e) => updateSection(index, 'paragraphAlign', e.target.value)}
                                className="p-2 border rounded-md w-full"
                            >
                                <option value="left">Left Align</option>
                                <option value="center">Center Align</option>
                                <option value="right">Right Align</option>
                                <option value="justify">Justify</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph Content</label>
                            <textarea
                                value={section.paragraph || ''}
                                onChange={(e) => updateSection(index, 'paragraph', e.target.value)}
                                placeholder="Enter paragraph content"
                                className="w-full p-3 border rounded-md min-h-32"
                            />
                        </div>
                    </div>
                );

            case 'image':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                value={section.image || ''}
                                onChange={(e) => updateSection(index, 'image', e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full p-3 border rounded-md"
                            />
                            {section.image && (
                                <div className="mt-3 border rounded-md p-2 bg-gray-50">
                                    <img src={section.image} alt="Preview" className="max-h-48 mx-auto" onError={(e) => e.target.style.display = 'none'} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                            <input
                                value={section.imageTitle || ''}
                                onChange={(e) => updateSection(index, 'imageTitle', e.target.value)}
                                placeholder="Image title"
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (for SEO)</label>
                            <input
                                value={section.imageAltText || ''}
                                onChange={(e) => updateSection(index, 'imageAltText', e.target.value)}
                                placeholder="Descriptive alt text"
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                            <input
                                value={section.imageCaption || ''}
                                onChange={(e) => updateSection(index, 'imageCaption', e.target.value)}
                                placeholder="Image caption"
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                    </div>
                );

            case 'list':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">List Type</label>
                            <select
                                value={section.listType || 'unordered'}
                                onChange={(e) => updateSection(index, 'listType', e.target.value)}
                                className="p-2 border rounded-md w-full"
                            >
                                <option value="unordered">Bullet List (•)</option>
                                <option value="ordered">Numbered List (1,2,3...)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">List Items</label>
                            {section.listItems?.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex gap-2 mb-2">
                                    <span className="p-3 text-gray-500 font-medium">{section.listType === 'ordered' ? `${itemIndex + 1}.` : '•'}</span>
                                    <input
                                        value={item}
                                        onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                                        placeholder={`Item ${itemIndex + 1}`}
                                        className="flex-1 p-3 border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteListItem(index, itemIndex)}
                                        className="text-red-600 hover:text-red-800 p-2"
                                        disabled={section.listItems.length === 1}
                                    >
                                        <Minus size={20} />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addListItem(index)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-2 mt-2"
                            >
                                <Plus size={20} /> Add List Item
                            </button>
                        </div>
                    </div>
                );

            case 'code':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Programming Language</label>
                            <input
                                value={section.codeLanguage || ''}
                                onChange={(e) => updateSection(index, 'codeLanguage', e.target.value)}
                                placeholder="e.g., javascript, python, html, css"
                                className="w-full p-3 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code Content</label>
                            <textarea
                                value={section.codeContent || ''}
                                onChange={(e) => updateSection(index, 'codeContent', e.target.value)}
                                placeholder="Enter your code here"
                                className="w-full p-3 border rounded-md font-mono text-sm min-h-32 bg-gray-50"
                            />
                        </div>
                    </div>
                );

            case 'highlight':
                return (
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Highlighted Text</label>
                            <textarea
                                value={section.highlightText || ''}
                                onChange={(e) => updateSection(index, 'highlightText', e.target.value)}
                                placeholder="Important note, tip, warning, etc."
                                className="w-full p-3 border rounded-md min-h-24"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="font-medium text-sm text-gray-700">Background Color:</label>
                            <input
                                type="color"
                                value={section.highlightColor || '#fff7cc'}
                                onChange={(e) => updateSection(index, 'highlightColor', e.target.value)}
                                className="h-10 w-24 cursor-pointer"
                            />
                            <span className="text-sm text-gray-600">{section.highlightColor || '#fff7cc'}</span>
                        </div>
                        {section.highlightText && (
                            <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Preview:</label>
                                <div
                                    className="p-4 rounded-md border-l-4 border-gray-400"
                                    style={{ backgroundColor: section.highlightColor }}
                                >
                                    {section.highlightText}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'table':
                return (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Table Data</label>
                        <div className="overflow-x-auto border rounded-md">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        {section.tableData?.headers?.map((header, headerIndex) => (
                                            <th key={headerIndex} className="border p-2 relative">
                                                <input
                                                    value={header}
                                                    onChange={(e) => updateTableHeader(index, headerIndex, e.target.value)}
                                                    placeholder={`Header ${headerIndex + 1}`}
                                                    className="w-full p-2 border rounded font-semibold"
                                                />
                                                {section.tableData.headers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteTableColumn(index, headerIndex)}
                                                        className="absolute top-1 right-1 text-red-600 bg-white rounded-full p-1 hover:bg-red-50"
                                                        title="Delete column"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.tableData?.rows?.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="hover:bg-gray-50">
                                            {row.map((cell, colIndex) => (
                                                <td key={colIndex} className="border p-2">
                                                    <input
                                                        value={cell}
                                                        onChange={(e) => updateTableCell(index, rowIndex, colIndex, e.target.value)}
                                                        placeholder={`R${rowIndex + 1}C${colIndex + 1}`}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                </td>
                                            ))}
                                            {section.tableData.rows.length > 1 && (
                                                <td className="border p-2 bg-gray-50">
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteTableRow(index, rowIndex)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete row"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => addTableRow(index)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-2 border rounded-md"
                            >
                                <Plus size={20} /> Add Row
                            </button>
                            <button
                                type="button"
                                onClick={() => addTableColumn(index)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 px-3 py-2 border rounded-md"
                            >
                                <Plus size={20} /> Add Column
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const CollapsibleSection = ({ title, isOpen, setIsOpen, children, icon }) => (
        <div className="border rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors"
            >
                <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    {icon} {title}
                </h3>
                <span className="text-gray-500 transform transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="p-6 space-y-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Manage Blog Posts</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
                        <X size={20} />
                    </button>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                        {editMode ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </h2>
                    {editMode && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                        >
                            <X size={20} /> Cancel
                        </button>
                    )}
                </div>

                {/* Blog Mode Toggle */}
                <div className="mb-6 flex gap-4 p-1 bg-gray-100 rounded-lg w-fit">
                    <button
                        type="button"
                        onClick={() => setBlogMode('simple')}
                        className={`px-6 py-2 rounded-md transition-all ${blogMode === 'simple'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-transparent text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        🚀 Simple Mode (TinyMCE Only)
                    </button>
                    <button
                        type="button"
                        onClick={() => setBlogMode('advanced')}
                        className={`px-6 py-2 rounded-md transition-all ${blogMode === 'advanced'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-transparent text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        ⚡ Advanced Mode (All Fields)
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info - Always Visible */}
                    {/* <CollapsibleSection
                        title="Basic Information"
                        icon="📝"
                        isOpen={showBasicInfo}
                        setIsOpen={setShowBasicInfo}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Enter your blog title"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                placeholder="url-friendly-slug"
                                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle
                            </label>
                            <input
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                placeholder="Optional subtitle"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categoryOptions.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <input
                                    name="tags"
                                    value={formData.tags.join(', ')}
                                    onChange={handleInputChange}
                                    placeholder="travel, india, adventure"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </CollapsibleSection> */}
                    <CollapsibleSection
                        title="Basic Information"
                        icon="📝"
                        isOpen={showBasicInfo}
                        setIsOpen={setShowBasicInfo}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blog Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="title"
                                value={formData.title || ''}
                                onChange={handleTitleChange}
                                placeholder="Enter your blog title"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL Slug <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="slug"
                                value={formData.slug || ''}
                                onChange={handleInputChange}
                                placeholder="url-friendly-slug"
                                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Auto-generated from title</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle
                            </label>
                            <input
                                name="subtitle"
                                value={formData.subtitle || ''}
                                onChange={handleInputChange}
                                placeholder="Optional subtitle"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category || 'Travel'}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {categoryOptions.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <input
                                    name="tags"
                                    value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                                    onChange={handleInputChange}
                                    placeholder="travel, india, adventure"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Content Section */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                ✍️ Content
                            </h3>
                        </div>
                        <div className="p-6 bg-white">
                            {blogMode === 'simple' ? (
                                <div>
                                    <p className="text-sm text-gray-600 mb-3">Use the rich text editor below to write your blog content:</p>
                                    <Editor
                                        apiKey='hgctz06nspg9a4nsg89r33l9h1l7vum3hg6vfc17fdl33qqm'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={formData.sections?.[0]?.paragraph || ''}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600">Build your blog with structured content blocks:</p>

                                    {formData.sections.length === 0 && (
                                        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                            <p className="text-gray-500 mb-4">No content blocks added yet. Add your first block below!</p>
                                        </div>
                                    )}

                                    {formData.sections.map((section, index) => (
                                        <div key={index} className="border-2 border-gray-200 rounded-lg p-5 bg-gradient-to-r from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-semibold text-gray-700 capitalize flex items-center gap-2">
                                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                        {section.blockType}
                                                    </span>
                                                    Block #{index + 1}
                                                </h4>
                                                <div className="flex gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => moveSection(index, 'up')}
                                                        disabled={index === 0}
                                                        className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                        title="Move up"
                                                    >
                                                        <MoveUp size={18} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => moveSection(index, 'down')}
                                                        disabled={index === formData.sections.length - 1}
                                                        className="p-2 text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                        title="Move down"
                                                    >
                                                        <MoveDown size={18} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteSection(index)}
                                                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                                                        title="Delete block"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                            {renderSectionEditor(section, index)}
                                        </div>
                                    ))}

                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-dashed border-blue-300">
                                        <p className="text-sm font-medium text-gray-700 mb-3">Add Content Block:</p>
                                        <div className="flex flex-wrap gap-2">
                                            <button type="button" onClick={() => addSection('heading')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium shadow">
                                                + Heading
                                            </button>
                                            <button type="button" onClick={() => addSection('paragraph')} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium shadow">
                                                + Paragraph
                                            </button>
                                            <button type="button" onClick={() => addSection('image')} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors font-medium shadow">
                                                + Image
                                            </button>
                                            <button type="button" onClick={() => addSection('list')} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium shadow">
                                                + List
                                            </button>
                                            <button type="button" onClick={() => addSection('code')} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-medium shadow">
                                                + Code
                                            </button>
                                            <button type="button" onClick={() => addSection('highlight')} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium shadow">
                                                + Highlight
                                            </button>
                                            <button type="button" onClick={() => addSection('table')} className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors font-medium shadow">
                                                + Table
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Banner Section */}
                    <CollapsibleSection
                        title="Banner Image"
                        icon="🖼️"
                        isOpen={showBanner}
                        setIsOpen={setShowBanner}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Banner Image URL
                            </label>
                            <input
                                name="bannerImage"
                                value={formData.bannerImage}
                                onChange={handleInputChange}
                                placeholder="https://example.com/banner.jpg"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {formData.bannerImage && (
                                <div className="mt-3 border rounded-md p-2 bg-gray-50">
                                    <img
                                        src={formData.bannerImage}
                                        alt="Banner preview"
                                        className="max-h-48 mx-auto rounded"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Banner Title
                                </label>
                                <input
                                    name="bannerTitle"
                                    value={formData.bannerTitle}
                                    onChange={handleInputChange}
                                    placeholder="Banner title"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Banner Alt Text
                                </label>
                                <input
                                    name="bannerAltText"
                                    value={formData.bannerAltText}
                                    onChange={handleInputChange}
                                    placeholder="Alt text for SEO"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Banner Alignment
                                </label>
                                <select
                                    name="bannerAlign"
                                    value={formData.bannerAlign}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Author Info */}
                    <CollapsibleSection
                        title="Author Information"
                        icon="👤"
                        isOpen={showAuthor}
                        setIsOpen={setShowAuthor}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Author Name
                                </label>
                                <input
                                    name="authorName"
                                    value={formData.authorName}
                                    onChange={handleInputChange}
                                    placeholder="Author name"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Author Avatar URL
                                </label>
                                <input
                                    name="authorAvatar"
                                    value={formData.authorAvatar}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/avatar.jpg"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Author Bio
                            </label>
                            <textarea
                                name="authorBio"
                                value={formData.authorBio}
                                onChange={handleInputChange}
                                placeholder="Short biography"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                            />
                        </div>
                    </CollapsibleSection>

                    {/* SEO Meta */}
                    <CollapsibleSection
                        title="SEO & Meta Information"
                        icon="🔍"
                        isOpen={showSEO}
                        setIsOpen={setShowSEO}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Title
                            </label>
                            <input
                                name="metaTitle"
                                value={formData.metaTitle}
                                onChange={handleInputChange}
                                placeholder="SEO title"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">50-60 characters recommended</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Description
                            </label>
                            <textarea
                                name="metaDescription"
                                value={formData.metaDescription}
                                onChange={handleInputChange}
                                placeholder="Brief description for search engines"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="3"
                            />
                            <p className="text-xs text-gray-500 mt-1">150-160 characters recommended</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Meta Keywords
                                </label>
                                <input
                                    name="metaKeywords"
                                    value={formData.metaKeywords.join(', ')}
                                    onChange={handleInputChange}
                                    placeholder="keyword1, keyword2, keyword3"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Meta Robots
                                </label>
                                <input
                                    name="metaRobots"
                                    value={formData.metaRobots}
                                    onChange={handleInputChange}
                                    placeholder="index, follow"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </CollapsibleSection>

                    {/* Open Graph */}
                    <CollapsibleSection
                        title="Open Graph (Social Sharing)"
                        icon="📱"
                        isOpen={showOG}
                        setIsOpen={setShowOG}
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Title
                            </label>
                            <input
                                name="metaOgTitle"
                                value={formData.metaOgTitle}
                                onChange={handleInputChange}
                                placeholder="Title for social media"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Description
                            </label>
                            <textarea
                                name="metaOgDescription"
                                value={formData.metaOgDescription}
                                onChange={handleInputChange}
                                placeholder="Description for social media"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows="2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                OG Image URL
                            </label>
                            <input
                                name="metaOgImage"
                                value={formData.metaOgImage}
                                onChange={handleInputChange}
                                placeholder="https://example.com/og-image.jpg"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                        </div>
                    </CollapsibleSection>

                    {/* Publishing Options */}
                    <CollapsibleSection
                        title="Publishing Options"
                        icon="🚀"
                        isOpen={showPublishing}
                        setIsOpen={setShowPublishing}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Published Date
                                </label>
                                <input
                                    type="date"
                                    name="publishedDate"
                                    value={formData.publishedDate}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Read Time
                                </label>
                                <input
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5 min read"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex gap-8">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isPublished"
                                    checked={formData.isPublished}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="font-medium group-hover:text-blue-600 transition-colors">
                                    Published
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                                />
                                <span className="font-medium group-hover:text-purple-600 transition-colors">
                                    Featured ⭐
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Admin Notes (Internal Only)
                            </label>
                            <textarea
                                name="adminNotes"
                                value={formData.adminNotes}
                                onChange={handleInputChange}
                                placeholder="Private notes..."
                                className="w-full p-3 border border-gray-300 rounded-md bg-yellow-50 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                rows="3"
                            />
                        </div>
                    </CollapsibleSection>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            {editMode ? '💾 Update Post' : '✨ Create Post'}
                        </button>

                        {editMode && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Existing Posts Table */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Existing Blog Posts ({posts.length})</h2>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="text-gray-500 mt-4">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 text-lg">No blog posts found.</p>
                        <p className="text-gray-400 text-sm mt-2">Create your first blog post above!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 uppercase text-xs">
                                <tr>
                                    <th className="p-3 text-left font-semibold">Title</th>
                                    <th className="p-3 text-left font-semibold">Category</th>
                                    <th className="p-3 text-left font-semibold">Author</th>
                                    <th className="p-3 text-left font-semibold">Status</th>
                                    <th className="p-3 text-left font-semibold">Featured</th>
                                    <th className="p-3 text-left font-semibold">Views</th>
                                    <th className="p-3 text-left font-semibold">Date</th>
                                    <th className="p-3 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, idx) => (
                                    <tr key={post._id} className={`border-b hover:bg-blue-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className="p-3 font-medium max-w-xs truncate" title={post.title}>
                                            {post.title}
                                        </td>
                                        <td className="p-3">
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-600">{post.authorName}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${post.isPublished
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {post.isPublished ? '✓ Published' : '📝 Draft'}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            {post.isFeatured && (
                                                <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700 font-medium">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 text-gray-600">{post.viewCount || 0}</td>
                                        <td className="p-3 text-gray-600 text-xs">
                                            {new Date(post.publishedDate || post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-3 flex gap-3">
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-all"
                                                title="Edit post"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-all"
                                                title="Delete post"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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

export default ManageBlog;



