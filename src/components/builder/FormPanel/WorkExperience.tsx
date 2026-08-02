import React from 'react';
import { Resume } from '../../../types';

export const WorkExperience: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const update = (index: number, field: string, value: any) => {
    const workExperience = resume.workExperience.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setResume({ ...resume, workExperience });
  };

  const add = () => {
    setResume({
      ...resume,
      workExperience: [...resume.workExperience, { company: '', role: '', startDate: '', endDate: '', description: [''] }],
    });
  };

  const remove = (index: number) => {
    setResume({ ...resume, workExperience: resume.workExperience.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-3">Work Experience</h3>
      {resume.workExperience.map((exp, idx) => (
        <div key={idx} className="border p-3 rounded mb-3 space-y-2">
          <input
            placeholder="Company"
            value={exp.company}
            onChange={(e) => update(idx, 'company', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Role"
            value={exp.role}
            onChange={(e) => update(idx, 'role', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => update(idx, 'startDate', e.target.value)}
              className="border p-2 rounded"
            />
            <input
              placeholder="End Date"
              value={exp.endDate || ''}
              onChange={(e) => update(idx, 'endDate', e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <textarea
            placeholder="Description (one bullet per line)"
            value={exp.description.join('\n')}
            onChange={(e) => update(idx, 'description', e.target.value.split('\n').filter((b) => b.trim() !== ''))}
            className="border p-2 rounded w-full"
            rows={3}
          />
          <button onClick={() => remove(idx)} className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <button onClick={add} className="bg-primary-600 text-white px-4 py-2 rounded">
        Add Experience
      </button>
    </div>
  );
};
