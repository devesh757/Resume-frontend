import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Bold: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg p-10" style={{ fontFamily: theme.font }}>
      <div className="mb-8">
        <h1 className="text-6xl font-black tracking-tight text-slate-900">
          {personalInfo.firstName}<br />{personalInfo.lastName}
        </h1>
        {personalInfo.headline && <p className="mt-2 text-lg font-bold" style={{ color: c }}>{personalInfo.headline}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600 mt-3">
          {contacts.map((x) => <span key={x} className="bg-gray-50 border border-gray-200 px-2 py-0.5">{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-gray-700 leading-relaxed mb-8 max-w-2xl">{personalInfo.summary}</p>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h3 className="font-black uppercase text-lg mb-3 pl-4 border-l-8" style={{ borderColor: c, color: c }}>
              {title}
            </h3>
          );
          switch (key) {
            case 'workExperience':
              return resume.workExperience.length > 0 && (
                <section className="mb-8">
                  {heading('Experience')}
                  {resume.workExperience.map((e, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <p className="font-bold text-slate-800 text-base">{e.role} <span className="text-gray-500">@ {e.company}</span></p>
                        <span className="text-xs text-gray-500 font-medium">{e.startDate} – {e.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                        {e.description.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            case 'education':
              return resume.education.length > 0 && (
                <section className="mb-8">
                  {heading('Education')}
                  {resume.education.map((e, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-bold text-slate-800">{e.institution}</p>
                      <p className="text-sm text-gray-700">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                      <p className="text-xs text-gray-500">{e.graduationDate}</p>
                    </div>
                  ))}
                </section>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <section className="mb-8">
                  {heading('Skills')}
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.flatMap((g) => g.items).map((s, i) => (
                      <span key={i} className="font-bold text-white px-3 py-1 text-sm" style={{ backgroundColor: c }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </section>
              );
            case 'projects':
              return resume.projects.length > 0 && (
                <section className="mb-8">
                  {heading('Projects')}
                  {resume.projects.map((p, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between">
                        <p className="font-bold text-slate-800">{p.title}</p>
                        {p.link && <a href={p.link} className="text-xs text-blue-500 font-medium">Link →</a>}
                      </div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{p.technologies.join(' · ')}</p>
                      <p className="text-sm text-gray-700 mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </section>
              );
            case 'customSections':
              return resume.customSections.map((s, i) => (
                <section key={i} className="mb-8">
                  {heading(s.title)}
                  <ul className="list-disc ml-5 text-sm text-gray-700">
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
