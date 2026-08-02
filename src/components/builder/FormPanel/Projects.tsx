import React from 'react';
import { Resume } from '../../../types';

export const Projects: React.FC<{ resume: Resume; setResume: (r: Resume) => void }> = ({ resume, setResume }) => {
  const update = (index: number, field: string, value: any) => {
    const projects = resume.projects.map((proj, i) =>
      i === index ? { ...proj, [field]: value } : proj
    );
    setResume({ ...resume, projects });
  };

  const add = () => {
    setResume({
      ...resume,
      projects: [...resume.projects, { title: '', technologies: [], link: '', description: '' }],
    });
  };

  const remove = (index: number) => {
    setResume({ ...resume, projects: resume.projects.filter((_, i) => i !== index) });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg mb-3">Projects</h3>
      {resume.projects.map((proj, idx) => (
        <div key={idx} className="border p-3 rounded mb-3 space-y-2">
          <input
            placeholder="Title"
            value={proj.title}
            onChange={(e) => update(idx, 'title', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Technologies (comma separated)"
            value={proj.technologies.join(', ')}
            onChange={(e) => update(idx, 'technologies', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
            className="border p-2 rounded w-full"
          />
          <input
            placeholder="Link"
            value={proj.link || ''}
            onChange={(e) => update(idx, 'link', e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Description"
            value={proj.description}
            onChange={(e) => update(idx, 'description', e.target.value)}
            className="border p-2 rounded w-full"
            rows={2}
          />
          <button onClick={() => remove(idx)} className="text-red-500 text-sm">Remove</button>
        </div>
      ))}
      <button onClick={add} className="bg-primary-600 text-white px-4 py-2 rounded">
        Add Project
      </button>
    </div>
  );
};
