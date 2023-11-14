import { useState } from "react";

export default function FileUpload({ name, uploadFile }) {

  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");

  const handleEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    preview === "" && setHighlight(true);
  };

  const handleOver = e => {
    e.preventDefault();
    e.stopPropagation();
    preview === "" && setHighlight(true);
  };

  const handleLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    
    setHighlight(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    
    setHighlight(false);

    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(e)

    // Display the file
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      setPreview(`data:image;base64,${btoa(reader.result)}`);
    };
    reader.onerror = () => {
      // TODO: Handle this error
    };
  };

  return (
    <div
      className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ` +
        `${highlight ? "bg-blue-200" : "" }`}
      onDragEnter={handleEnter}
      onDragLeave={handleLeave}
      onDragOver={handleOver}
      onDrop={handleDrop}
    >
      <div className="space-y-1 text-center">
        <div
          className={`h-40 mb-3 ${preview ? '' : 'sr-only'}`}
          style={{
            backgroundImage: `url(${preview})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
          }}></div>
        <svg className={`mx-auto h-12 w-12 text-gray-400 ${preview ? 'sr-only' : ''}`}
          stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="True">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex text-sm text-gray-600">
          <label htmlFor={name} className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
            <span>Upload a file</span>
            <input
              id={name}
              name={name}
              className="sr-only"
              type="file"
              accept="image/*"
              onChange={handleDrop} />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500">
          PNG, JPG, JPEG up to 5MB
        </p>
      </div>
    </div>
  )
}