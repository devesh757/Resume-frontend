import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { Resume } from '../../../types';

export const PersonalInfo: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const [uploading, setUploading] = useState(false);

  const update = (field: string, value: any) => {
    setResume({
      ...resume,
      personalInfo: { ...resume.personalInfo, [field]: value },
    });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Photo must be smaller than 2MB');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    setUploading(true);
    reader.onload = () => {
      update('avatar', reader.result as string);
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
      alert('Could not read the file. Please try another image.');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const hasPhoto = Boolean(resume.personalInfo.avatar);
  const initials = `${resume.personalInfo.firstName?.[0] ?? ''}${resume.personalInfo.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-sm text-gray-700 mb-3">Personal Information</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
            {hasPhoto ? (
              <img src={resume.personalInfo.avatar} alt="profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-bold text-gray-400">{initials || '?'}</span>
            )}
          </div>
          <label
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center cursor-pointer hover:bg-primary-700 shadow transition"
            title="Upload photo"
          >
            <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            <Camera size={14} />
          </label>
        </div>
        <div className="space-y-1.5">
          {uploading && <p className="text-xs text-gray-400">Uploading...</p>}
          {hasPhoto ? (
            <button
              onClick={() => update('avatar', undefined)}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
            >
              <X size={12} /> Remove photo
            </button>
          ) : (
            <p className="text-xs text-gray-400">Add a profile photo (optional, max 2MB)</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="First Name"
          value={resume.personalInfo.firstName}
          onChange={(e) => update('firstName', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          placeholder="Last Name"
          value={resume.personalInfo.lastName}
          onChange={(e) => update('lastName', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          placeholder="Headline (e.g. Senior Frontend Developer)"
          value={resume.personalInfo.headline || ''}
          onChange={(e) => update('headline', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 col-span-2"
        />
        <input
          placeholder="Email"
          value={resume.personalInfo.email}
          onChange={(e) => update('email', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          placeholder="Phone"
          value={resume.personalInfo.phone}
          onChange={(e) => update('phone', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          placeholder="Website"
          value={resume.personalInfo.website || ''}
          onChange={(e) => update('website', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <input
          placeholder="LinkedIn"
          value={resume.personalInfo.linkedin || ''}
          onChange={(e) => update('linkedin', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <textarea
          placeholder="Professional summary (2-3 sentences)"
          value={resume.personalInfo.summary || ''}
          onChange={(e) => update('summary', e.target.value)}
          className="border border-gray-200 p-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 col-span-2"
          rows={3}
        />
      </div>
    </div>
  );
};
