export type TemplateId =
  | 'minimalist'
  | 'executive'
  | 'creative'
  | 'modern'
  | 'two-column'
  | 'timeline'
  | 'gradient'
  | 'dark'
  | 'elegant'
  | 'compact'
  | 'bold'
  | 'vintage'
  | 'tech'
  | 'cards'
  | 'neon'
  | 'aurora'
  | 'slate'
  | 'mint'
  | 'ocean'
  | 'sunset'
  | 'lavender'
  | 'forest'
  | 'coral'
  | 'onyx'
  | 'pearl'
  | 'amber'
  | 'skyline'
  | 'paper'
  | 'mono'
  | 'script'
  | 'nordic'
  | 'desert'
  | 'rose'
  | 'indigo'
  | 'emerald'
  | 'crimson'
  | 'arctic'
  | 'twilight'
  | 'meadow'
  | 'horizon'
  | 'blush'
  | 'charcoal'
  | 'ivory'
  | 'steel'
  | 'berry'
  | 'honey'
  | 'storm'
  | 'cobalt'
  | 'pine'
  | 'platinum';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  headline?: string;
  summary?: string;
  website?: string;
  linkedin?: string;
  avatar?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  major?: string;
  graduationDate: string;
}

export interface SkillItem {
  name: string;
  proficiency?: 'beginner' | 'intermediate' | 'expert';
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface Project {
  title: string;
  technologies: string[];
  link?: string;
  description: string;
}

export interface CustomSection {
  title: string;
  items: string[];
}

export interface Resume {
  _id: string;
  userId: string;
  title: string;
  template: TemplateId;
  theme: {
    font: string;
    primaryColor: string;
  };
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  customSections: CustomSection[];
  order: {
    workExperience: number;
    education: number;
    skills: number;
    projects: number;
    customSections: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type ResumeFormData = Omit<Resume, '_id' | 'userId' | 'createdAt' | 'updatedAt'>;
