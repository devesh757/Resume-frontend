import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Elegant: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg p-10" style={{ fontFamily: theme.font }}>
      <div className="text-center pb-6 mb-8" style={{ borderBottom: `2px double ${c}` }}>
        <h1 className="text-4xl font-semibold tracking-wide">{personalInfo.firstName} {personalInfo.lastName}</h1>
        {personalInfo.headline && (
          <p className="mt-2 text-sm uppercase tracking-[0.3em]" style={{ color: c }}>{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-gray-500 mt-3">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-gray-600 italic leading-relaxed text-center max-w-2xl mx-auto mb-8">{personalInfo.summary}</p>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h3 className="text-xs font-semibold uppercase tracking-[0.35em] mb-4 text-center" style={{ color: c }}>
              — {title} —
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
                        <p className="font-semibold">{e.role}, <span className="font-normal text-gray-600">{e.company}</span></p>
                        <span className="text-xs text-gray-400">{e.startDate} – {e.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-6 text-sm text-gray-600 mt-1">
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
                    <div key={i} className="text-center mb-3">
                      <p className="font-semibold">{e.institution}</p>
                      <p className="text-sm text-gray-600">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                      <p className="text-xs text-gray-400">{e.graduationDate}</p>
                    </div>
                  ))}
                </section>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <section className="mb-8">
                  {heading('Skills')}
                  {resume.skills.map((g, i) => (
                    <div key={i} className="text-center mb-3">
                      {g.category && <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{g.category}</p>}
                      <p className="text-sm text-gray-700">
                        {g.items.map((s) => s.name).join('  ·  ')}
                      </p>
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
                        <p className="font-semibold">{p.title}</p>
                        {p.link && <a href={p.link} className="text-xs text-blue-500">Link</a>}
                      </div>
                      <p className="text-xs text-gray-400">{p.technologies.join(', ')}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </section>
              );
            case 'customSections':
              return resume.customSections.map((s, i) => (
                <section key={i} className="mb-8">
                  {heading(s.title)}
                  <ul className="list-disc ml-6 text-sm text-gray-600">
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
