import React from 'react';
import { Resume } from '../../../types';
import { PersonalInfo } from './PersonalInfo';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { CustomSections } from './CustomSections';
import { SectionReorder } from './SectionReorder';

interface FormPanelProps {
  resume: Resume;
  setResume: React.Dispatch<React.SetStateAction<Resume | null>>;
}

export const FormPanel: React.FC<FormPanelProps> = ({ resume, setResume }) => {
  return (
    <div className="space-y-4">
      <SectionReorder resume={resume} setResume={setResume} />
      <PersonalInfo resume={resume} setResume={setResume} />
      <WorkExperience resume={resume} setResume={setResume} />
      <Education resume={resume} setResume={setResume} />
      <Skills resume={resume} setResume={setResume} />
      <Projects resume={resume} setResume={setResume} />
      <CustomSections resume={resume} setResume={setResume} />
    </div>
  );
};
