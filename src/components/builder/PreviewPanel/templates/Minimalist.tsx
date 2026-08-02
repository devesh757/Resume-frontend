import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';

export const Minimalist: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { personalInfo, theme } = resume;
  const primaryColor = theme.primaryColor;
  const contacts = [personalInfo.email, personalInfo.phone, personalInfo.website, personalInfo.linkedin].filter(Boolean);

  return (
    <div className="min-h-[800px] max-w-4xl mx-auto bg-white shadow-lg p-8" style={{ fontFamily: theme.font }}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold" style={{ color: primaryColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.headline && <p className="mt-1 text-gray-500">{personalInfo.headline}</p>}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600 mt-2">
          {contacts.map((x) => <span key={x}>{x}</span>)}
        </div>
      </div>
      {personalInfo.summary && (
        <p className="text-sm text-gray-600 text-center max-w-2xl mx-auto mb-8">{personalInfo.summary}</p>
      )}
      <OrderedSections
        resume={resume}
        render={(key) => {
          const heading = (title: string) => (
            <h2 className="text-xl font-semibold border-b-2 pb-1 mb-3" style={{ borderColor: primaryColor, color: primaryColor }}>
              {title}
            </h2>
          );
          switch (key) {
            case 'workExperience':
              return resume.workExperience.length > 0 && (
                <section className="mb-6">
                  {heading('Experience')}
                  {resume.workExperience.map((exp, idx) => (
                    <div key={idx} className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{exp.role} at {exp.company}</h3>
                        <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <ul className="list-disc ml-6 text-sm">
                        {exp.description.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    </div>
                  ))}
                </section>
              );
            case 'education':
              return resume.education.length > 0 && (
                <section className="mb-6">
                  {heading('Education')}
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <h3 className="font-semibold">{edu.institution}</h3>
                      <p>{edu.degree} {edu.major && `- ${edu.major}`}</p>
                      <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                    </div>
                  ))}
                </section>
              );
            case 'skills':
              return resume.skills.length > 0 && (
                <section className="mb-6">
                  {heading('Skills')}
                  {resume.skills.map((group, idx) => (
                    <div key={idx} className="mb-2">
                      <h4 className="font-medium">{group.category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item, i) => (
                          <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">{item.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              );
            case 'projects':
              return resume.projects.length > 0 && (
                <section className="mb-6">
                  {heading('Projects')}
                  {resume.projects.map((proj, idx) => (
                    <div key={idx} className="mb-3">
                      <h3 className="font-semibold">{proj.title}</h3>
                      <p className="text-sm text-gray-600">{proj.technologies.join(', ')}</p>
                      <p className="text-sm">{proj.description}</p>
                      {proj.link && <a href={proj.link} className="text-blue-500 text-sm">Link</a>}
                    </div>
                  ))}
                </section>
              );
            case 'customSections':
              return resume.customSections.map((section, idx) => (
                <section key={idx} className="mb-6">
                  {heading(section.title)}
                  <ul className="list-disc ml-6">
                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
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
