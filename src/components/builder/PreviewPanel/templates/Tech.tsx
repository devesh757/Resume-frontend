import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Tech: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-[#0b1120] text-slate-300 shadow-lg" style={{ fontFamily: theme.font }}>
      <div className="p-10">
        <div className="mb-8" style={{ borderBottom: `2px solid ${c}44` }}>
          <p className="font-mono text-xs mb-2" style={{ color: c }}>{'~$'} whoami</p>
          <h1 className="text-4xl font-bold text-slate-100">
            <span style={{ color: c }}>&gt;</span> {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.headline && <p className="mt-1 font-mono text-sm" style={{ color: c }}>{personalInfo.headline}</p>}
          <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-400 mt-3 pb-4">
            {contacts.map((x) => <span key={x}>{x}</span>)}
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-sm text-slate-300 mb-8 border border-slate-700 rounded p-3 font-mono" style={{ borderLeftColor: c, borderLeftWidth: 4 }}>
            {personalInfo.summary}
          </p>
        )}
        <OrderedSections
          resume={resume}
          render={(key) => {
            const heading = (title: string) => (
              <h3 className="font-mono font-bold uppercase tracking-widest mb-3" style={{ color: c }}>
                {'//'} {title}
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
                          <p className="font-semibold text-slate-100">{e.role} <span style={{ color: c }}>@</span> {e.company}</p>
                          <span className="font-mono text-xs text-slate-500">{e.startDate} – {e.endDate || 'Present'}</span>
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
                      <div key={i} className="mb-2">
                        <p className="font-semibold text-slate-100">{e.institution}</p>
                        <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                        <p className="font-mono text-xs text-slate-500">{e.graduationDate}</p>
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
                        {g.category && <p className="font-mono text-xs text-slate-400 mb-1">{g.category}:</p>}
                        <div className="flex flex-wrap gap-2">
                          {g.items.map((s, j) => (
                            <span key={j} className="font-mono text-xs border px-2 py-0.5 rounded" style={{ borderColor: `${c}66`, color: c }}>
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
                          <p className="font-semibold text-slate-100">{p.title}</p>
                          {p.link && <a href={p.link} className="font-mono text-xs" style={{ color: c }}>open ↗</a>}
                        </div>
                        <p className="font-mono text-xs text-slate-500">{p.technologies.join(' | ')}</p>
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
    </div>
  );
};
