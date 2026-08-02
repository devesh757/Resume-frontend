import React from 'react';
import { Resume } from '../../../types';
import { Minimalist } from './templates/Minimalist';
import { Executive } from './templates/Executive';
import { Creative } from './templates/Creative';
import { Modern } from './templates/Modern';
import { TwoColumn } from './templates/TwoColumn';
import { Timeline } from './templates/Timeline';
import { Gradient } from './templates/Gradient';
import { Dark } from './templates/Dark';
import { Elegant } from './templates/Elegant';
import { Compact } from './templates/Compact';
import { Bold } from './templates/Bold';
import { Vintage } from './templates/Vintage';
import { Tech } from './templates/Tech';
import { Cards } from './templates/Cards';
import { Neon } from './templates/Neon';
import { VariantTemplate, variantTemplateIds } from './templates/Variants';

const templates: Record<string, React.FC<{ resume: Resume }>> = {
  minimalist: Minimalist,
  executive: Executive,
  creative: Creative,
  modern: Modern,
  'two-column': TwoColumn,
  timeline: Timeline,
  gradient: Gradient,
  dark: Dark,
  elegant: Elegant,
  compact: Compact,
  bold: Bold,
  vintage: Vintage,
  tech: Tech,
  cards: Cards,
  neon: Neon,
};

export const ResumePreview: React.FC<{ resume: Resume }> = ({ resume }) => {
  if (variantTemplateIds.includes(resume.template)) {
    return <VariantTemplate resume={resume} />;
  }
  const Template = templates[resume.template] ?? Minimalist;
  return <Template resume={resume} />;
};
