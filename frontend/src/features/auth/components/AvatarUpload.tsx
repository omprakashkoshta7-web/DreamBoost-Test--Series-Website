import React from 'react';
import { Camera } from '@shared/icons';

interface AvatarUploadProps {
  name: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ name }) => {
  return (
    <div className="relative inline-block mb-4">
      <div className="w-20 h-20 bg-gradient-to-br from-tb-blue to-blue-700 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg">
        {name ? name.charAt(0).toUpperCase() : '?'}
      </div>
      <button className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
        <Camera className="w-4 h-4 text-tb-gray-500" />
      </button>
    </div>
  );
};

export default AvatarUpload;
