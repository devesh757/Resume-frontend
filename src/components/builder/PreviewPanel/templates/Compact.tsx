import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Compact: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg p-8 text-sm" style={{ fontFamily: theme.font }}>
      <div className="flex justify-between items-end border-b-2 pb-2 mb-4" style={{ borderColor: c }}>
        <h1 className="text-2xl font-bold text-slate-800">{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className="text-xs text-gray-500 text-right leading-snug">
          {contacts.map((x) => <span key={x} className="block">{x}</span>)}
        </p>
      </div>
      {personalInfo.headline && <p className="font-medium text-gray-700 mb-2">{personalInfo.headline}</p>}
      {personalInfo.summary && <p className="text-xs text-gray-600 mb-4">{personalInfo.summary}</p>}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 bg-gray-100 px-2 py-0.5 mb-2">
              {title}
            </h3>
          );
          switch (key) {
            case 'workExperience':
              return resume.workExperience.length > 0 && (
                <section className="mb-4">
                  {heading('Experience')}
                  {resume.workExperience.map((e, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between">
                        <p className="font-semibold text-slate-800">{e.role} <span className="text-gray-500 font-normal">| {e.company}</span></p>
                        <span className="text-xs text-gray-400">{e.startDate} – {e.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-5 text-xs text-gray-600 mt-0.5">
                        {e.description.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            case 'education':
              return resume.education.length > 0 && (
                <section className="mb-4">
                  {heading('Education')}
                  {resume.education.map((e, i) => (
                    <div key={i} className="mb-1 flex justify-between">
                      <p className="text-slate-800"><span className="font-semibold">{e.institution}</span> — {e.degree}{e.major ? ` (${e.major})` : ''}</p>
                      <span className="text-xs text-gray-400">{e.graduationDate}</span>
                    </div>
                  ))}
                </section>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <section className="mb-4">
                  {heading('Skills')}
                  {resume.skills.map((g, i) => (
                    <p key={i} className="text-xs text-gray-700 mb-1">
                      {g.category && <span className="font-semibold text-slate-800">{g.category}: </span>}
                      {g.items.map((s) => s.name).join(', ')}
                    </p>
                  ))}
                </section>
              );
            case 'projects':
              return resume.projects.length > 0 && (
                <section className="mb-4">
                  {heading('Projects')}
                  {resume.projects.map((p, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between">
                        <p className="font-semibold text-slate-800">{p.title} <span className="text-gray-500 font-normal">({p.technologies.join(', ')})</span></p>
                        {p.link && <a href={p.link} className="text-xs text-blue-500">Link</a>}
                      </div>
                      <p className="text-xs text-gray-600">{p.description}</p>
                    </div>
                  ))}
                </section>
              );
            case 'customSections':
              return resume.customSections.map((s, i) => (
                <section key={i} className="mb-4">
                  {heading(s.title)}
                  <ul className="list-disc ml-5 text-xs text-gray-600">
                    {s.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </section>
              ));
            default:
              return null;
          }
        }}
      />
    </div>
  );
};
