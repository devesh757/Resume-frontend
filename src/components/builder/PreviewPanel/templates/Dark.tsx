import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Dark: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-slate-900 text-slate-200 shadow-lg p-10" style={{ fontFamily: theme.font }}>
      <div className="border-b border-slate-700 pb-6 mb-8">
        <h1 className="text-4xl font-extrabold text-white">{personalInfo.firstName} {personalInfo.lastName}</h1>
        {personalInfo.headline && <p className="mt-1" style={{ color: c }}>{personalInfo.headline}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400 mt-3">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-slate-300 leading-relaxed mb-8">{personalInfo.summary}</p>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-l-2 pl-3" style={{ color: c, borderColor: c }}>
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
                      <div className="flex justify-between">
                        <p className="font-semibold text-white">{e.role} <span className="text-slate-400">at {e.company}</span></p>
                        <span className="text-xs text-slate-500">{e.startDate} – {e.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-5 text-sm text-slate-300 mt-1">
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
                    <div key={i} className="mb-3">
                      <p className="font-semibold text-white">{e.institution}</p>
                      <p className="text-sm text-slate-300">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                      <p className="text-xs text-slate-500">{e.graduationDate}</p>
                    </div>
                  ))}
                </section>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <section className="mb-8">
                  {heading('Skills')}
                  {resume.skills.map((g, i) => (
                    <div key={i} className="mb-3">
                      {g.category && <p className="text-xs text-slate-400 mb-1">{g.category}</p>}
                      <div className="flex flex-wrap gap-2">
                        {g.items.map((s, j) => (
                          <span key={j} className="border border-slate-600 text-slate-200 px-2.5 py-0.5 rounded text-xs">
                            {s.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              );
            case 'projects':
              return resume.projects.length > 0 && (
                <section className="mb-8">
                  {heading('Projects')}
                  {resume.projects.map((p, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between">
                        <p className="font-semibold text-white">{p.title}</p>
                        {p.link && <a href={p.link} className="text-xs" style={{ color: c }}>Link</a>}
                      </div>
                      <p className="text-xs text-slate-500">{p.technologies.join(', ')}</p>
                      <p className="text-sm text-slate-300 mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </section>
              );
            case 'customSections':
              return resume.customSections.map((s, i) => (
                <section key={i} className="mb-8">
                  {heading(s.title)}
                  <ul className="list-disc ml-5 text-sm text-slate-300">
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
