import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Cards: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const c = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="bg-white rounded-xl shadow-md p-5 mb-4">{children}</div>
  );

  const heading = (title: string) => (
    <h3 className="font-bold text-sm uppercase tracking-wide mb-3 pb-2 border-b border-gray-100" style={{ color: c }}>
      {title}
    </h3>
  );

  return (
    <div className="min-h-[800px] bg-gray-100 shadow-lg p-6" style={{ fontFamily: theme.font }}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-5">
        <div className="p-6" style={{ background: `linear-gradient(90deg, ${c}, ${c}bb)` }}>
          <h1 className="text-3xl font-extrabold text-white">{personalInfo.firstName} {personalInfo.lastName}</h1>
          {personalInfo.headline && <p className="text-white/90 mt-1">{personalInfo.headline}</p>}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/85 mt-3">
            {contacts.map((x) => <span key={x}>{x}</span>)}
          </div>
        </div>
      </div>
      {personalInfo.summary && (
        <Card>
          {heading('Profile')}
          <p className="text-sm text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </Card>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          switch (key) {
            case 'workExperience':
              return resume.workExperience.length > 0 && (
                <Card>
                  {heading('Experience')}
                  {resume.workExperience.map((e, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="flex justify-between">
                        <p className="font-semibold text-gray-800">{e.role} <span className="text-gray-500">at {e.company}</span></p>
                        <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5 self-start">
                          {e.startDate} – {e.endDate || 'Present'}
                        </span>
                      </div>
                      <ul className="list-disc ml-5 text-sm text-gray-600 mt-1">
                        {e.description.map((b, j) => <li key={j}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </Card>
              );
            case 'education':
              return resume.education.length > 0 && (
                <Card>
                  {heading('Education')}
                  {resume.education.map((e, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <p className="font-semibold text-gray-800">{e.institution}</p>
                      <p className="text-sm text-gray-600">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                      <p className="text-xs text-gray-400">{e.graduationDate}</p>
                    </div>
                  ))}
                </Card>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <Card>
                  {heading('Skills')}
                  {resume.skills.map((g, i) => (
                    <div key={i} className="mb-2 last:mb-0">
                      {g.category && <p className="text-xs font-semibold text-gray-500 mb-1">{g.category}</p>}
                      <div className="flex flex-wrap gap-1.5">
                        {g.items.map((s, j) => (
                          <span key={j} className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs">{s.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </Card>
              );
            case 'projects':
              return resume.projects.length > 0 && (
                <Card>
                  {heading('Projects')}
                  {resume.projects.map((p, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="flex justify-between">
                        <p className="font-semibold text-gray-800">{p.title}</p>
                        {p.link && <a href={p.link} className="text-xs text-blue-500">Link</a>}
                      </div>
                      <p className="text-xs text-gray-400">{p.technologies.join(', ')}</p>
                      <p className="text-sm text-gray-600 mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </Card>
              );
            case 'customSections':
              return resume.customSections.map((s, i) => (
                <Card key={i}>
                  {heading(s.title)}
                  <ul className="list-disc ml-5 text-sm text-gray-600">
                    {s.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </Card>
              ));
            default:
              return null;
          }
        }}
      />
    </div>
  );
};
