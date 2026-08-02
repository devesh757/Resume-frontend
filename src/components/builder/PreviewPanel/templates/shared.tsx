import React from 'react';
import { Resume } from '../../../../types';

export const orderedKeys = (resume: Resume): string[] => {
  const order = resume.order ?? {
    workExperience: 0,
    education: 1,
    skills: 2,
    projects: 3,
    customSections: 4,
  };
  return Object.keys(order).sort(
    (a, b) => (order as Record<string, number>)[a] - (order as Record<string, number>)[b]
  );
};

export const OrderedSections: React.FC<{
  resume: Resume;
  render: (key: string) => React.ReactNode;
}> = ({ resume, render }) => (
  <>{orderedKeys(resume).map((key) => <React.Fragment key={key}>{render(key)}</React.Fragment>)}</>
);
