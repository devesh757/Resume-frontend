import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Vintage: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-[#faf6ef] shadow-lg" style={{ fontFamily: theme.font }}>
      <div className="m-6 border-2 border-amber-800/70 p-8" style={{ borderColor: `${c}99` }}>
        <div className="text-center pb-5 mb-7 border-b border-dashed" style={{ borderColor: `${c}66` }}>
          <p className="text-2xl mb-1" style={{ color: c }}>✦ ✦ ✦</p>
          <h1 className="text-4xl font-bold text-amber-950">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.headline && (
            <p className="mt-1 italic text-amber-800">{personalInfo.headline}</p>
          )}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-amber-800 mt-3">
            {contacts.map((x) => <span key={x}>{x}</span>)}
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-sm text-amber-900 italic text-center max-w-2xl mx-auto mb-7">{personalInfo.summary}</p>
        )}
        <OrderedSections
          resume={resume}
          render={(key) => {
            const heading = (title: string) => (
              <h3 className="font-semibold uppercase tracking-[0.25em] text-center mb-3" style={{ color: c }}>
                ❦ {title} ❦
              </h3>
            );
            switch (key) {
              case 'workExperience':
                return resume.workExperience.length > 0 && (
                  <section className="mb-7">
                    {heading('Experience')}
                    {resume.workExperience.map((e, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between">
                          <p className="font-semibold text-amber-950">{e.role} <span className="italic text-amber-800">at {e.company}</span></p>
                          <span className="text-xs text-amber-700">{e.startDate} – {e.endDate || 'Present'}</span>
                        </div>
                        <ul className="list-disc ml-6 text-sm text-amber-900 mt-1">
                          {e.description.map((b, j) => <li key={j}>{b}</li>)}
                        </ul>
                      </div>
                    ))}
                  </section>
                );
              case 'education':
                return resume.education.length > 0 && (
                  <section className="mb-7">
                    {heading('Education')}
                    {resume.education.map((e, i) => (
                      <div key={i} className="text-center mb-3">
                        <p className="font-semibold text-amber-950">{e.institution}</p>
                        <p className="text-sm text-amber-800">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                        <p className="text-xs text-amber-700">{e.graduationDate}</p>
                      </div>
                    ))}
                  </section>
                );
              case 'skills':
                return resume.skills.length > 0 && (
                  <section className="mb-7">
                    {heading('Skills')}
                    {resume.skills.map((g, i) => (
                      <div key={i} className="text-center mb-2">
                        {g.category && <p className="text-xs uppercase tracking-widest text-amber-800 mb-1">{g.category}</p>}
                        <p className="text-sm text-amber-900">{g.items.map((s) => s.name).join(' · ')}</p>
                      </div>
                    ))}
                  </section>
                );
              case 'projects':
                return resume.projects.length > 0 && (
                  <section className="mb-7">
                    {heading('Projects')}
                    {resume.projects.map((p, i) => (
                      <div key={i} className="mb-3 border-l-4 pl-4" style={{ borderColor: `${c}55` }}>
                        <div className="flex justify-between">
                          <p className="font-semibold text-amber-950">{p.title}</p>
                          {p.link && <a href={p.link} className="text-xs text-blue-600 underline">Link</a>}
                        </div>
                        <p className="text-xs italic text-amber-700">{p.technologies.join(', ')}</p>
                        <p className="text-sm text-amber-900 mt-0.5">{p.description}</p>
                      </div>
                    ))}
                  </section>
                );
              case 'customSections':
                return resume.customSections.map((s, i) => (
                  <section key={i} className="mb-7">
                    {heading(s.title)}
                    <ul className="list-disc ml-6 text-sm text-amber-900">
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
