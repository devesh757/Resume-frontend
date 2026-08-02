import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

const SectionHeading: React.FC<{ title: string; color: string }> = ({ title, color }) => (
  <h3 className="font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: color }} />
    <span style={{ color }}>{title}</span>
  </h3>
);

export const Timeline: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg p-8" style={{ fontFamily: theme.font }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold">{personalInfo.firstName} {personalInfo.lastName}</h1>
        {personalInfo.headline && <p className="mt-1 font-medium" style={{ color: c }}>{personalInfo.headline}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-gray-600 max-w-3xl mx-auto text-center mb-8">{personalInfo.summary}</p>
      )}
      <div className="max-w-3xl mx-auto">
        <OrderedSections
          resume={resume}
          render={(key) => {
            switch (key) {
              case 'workExperience':
                return resume.workExperience.length > 0 && (
                  <section className="mb-8">
                    <SectionHeading title="Experience" color={c} />
                    <div className="border-l-2 pl-6 space-y-6 relative" style={{ borderColor: c }}>
                      {resume.workExperience.map((e, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: c }} />
                          <p className="text-xs text-gray-500">{e.startDate} – {e.endDate || 'Present'}</p>
                          <p className="font-semibold">{e.role} <span className="text-gray-500">at {e.company}</span></p>
                          <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                            {e.description.map((b, j) => <li key={j}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              case 'education':
                return resume.education.length > 0 && (
                  <section className="mb-8">
                    <SectionHeading title="Education" color={c} />
                    <div className="border-l-2 pl-6 space-y-6 relative" style={{ borderColor: c }}>
                      {resume.education.map((e, i) => (
                        <div key={i} className="relative">
                          <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: c }} />
                          <p className="font-semibold">{e.institution}</p>
                          <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                          <p className="text-xs text-gray-500">{e.graduationDate}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              case 'skills':
                return resume.skills.length > 0 && (
                  <section className="mb-8">
                    <SectionHeading title="Skills" color={c} />
                    <div className="space-y-3">
                      {resume.skills.map((g, i) => (
                        <div key={i}>
                          {g.category && <p className="text-xs font-semibold text-gray-600 mb-1">{g.category}</p>}
                          <div className="flex flex-wrap gap-2">
                            {g.items.map((s, j) => (
                              <span key={j} className="border px-3 py-1 rounded-full text-sm" style={{ borderColor: c, color: c }}>
                                {s.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              case 'projects':
                return resume.projects.length > 0 && (
                  <section className="mb-8">
                    <SectionHeading title="Projects" color={c} />
                    {resume.projects.map((p, i) => (
                      <div key={i} className="mb-4 border-l-2 pl-4" style={{ borderColor: c }}>
                        <div className="flex justify-between">
                          <p className="font-semibold">{p.title}</p>
                          {p.link && <a href={p.link} className="text-xs text-blue-500">Link</a>}
                        </div>
                        <p className="text-xs text-gray-500">{p.technologies.join(', ')}</p>
                        <p className="text-sm mt-0.5">{p.description}</p>
                      </div>
                    ))}
                  </section>
                );
              case 'customSections':
                return resume.customSections.map((s, i) => (
                  <section key={i} className="mb-8">
                    <SectionHeading title={s.title} color={c} />
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
    </div>
  );
};
