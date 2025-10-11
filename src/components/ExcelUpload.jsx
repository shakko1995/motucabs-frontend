import React, { useState } from 'react';
import { uploadRoutesSheet } from '../services/oneWayRouteApi'; // Adjust path
import { Upload, File, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ExcelUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ message: '', type: '' }); // type can be 'success' or 'error'

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus({ message: '', type: '' }); // Clear previous messages
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({ message: 'Please select a file first.', type: 'error' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ message: '', type: '' });

    const formData = new FormData();
    formData.append('routesFile', selectedFile); // This key MUST match the backend: 'routesFile'

    try {
      const response = await uploadRoutesSheet(formData);
      setUploadStatus({ message: response.message, type: 'success' });
      if (onUploadSuccess) {
        onUploadSuccess(); // This will refresh the routes list in the parent component
      }
    } catch (err) {
      setUploadStatus({ message: err.message || 'An unknown error occurred.', type: 'error' });
    } finally {
      setIsUploading(false);
      setSelectedFile(null); // Clear the file input after upload attempt
      document.getElementById('fileInput').value = ''; // Reset the input field
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 my-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Bulk Upload Routes from Excel</h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload an .xlsx file with 'fromCity' and 'toCity' columns. This will delete all existing routes and replace them with the data from your sheet.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label htmlFor="fileInput" className="w-full flex-grow">
          <div className="flex items-center justify-center w-full px-4 py-3 bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
            <File className="text-gray-400 mr-3" size={20} />
            <span className="text-gray-600 font-medium">
              {selectedFile ? selectedFile.name : 'Choose an Excel file...'}
            </span>
          </div>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2" size={20} />
              Upload Sheet
            </>
          )}
        </button>
      </div>

      {/* --- Status Message --- */}
      {uploadStatus.message && (
        <div className={`mt-4 p-3 rounded-md flex items-center text-sm ${
          uploadStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {uploadStatus.type === 'success' ? <CheckCircle className="mr-2" size={18} /> : <AlertTriangle className="mr-2" size={18} />}
          {uploadStatus.message}
        </div>
      )}
    </div>
  );
}