import React from 'react';
import { Resume } from '../../../types';

export const Education: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const update = (index: number, field: string, value: any) => {
    const education = resume.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setResume({ ...resume, education });
  };

  const add = () => {
    setResume({
      ...resume,
      education: [...resume.education, { institution: '', degree: '', major: '', graduationDate: '' }],
    });
  };

  const remove = (index: number) => {
    setResume({ ...resume, education: resume.education.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-3">Education</h3>
      {resume.education.map((edu, idx) => (
        <div key={idx} className="border p-3 rounded mb-3 space-y-2">
          <input
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => update(idx, 'institution', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => update(idx, 'degree', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Major"
            value={edu.major || ''}
            onChange={(e) => update(idx, 'major', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Graduation Date"
            value={edu.graduationDate}
            onChange={(e) => update(idx, 'graduationDate', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button onClick={() => remove(idx)} className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <button onClick={add} className="bg-primary-600 text-white px-4 py-2 rounded">
        Add Education
      </button>
    </div>
  );
};
