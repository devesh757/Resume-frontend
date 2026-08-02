import React from 'react';
import { Resume } from '../../../types';

export const Skills: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const update = (index: number, field: string, value: any) => {
    const skills = resume.skills.map((group, i) =>
      i === index ? { ...group, [field]: value } : group
    );
    setResume({ ...resume, skills });
  };

  const add = () => {
    setResume({ ...resume, skills: [...resume.skills, { category: '', items: [{ name: '' }] }] });
  };

  const remove = (index: number) => {
    setResume({ ...resume, skills: resume.skills.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-3">Skills</h3>
      {resume.skills.map((group, idx) => (
        <div key={idx} className="border p-3 rounded mb-3 space-y-2">
          <input
            placeholder="Category (e.g. Languages, Frameworks)"
            value={group.category}
            onChange={(e) => update(idx, 'category', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Skills (comma separated)"
            value={group.items.map((i) => i.name).join(', ')}
            onChange={(e) =>
              update(idx, 'items', e.target.value.split(',').map((s) => ({ name: s.trim() })).filter((i) => i.name))
            }
            className="border p-2 rounded w-full"
          />
          <button onClick={() => remove(idx)} className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <button onClick={add} className="bg-primary-600 text-white px-4 py-2 rounded">
        Add Skill Group
      </button>
    </div>
  );
};
