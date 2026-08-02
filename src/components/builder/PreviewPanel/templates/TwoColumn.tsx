import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const TwoColumn: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, skills, education, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg" style={{ fontFamily: theme.font }}>
      <div className="grid grid-cols-5 min-h-[800px]">
        <aside className="col-span-2 bg-gray-50 border-r border-gray-200 p-6">
          <h2 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h2>
          {personalInfo.headline && <p className="text-sm mt-1" style={{ color: c }}>{personalInfo.headline}</p>}
          <div className="mt-6">
            <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Contact</h3>
            <div className="space-y-1 text-sm text-gray-700">
              {contacts.map((x) => <p key={x} className="break-all">{x}</p>)}
            </div>
          </div>
          {skills.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Skills</h3>
              {skills.map((g, i) => (
                <div key={i} className="mb-3">
                  {g.category && <p className="text-xs font-semibold text-gray-600 mb-1">{g.category}</p>}
                  {g.items.map((s, j) => (
                    <p key={j} className="text-sm text-gray-700 flex justify-between border-b border-dotted border-gray-300 py-0.5">
                      <span>{s.name}</span>
                      {s.proficiency && <span className="text-xs text-gray-400">{s.proficiency}</span>}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Education</h3>
              {education.map((e, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm font-semibold">{e.institution}</p>
                  <p className="text-xs text-gray-600">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                  <p className="text-xs text-gray-400">{e.graduationDate}</p>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="col-span-3 p-6">
          {personalInfo.summary && (
            <p className="text-sm text-gray-700 mb-5 leading-relaxed">{personalInfo.summary}</p>
          )}
          <OrderedSections
            resume={resume}
            render={(key) => {
              switch (key) {
                case 'skills':
                case 'education':
                  return null;
                case 'workExperience':
                  return resume.workExperience.length > 0 && (
                    <section className="mb-5">
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-3 border-b-2 pb-1" style={{ borderColor: c, color: c }}>Experience</h3>
                      {resume.workExperience.map((e, i) => (
                        <div key={i} className="mb-4">
                          <div className="flex justify-between">
                            <p className="font-semibold text-sm">{e.role} <span className="text-gray-500">at {e.company}</span></p>
                            <span className="text-xs text-gray-500">{e.startDate} – {e.endDate || 'Present'}</span>
                          </div>
                          <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                            {e.description.map((b, j) => <li key={j}>{b}</li>)}
                          </ul>
                        </div>
                      ))}
                    </section>
                  );
                case 'projects':
                  return resume.projects.length > 0 && (
                    <section className="mb-5">
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-3 border-b-2 pb-1" style={{ borderColor: c, color: c }}>Projects</h3>
                      {resume.projects.map((p, i) => (
                        <div key={i} className="mb-3">
                          <div className="flex justify-between">
                            <p className="font-semibold text-sm">{p.title}</p>
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
                    <section key={i} className="mb-5">
                      <h3 className="font-bold uppercase tracking-widest text-xs mb-3 border-b-2 pb-1" style={{ borderColor: c, color: c }}>{s.title}</h3>
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
        </main>
      </div>
    </div>
  );
};
