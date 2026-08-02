import React from 'react';
import { Resume } from '../../../../types';
import { OrderedSections } from './shared';
import { Avatar } from './Avatar';

type VLayout = 'single' | 'sidebar' | 'split' | 'dark';
type VHeader = 'center' | 'left' | 'banner' | 'gradient' | 'framed';
type VHeading = 'underline' | 'bar' | 'tiny' | 'filled' | 'leftborder' | 'tracked' | 'ornament';
type VSkill = 'chips' | 'outline' | 'pills' | 'flat' | 'dotsep';

export interface VariantConfig {
  id: string;
  name: string;
  description: string;
  colors: string[];
  layout: VLayout;
  font: string;
  header: VHeader;
  heading: VHeading;
  skill: VSkill;
  bg?: string;
  nameClass?: string;
}

const VARIANTS: Record<string, VariantConfig> = {
  aurora: { id: 'aurora', name: 'Aurora', description: 'Indigo-violet gradient', colors: ['#6366f1', '#8b5cf6'], layout: 'single', font: 'Inter', header: 'gradient', heading: 'tiny', skill: 'chips' },
  slate: { id: 'slate', name: 'Slate', description: 'Neutral and crisp', colors: ['#475569'], layout: 'single', font: 'Inter', header: 'center', heading: 'underline', skill: 'chips' },
  mint: { id: 'mint', name: 'Mint', description: 'Teal sidebar accent', colors: ['#0d9488'], layout: 'sidebar', font: 'Poppins', header: 'left', heading: 'tiny', skill: 'chips' },
  ocean: { id: 'ocean', name: 'Ocean', description: 'Deep blue accents', colors: ['#0284c7'], layout: 'single', font: 'Roboto', header: 'left', heading: 'bar', skill: 'outline' },
  sunset: { id: 'sunset', name: 'Sunset', description: 'Orange gradient header', colors: ['#ea580c', '#f59e0b'], layout: 'single', font: 'Poppins', header: 'gradient', heading: 'leftborder', skill: 'pills' },
  lavender: { id: 'lavender', name: 'Lavender', description: 'Purple split layout', colors: ['#7c3aed'], layout: 'split', font: 'Lora', header: 'left', heading: 'underline', skill: 'flat' },
  forest: { id: 'forest', name: 'Forest', description: 'Serif green classic', colors: ['#166534'], layout: 'single', font: 'Georgia', header: 'center', heading: 'ornament', skill: 'dotsep' },
  coral: { id: 'coral', name: 'Coral', description: 'Pink-red sidebar', colors: ['#e11d48'], layout: 'sidebar', font: 'Poppins', header: 'left', heading: 'bar', skill: 'pills' },
  onyx: { id: 'onyx', name: 'Onyx', description: 'Black editorial dark', colors: ['#111827', '#1f2937'], layout: 'dark', font: 'Inter', header: 'left', heading: 'tracked', skill: 'outline' },
  pearl: { id: 'pearl', name: 'Pearl', description: 'Soft framed paper', colors: ['#a8a29e'], layout: 'single', font: 'Lora', header: 'framed', heading: 'tiny', skill: 'flat' },
  amber: { id: 'amber', name: 'Amber', description: 'Warm filled headings', colors: ['#d97706'], layout: 'single', font: 'Georgia', header: 'left', heading: 'filled', skill: 'chips' },
  skyline: { id: 'skyline', name: 'Skyline', description: 'Blue split layout', colors: ['#0369a1'], layout: 'split', font: 'Inter', header: 'left', heading: 'bar', skill: 'pills' },
  paper: { id: 'paper', name: 'Paper', description: 'Vintage stationery', colors: ['#78716c'], layout: 'single', font: 'Georgia', header: 'center', heading: 'underline', skill: 'dotsep', bg: 'bg-stone-50' },
  mono: { id: 'mono', name: 'Mono', description: 'Monospace minimal', colors: ['#334155'], layout: 'single', font: 'Courier New', header: 'left', heading: 'tiny', skill: 'outline' },
  script: { id: 'script', name: 'Script', description: 'Elegant serif center', colors: ['#a21caf'], layout: 'single', font: 'Playfair Display', header: 'center', heading: 'ornament', skill: 'chips' },
  nordic: { id: 'nordic', name: 'Nordic', description: 'Scandinavian dark', colors: ['#334155', '#475569'], layout: 'dark', font: 'Inter', header: 'center', heading: 'tiny', skill: 'outline' },
  desert: { id: 'desert', name: 'Desert', description: 'Sandy banner style', colors: ['#b45309'], layout: 'single', font: 'Lora', header: 'banner', heading: 'tracked', skill: 'pills', bg: 'bg-amber-50' },
  rose: { id: 'rose', name: 'Rose', description: 'Deep rose sidebar', colors: ['#be123c'], layout: 'sidebar', font: 'Playfair Display', header: 'left', heading: 'ornament', skill: 'chips' },
  indigo: { id: 'indigo', name: 'Indigo', description: 'Bold indigo bars', colors: ['#4338ca'], layout: 'single', font: 'Inter', header: 'left', heading: 'bar', skill: 'chips' },
  emerald: { id: 'emerald', name: 'Emerald', description: 'Green sidebar accent', colors: ['#059669'], layout: 'sidebar', font: 'Inter', header: 'left', heading: 'underline', skill: 'pills' },
  crimson: { id: 'crimson', name: 'Crimson', description: 'Red gradient energy', colors: ['#b91c1c', '#ef4444'], layout: 'single', font: 'Roboto', header: 'gradient', heading: 'leftborder', skill: 'chips' },
  arctic: { id: 'arctic', name: 'Arctic', description: 'Light blue framed', colors: ['#0284c7'], layout: 'single', font: 'Inter', header: 'framed', heading: 'underline', skill: 'outline', bg: 'bg-sky-50' },
  twilight: { id: 'twilight', name: 'Twilight', description: 'Navy dark serif', colors: ['#312e81'], layout: 'dark', font: 'Lora', header: 'center', heading: 'ornament', skill: 'flat' },
  meadow: { id: 'meadow', name: 'Meadow', description: 'Olive split layout', colors: ['#4d7c0f'], layout: 'split', font: 'Inter', header: 'left', heading: 'filled', skill: 'chips' },
  horizon: { id: 'horizon', name: 'Horizon', description: 'Sky blue banner', colors: ['#0ea5e9'], layout: 'single', font: 'Poppins', header: 'banner', heading: 'tiny', skill: 'pills' },
  blush: { id: 'blush', name: 'Blush', description: 'Soft pink paper', colors: ['#fb7185'], layout: 'single', font: 'Playfair Display', header: 'center', heading: 'ornament', skill: 'pills', bg: 'bg-rose-50' },
  charcoal: { id: 'charcoal', name: 'Charcoal', description: 'Deep gray dark', colors: ['#1f2937'], layout: 'dark', font: 'Inter', header: 'left', heading: 'leftborder', skill: 'chips' },
  ivory: { id: 'ivory', name: 'Ivory', description: 'Cream filled headings', colors: ['#d6d3d1'], layout: 'single', font: 'Georgia', header: 'left', heading: 'filled', skill: 'chips', bg: 'bg-orange-50' },
  steel: { id: 'steel', name: 'Steel', description: 'Gray-blue split', colors: ['#64748b'], layout: 'split', font: 'Roboto', header: 'left', heading: 'tiny', skill: 'flat' },
  berry: { id: 'berry', name: 'Berry', description: 'Burgundy sidebar', colors: ['#9d174d'], layout: 'sidebar', font: 'Poppins', header: 'left', heading: 'bar', skill: 'chips' },
  honey: { id: 'honey', name: 'Honey', description: 'Golden banner paper', colors: ['#a16207'], layout: 'single', font: 'Georgia', header: 'banner', heading: 'tracked', skill: 'dotsep', bg: 'bg-amber-50' },
  storm: { id: 'storm', name: 'Storm', description: 'Slate storm dark', colors: ['#0f172a'], layout: 'dark', font: 'Inter', header: 'center', heading: 'tracked', skill: 'outline' },
  cobalt: { id: 'cobalt', name: 'Cobalt', description: 'Electric blue gradient', colors: ['#1d4ed8', '#3b82f6'], layout: 'single', font: 'Roboto', header: 'gradient', heading: 'bar', skill: 'outline' },
  pine: { id: 'pine', name: 'Pine', description: 'Deep green split', colors: ['#14532d'], layout: 'split', font: 'Inter', header: 'left', heading: 'leftborder', skill: 'chips' },
  platinum: { id: 'platinum', name: 'Platinum', description: 'Silver mono accent', colors: ['#94a3b8'], layout: 'single', font: 'Inter', header: 'left', heading: 'tiny', skill: 'chips' },
};

const contactsOf = (resume: Resume) =>
  [resume.personalInfo.email, resume.personalInfo.phone, resume.personalInfo.website, resume.personalInfo.linkedin].filter(Boolean);

const ContactRow: React.FC<{ resume: Resume; dark?: boolean; className?: string }> = ({ resume, dark, className }) => (
  <div className={`flex flex-wrap gap-x-4 gap-y-1 text-sm ${dark ? 'text-slate-400' : 'text-gray-600'} ${className ?? ''}`}>
    {contactsOf(resume).map((x) => <span key={x} className="break-all">{x}</span>)}
  </div>
);

export const VariantTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
  const cfg = VARIANTS[resume.template];
  if (!cfg) return null;
  const c = resume.theme.primaryColor;
  const dark = cfg.layout === 'dark';
  const font = cfg.font;
  const info = resume.personalInfo;

  const heading = (title: string): React.ReactNode => {
    const base = 'font-bold mb-3';
    switch (cfg.heading) {
      case 'underline':
        return <h3 className={`${base} text-lg border-b-2 pb-1 inline-block`} style={{ borderColor: c, color: dark ? '#f1f5f9' : c }}>{title}</h3>;
      case 'bar':
        return (
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-1 rounded" style={{ backgroundColor: c }} />
            <h3 className="font-bold text-lg" style={{ color: dark ? '#f1f5f9' : c }}>{title}</h3>
          </div>
        );
      case 'tiny':
        return <h3 className={`${base} text-xs uppercase tracking-[0.25em]`} style={{ color: c }}>{title}</h3>;
      case 'filled':
        return <h3 className={`${base} text-sm uppercase tracking-wide px-3 py-1 text-white inline-block rounded`} style={{ backgroundColor: c }}>{title}</h3>;
      case 'leftborder':
        return <h3 className={`${base} pl-3 border-l-4 text-lg`} style={{ borderColor: c, color: dark ? '#f1f5f9' : c }}>{title}</h3>;
      case 'tracked':
        return <h3 className={`${base} text-sm uppercase tracking-[0.3em]`} style={{ color: c }}>{title}</h3>;
      case 'ornament':
        return <h3 className={`${base} text-center text-lg tracking-widest`} style={{ color: c }}>✦ {title} ✦</h3>;
      default:
        return <h3 className={`${base} text-lg`} style={{ color: c }}>{title}</h3>;
    }
  };

  const skillList = (skills: Resume['skills']) => {
    const items = skills.flatMap((g) => g.items.map((s) => s.name));
    switch (cfg.skill) {
      case 'outline':
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((s, i) => <span key={i} className="border px-2.5 py-0.5 rounded text-sm" style={{ borderColor: c, color: c }}>{s}</span>)}
          </div>
        );
      case 'pills':
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((s, i) => <span key={i} className="bg-gray-100 text-gray-700 px-3 py-0.5 rounded-full text-sm">{s}</span>)}
          </div>
        );
      case 'flat':
        return (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {items.map((s, i) => <span key={i} className="text-sm" style={{ color: c }}>▸ {s}</span>)}
          </div>
        );
      case 'dotsep':
        return <p className="text-sm text-gray-700">{items.join('  ·  ')}</p>;
      default:
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((s, i) => <span key={i} className="text-white px-3 py-0.5 rounded-full text-sm" style={{ backgroundColor: c }}>{s}</span>)}
          </div>
        );
    }
  };

  const sectionBlocks = (
    <OrderedSections
      resume={resume}
      render={(key) => {
        switch (key) {
          case 'skills':
            return null;
          case 'workExperience':
            return resume.workExperience.length > 0 && (
              <section className="mb-6">
                {heading('Experience')}
                {resume.workExperience.map((e, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <p className="font-semibold">{e.role} <span className={dark ? 'text-slate-400' : 'text-gray-500'}>at {e.company}</span></p>
                      <span className={`text-xs ${dark ? 'text-slate-500' : 'text-gray-500'}`}>{e.startDate} – {e.endDate || 'Present'}</span>
                    </div>
                    <ul className={`list-disc ml-5 text-sm mt-1 ${dark ? 'text-slate-300' : 'text-gray-700'}`}>
                      {e.description.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            );
          case 'education':
            return resume.education.length > 0 && (
              <section className="mb-6">
                {heading('Education')}
                {resume.education.map((e, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-semibold">{e.institution}</p>
                    <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
                    <p className={`text-xs ${dark ? 'text-slate-500' : 'text-gray-500'}`}>{e.graduationDate}</p>
                  </div>
                ))}
              </section>
            );
          case 'projects':
            return resume.projects.length > 0 && (
              <section className="mb-6">
                {heading('Projects')}
                {resume.projects.map((p, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <p className="font-semibold">{p.title}</p>
                      {p.link && <a href={p.link} className="text-xs text-blue-500">Link</a>}
                    </div>
                    <p className={`text-xs ${dark ? 'text-slate-500' : 'text-gray-500'}`}>{p.technologies.join(', ')}</p>
                    <p className={`text-sm mt-0.5 ${dark ? 'text-slate-300' : 'text-gray-700'}`}>{p.description}</p>
                  </div>
                ))}
              </section>
            );
          case 'customSections':
            return resume.customSections.map((s, i) => (
              <section key={i} className="mb-6">
                {heading(s.title)}
                <ul className={`list-disc ml-5 text-sm ${dark ? 'text-slate-300' : 'text-gray-700'}`}>
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </section>
            ));
          default:
            return null;
        }
      }}
    />
  );

  const skillBlock = resume.skills.length > 0 && (
    <section className="mb-6">
      {heading('Skills')}
      {resume.skills.map((g, i) => (
        <div key={i} className="mb-2">
          {g.category && <p className={`text-xs font-semibold ${dark ? 'text-slate-400' : 'text-gray-600'} mb-1`}>{g.category}</p>}
          {skillList([g])}
        </div>
      ))}
    </section>
  );

  const educationBlock = resume.education.length > 0 && (
    <section className="mb-6">
      {heading('Education')}
      {resume.education.map((e, i) => (
        <div key={i} className="mb-2">
          <p className="font-semibold">{e.institution}</p>
          <p className="text-sm">{e.degree}{e.major ? ` – ${e.major}` : ''}</p>
          <p className={`text-xs ${dark ? 'text-slate-500' : 'text-gray-500'}`}>{e.graduationDate}</p>
        </div>
      ))}
    </section>
  );

  const headerContent = (() => {
    switch (cfg.header) {
      case 'center':
        return (
          <div className="text-center mb-8">
            {info.avatar || info.firstName ? (
              <div className="flex justify-center mb-4"><Avatar info={info} size="md" className="shadow-md" /></div>
            ) : null}
            <h1 className={`text-4xl font-bold ${cfg.nameClass ?? ''}`} style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
              {info.firstName} {info.lastName}
            </h1>
            {info.headline && <p className="mt-1 font-medium" style={{ color: c }}>{info.headline}</p>}
            <div className="flex justify-center mt-3"><ContactRow resume={resume} dark={dark} /></div>
          </div>
        );
      case 'left':
        return (
          <div className="flex items-center gap-5 mb-8">
            {(info.avatar || info.firstName) && <Avatar info={info} size="lg" className="shadow-md" />}
            <div className="min-w-0">
              <h1 className={`text-3xl font-bold ${cfg.nameClass ?? ''}`} style={{ color: dark ? '#f8fafc' : '#0f172a' }}>
                {info.firstName} {info.lastName}
              </h1>
              {info.headline && <p className="mt-1 font-medium" style={{ color: c }}>{info.headline}</p>}
              <div className="mt-2"><ContactRow resume={resume} dark={dark} /></div>
            </div>
          </div>
        );
      case 'banner':
        return (
          <div className="mb-8 rounded-xl overflow-hidden text-white" style={{ backgroundColor: c }}>
            <div className="flex items-center gap-5 p-8">
              {(info.avatar || info.firstName) && <Avatar info={info} size="lg" />}
              <div className="min-w-0">
                <h1 className={`text-3xl font-bold ${cfg.nameClass ?? ''}`}>{info.firstName} {info.lastName}</h1>
                {info.headline && <p className="mt-1 text-white/85">{info.headline}</p>}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/85">
                  {contactsOf(resume).map((x) => <span key={x}>{x}</span>)}
                </div>
              </div>
            </div>
          </div>
        );
      case 'gradient':
        return (
          <div className="mb-8 rounded-xl overflow-hidden text-white p-8" style={{ background: `linear-gradient(120deg, ${c}, ${cfg.colors[1] ?? c})` }}>
            <div className="flex items-center gap-5">
              {(info.avatar || info.firstName) && <Avatar info={info} size="lg" />}
              <div className="min-w-0">
                <h1 className={`text-3xl font-bold ${cfg.nameClass ?? ''}`}>{info.firstName} {info.lastName}</h1>
                {info.headline && <p className="mt-1 text-white/85">{info.headline}</p>}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/85">
                  {contactsOf(resume).map((x) => <span key={x}>{x}</span>)}
                </div>
              </div>
            </div>
          </div>
        );
      case 'framed':
        return (
          <div className="mb-8 border-2 p-6" style={{ borderColor: c }}>
            <div className="flex items-center gap-5">
              {(info.avatar || info.firstName) && <Avatar info={info} size="md" className="shadow" />}
              <div className="min-w-0">
                <h1 className={`text-3xl font-bold ${cfg.nameClass ?? ''}`} style={{ color: '#0f172a' }}>
                  {info.firstName} {info.lastName}
                </h1>
                {info.headline && <p className="mt-1 font-medium" style={{ color: c }}>{info.headline}</p>}
                <div className="mt-2"><ContactRow resume={resume} /></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  })();

  if (cfg.layout === 'sidebar') {
    return (
      <div className="flex min-h-[800px] bg-white shadow-lg" style={{ fontFamily: font }}>
        <aside className="w-1/3 text-white p-6" style={{ backgroundColor: c }}>
          <div className="mb-5 flex justify-center"><Avatar info={info} size="lg" /></div>
          <h2 className="text-3xl font-bold leading-tight">{info.firstName}<br />{info.lastName}</h2>
          {info.headline && <p className="mt-2 text-sm text-white/85">{info.headline}</p>}
          <div className="mt-6 space-y-2.5 text-sm">
            {contactsOf(resume).map((x) => <p key={x} className="break-all border-b border-white/20 pb-1.5">{x}</p>)}
          </div>
          {resume.skills.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold mb-3 tracking-wide">SKILLS</h3>
              {resume.skills.map((g, i) => (
                <div key={i} className="mb-3">
                  {g.category && <p className="text-xs uppercase tracking-widest text-white/70 mb-1">{g.category}</p>}
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s, j) => <span key={j} className="bg-white/15 px-2 py-0.5 rounded text-xs">{s.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
        <main className="flex-1 p-8">
          {info.summary && <p className="text-sm text-gray-600 border-l-4 pl-3 mb-6" style={{ borderColor: c }}>{info.summary}</p>}
          {sectionBlocks}
        </main>
      </div>
    );
  }

  if (cfg.layout === 'split') {
    return (
      <div className="grid grid-cols-5 min-h-[800px] bg-white shadow-lg" style={{ fontFamily: font }}>
        <aside className="col-span-2 bg-gray-50 border-r border-gray-200 p-6">
          <div className="mb-4"><Avatar info={info} size="md" className="shadow" /></div>
          <h2 className="text-2xl font-bold text-gray-800">{info.firstName} {info.lastName}</h2>
          {info.headline && <p className="text-sm mt-1" style={{ color: c }}>{info.headline}</p>}
          <div className="mt-5 space-y-1 text-sm text-gray-600">
            {contactsOf(resume).map((x) => <p key={x} className="break-all">{x}</p>)}
          </div>
          {resume.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Skills</h3>
              {resume.skills.map((g, i) => (
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
          {educationBlock}
        </aside>
        <main className="col-span-3 p-6">
          {info.summary && <p className="text-sm text-gray-700 mb-5 leading-relaxed">{info.summary}</p>}
          {sectionBlocks}
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-[800px] shadow-lg ${dark ? 'bg-slate-900 text-slate-200' : `bg-white ${cfg.bg ?? ''} text-gray-800`} p-10`} style={{ fontFamily: font }}>
      {headerContent}
      {info.summary && (
        <p className={`text-sm leading-relaxed mb-8 ${dark ? 'text-slate-300' : 'text-gray-600'}`}>{info.summary}</p>
      )}
      {sectionBlocks}
      {skillBlock}
    </div>
  );
};

export const variantTemplateIds = Object.keys(VARIANTS);
