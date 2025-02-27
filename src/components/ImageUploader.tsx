import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageData: string | null) => void;
  existingImage?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, existingImage }) => {
  const [preview, setPreview] = useState<string | null>(existingImage || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    // Check file size (max 1MB)
    if (file.size > 1024 * 1024) {
      setError('Image size must be less than 1MB');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageUpload(result);
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
    };
    
    reader.readAsDataURL(file);
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/webp': []
    },
    maxFiles: 1
  });
  
  const clearImage = () => {
    setPreview(null);
    onImageUpload(null);
  };
  
  return (
    <div className="space-y-4">
      {!preview ? (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive 
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
          <p className="text-gray-600 dark:text-gray-300">
            {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Supported formats: JPG, PNG, GIF, WEBP (max 1MB)
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              type="button"
              onClick={clearImage}
              className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <Check className="w-4 h-4 mr-1" />
            Image uploaded successfully
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;