import React from 'react';
import { Resume } from '../../../types';

export const CustomSections: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const update = (index: number, field: string, value: any) => {
    const customSections = resume.customSections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setResume({ ...resume, customSections });
  };

  const add = () => {
    setResume({ ...resume, customSections: [...resume.customSections, { title: '', items: [''] }] });
  };

  const remove = (index: number) => {
    setResume({ ...resume, customSections: resume.customSections.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-3">Custom Sections</h3>
      {resume.customSections.map((section, idx) => (
        <div key={idx} className="border p-3 rounded mb-3 space-y-2">
          <input
            placeholder="Section Title"
            value={section.title}
            onChange={(e) => update(idx, 'title', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Items (one per line)"
            value={section.items.join('\n')}
            onChange={(e) => update(idx, 'items', e.target.value.split('\n').filter((b) => b.trim() !== ''))}
            className="border p-2 rounded w-full"
            rows={3}
          />
          <button onClick={() => remove(idx)} className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <button onClick={add} className="bg-primary-600 text-white px-4 py-2 rounded">
        Add Custom Section
      </button>
    </div>
  );
};
