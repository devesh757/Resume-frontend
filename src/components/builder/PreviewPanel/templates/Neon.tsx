import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Neon: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const glow = `0 0 12px ${c}, 0 0 32px ${c}88`;
  const boxGlow = `0 0 10px ${c}66, inset 0 0 10px ${c}33`;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-[#0a0a14] text-slate-200 shadow-lg p-10" style={{ fontFamily: theme.font }}>
      <div className="text-center pb-6 mb-8 border-b" style={{ borderColor: `${c}55` }}>
        <h1 className="text-5xl font-extrabold tracking-wide" style={{ color: c, textShadow: glow }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.headline && <p className="mt-2 tracking-[0.25em] uppercase text-sm" style={{ color: `${c}cc` }}>{personalInfo.headline}</p>}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-slate-400 mt-4">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-center text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">{personalInfo.summary}</p>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h3 className="font-bold uppercase tracking-[0.3em] text-sm mb-4" style={{ color: c, textShadow: glow }}>
              {title}
            </h3>
          );
          switch (key) {
            case 'workExperience':
              return resume.workExperience.length > 0 && (
                <section className="mb-8">
                  {heading('Experience')}
                  {resume.workExperience.map((e, i) => (
                    <div key={i} className="mb-4 border rounded-lg p-4" style={{ borderColor: `${c}44`, boxShadow: boxGlow }}>
                      <div className="flex justify-between">
                        <p className="font-semibold text-slate-100">{e.role} <span className="text-slate-400">at {e.company}</span></p>
                        <span className="text-xs text-slate-500">{e.startDate} – {e.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-5 text-sm text-slate-300 mt-2">
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
                    <div key={i} className="mb-3 border rounded-lg p-3" style={{ borderColor: `${c}44` }}>
                      <p className="font-semibold text-slate-100">{e.institution}</p>
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
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.flatMap((g) => g.items).map((s, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full border text-sm"
                        style={{ borderColor: `${c}66`, color: c, boxShadow: boxGlow }}
                      >
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
                    <div key={i} className="mb-3 border rounded-lg p-4" style={{ borderColor: `${c}44` }}>
                      <div className="flex justify-between">
                        <p className="font-semibold text-slate-100">{p.title}</p>
                        {p.link && <a href={p.link} className="text-xs" style={{ color: c }}>Link ↗</a>}
                      </div>
                      <p className="text-xs text-slate-500">{p.technologies.join(' · ')}</p>
                      <p className="text-sm text-slate-300 mt-1">{p.description}</p>
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
