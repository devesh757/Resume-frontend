import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Gradient: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] bg-white shadow-lg" style={{ fontFamily: theme.font }}>
      <header
        className="text-white px-10 py-12"
        style={{ background: `linear-gradient(135deg, ${c} 0%, ${c}dd 60%, ${c}99 100%)` }}
      >
        <h1 className="text-5xl font-extrabold drop-shadow-sm">{personalInfo.firstName} {personalInfo.lastName}</h1>
        {personalInfo.headline && <p className="mt-2 text-white/90 text-lg">{personalInfo.headline}</p>}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/85 mt-4">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </header>
      <div className="p-10">
        {personalInfo.summary && (
          <p className="text-sm text-gray-700 leading-relaxed mb-8">{personalInfo.summary}</p>
        )}
        <OrderedSections
          resume={resume}
          render={(key) => {
            const heading = (title: string) => (
              <h3 className="text-lg font-bold mb-3" style={{ color: c }}>
                <span className="mr-2">✦</span>{title}
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
                          <p className="font-semibold">{e.role} <span className="text-gray-500">at {e.company}</span></p>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full self-start">
                            {e.startDate} – {e.endDate || 'Present'}
                          </span>
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
                      <div key={i} className="mb-3">
                        <p className="font-semibold">{e.institution}</p>
                        <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
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
                        <span key={i} className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: c }}>
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
    </div>
  );
};
