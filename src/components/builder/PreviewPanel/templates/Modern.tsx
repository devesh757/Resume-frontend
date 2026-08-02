import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Modern: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, skills, theme } = resume;
  const c = theme.primaryColor;
  const initials = `${personalInfo.firstName[0] ?? ''}${personalInfo.lastName[0] ?? ''}`;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="flex min-h-[800px] bg-white shadow-lg" style={{ fontFamily: theme.font }}>
      <aside className="w-1/3 text-white p-6" style={{ backgroundColor: c }}>
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold mb-5">
          {initials}
        </div>
        <h2 className="text-4xl font-extrabold leading-tight">
          {personalInfo.firstName}<br />{personalInfo.lastName}
        </h2>
        {personalInfo.headline && <p className="mt-2 text-sm text-white/90">{personalInfo.headline}</p>}
        <div className="mt-8 space-y-3 text-sm">
          {contacts.map((x) => <p key={x} className="break-all border-b border-white/20 pb-2">{x}</p>)}
        </div>
        {skills.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-3 tracking-wide">SKILLS</h3>
            <div className="space-y-3">
              {skills.map((g, i) => (
                <div key={i}>
                  {g.category && <p className="text-xs uppercase tracking-widest text-white/70 mb-1">{g.category}</p>}
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s, j) => (
                      <span key={j} className="bg-white/15 px-2 py-0.5 rounded text-xs">{s.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
      <main className="flex-1 p-8">
        {personalInfo.summary && (
          <p className="text-sm text-gray-600 border-l-4 pl-3 mb-6" style={{ borderColor: c }}>{personalInfo.summary}</p>
        )}
        <OrderedSections
          resume={resume}
          render={(key) => {
            switch (key) {
              case 'skills':
                return null;
              case 'workExperience':
                return resume.workExperience.length > 0 && (
                  <section className="mb-6">
                    <h3 className="font-bold uppercase tracking-wide mb-3" style={{ color: c }}>Experience</h3>
                    {resume.workExperience.map((e, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between items-baseline">
                          <p className="font-semibold">{e.role} <span className="font-normal">at {e.company}</span></p>
                          <span className="text-xs text-gray-500">{e.startDate} – {e.endDate || 'Present'}</span>
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
                  <section className="mb-6">
                    <h3 className="font-bold uppercase tracking-wide mb-3" style={{ color: c }}>Education</h3>
                    {resume.education.map((e, i) => (
                      <div key={i} className="mb-2">
                        <p className="font-semibold">{e.institution}</p>
                        <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                        <p className="text-xs text-gray-500">{e.graduationDate}</p>
                      </div>
                    ))}
                  </section>
                );
              case 'projects':
                return resume.projects.length > 0 && (
                  <section className="mb-6">
                    <h3 className="font-bold uppercase tracking-wide mb-3" style={{ color: c }}>Projects</h3>
                    {resume.projects.map((p, i) => (
                      <div key={i} className="mb-3">
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
                  <section key={i} className="mb-6">
                    <h3 className="font-bold uppercase tracking-wide mb-3" style={{ color: c }}>{s.title}</h3>
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
  );
};
