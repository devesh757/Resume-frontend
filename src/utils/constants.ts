import { TemplateId } from '../types';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  colors: string[];
  layout: 'single' | 'sidebar' | 'split' | 'dark';
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, elegant', colors: ['#64748b'], layout: 'single' },
  { id: 'executive', name: 'Executive', description: 'Professional & formal', colors: ['#1d4ed8'], layout: 'single' },
  { id: 'creative', name: 'Creative', description: 'Colorful and playful', colors: ['#ec4899'], layout: 'single' },
  { id: 'modern', name: 'Modern', description: 'Sidebar with accent color', colors: ['#0ea5e9'], layout: 'sidebar' },
  { id: 'two-column', name: 'Two Column', description: 'Classic split layout', colors: ['#475569'], layout: 'split' },
  { id: 'timeline', name: 'Timeline', description: 'Chronological timeline', colors: ['#10b981'], layout: 'single' },
  { id: 'gradient', name: 'Gradient', description: 'Vibrant gradient header', colors: ['#8b5cf6'], layout: 'single' },
  { id: 'dark', name: 'Dark', description: 'Modern dark theme', colors: ['#0f172a'], layout: 'dark' },
  { id: 'elegant', name: 'Elegant', description: 'Refined & timeless', colors: ['#b45309'], layout: 'single' },
  { id: 'compact', name: 'Compact', description: 'Dense ATS-friendly', colors: ['#4f46e5'], layout: 'single' },
  { id: 'bold', name: 'Bold', description: 'Strong typography', colors: ['#ef4444'], layout: 'single' },
  { id: 'vintage', name: 'Vintage', description: 'Warm retro look', colors: ['#a16207'], layout: 'single' },
  { id: 'tech', name: 'Tech', description: 'Dark terminal style', colors: ['#22c55e'], layout: 'dark' },
  { id: 'cards', name: 'Cards', description: 'Card-based sections', colors: ['#f97316'], layout: 'single' },
  { id: 'neon', name: 'Neon', description: 'Neon glow accents', colors: ['#d946ef'], layout: 'dark' },
  { id: 'aurora', name: 'Aurora', description: 'Indigo-violet gradient', colors: ['#6366f1', '#8b5cf6'], layout: 'single' },
  { id: 'slate', name: 'Slate', description: 'Neutral and crisp', colors: ['#475569'], layout: 'single' },
  { id: 'mint', name: 'Mint', description: 'Teal sidebar accent', colors: ['#0d9488'], layout: 'sidebar' },
  { id: 'ocean', name: 'Ocean', description: 'Deep blue accents', colors: ['#0284c7'], layout: 'single' },
  { id: 'sunset', name: 'Sunset', description: 'Orange gradient header', colors: ['#ea580c', '#f59e0b'], layout: 'single' },
  { id: 'lavender', name: 'Lavender', description: 'Purple split layout', colors: ['#7c3aed'], layout: 'split' },
  { id: 'forest', name: 'Forest', description: 'Serif green classic', colors: ['#166534'], layout: 'single' },
  { id: 'coral', name: 'Coral', description: 'Pink-red sidebar', colors: ['#e11d48'], layout: 'sidebar' },
  { id: 'onyx', name: 'Onyx', description: 'Black editorial dark', colors: ['#111827', '#1f2937'], layout: 'dark' },
  { id: 'pearl', name: 'Pearl', description: 'Soft framed paper', colors: ['#a8a29e'], layout: 'single' },
  { id: 'amber', name: 'Amber', description: 'Warm filled headings', colors: ['#d97706'], layout: 'single' },
  { id: 'skyline', name: 'Skyline', description: 'Blue split layout', colors: ['#0369a1'], layout: 'split' },
  { id: 'paper', name: 'Paper', description: 'Vintage stationery', colors: ['#78716c'], layout: 'single' },
  { id: 'mono', name: 'Mono', description: 'Monospace minimal', colors: ['#334155'], layout: 'single' },
  { id: 'script', name: 'Script', description: 'Elegant serif center', colors: ['#a21caf'], layout: 'single' },
  { id: 'nordic', name: 'Nordic', description: 'Scandinavian dark', colors: ['#334155', '#475569'], layout: 'dark' },
  { id: 'desert', name: 'Desert', description: 'Sandy banner style', colors: ['#b45309'], layout: 'single' },
  { id: 'rose', name: 'Rose', description: 'Deep rose sidebar', colors: ['#be123c'], layout: 'sidebar' },
  { id: 'indigo', name: 'Indigo', description: 'Bold indigo bars', colors: ['#4338ca'], layout: 'single' },
  { id: 'emerald', name: 'Emerald', description: 'Green sidebar accent', colors: ['#059669'], layout: 'sidebar' },
  { id: 'crimson', name: 'Crimson', description: 'Red gradient energy', colors: ['#b91c1c', '#ef4444'], layout: 'single' },
  { id: 'arctic', name: 'Arctic', description: 'Light blue framed', colors: ['#0284c7'], layout: 'single' },
  { id: 'twilight', name: 'Twilight', description: 'Navy dark serif', colors: ['#312e81'], layout: 'dark' },
  { id: 'meadow', name: 'Meadow', description: 'Olive split layout', colors: ['#4d7c0f'], layout: 'split' },
  { id: 'horizon', name: 'Horizon', description: 'Sky blue banner', colors: ['#0ea5e9'], layout: 'single' },
  { id: 'blush', name: 'Blush', description: 'Soft pink paper', colors: ['#fb7185'], layout: 'single' },
  { id: 'charcoal', name: 'Charcoal', description: 'Deep gray dark', colors: ['#1f2937'], layout: 'dark' },
  { id: 'ivory', name: 'Ivory', description: 'Cream filled headings', colors: ['#d6d3d1'], layout: 'single' },
  { id: 'steel', name: 'Steel', description: 'Gray-blue split', colors: ['#64748b'], layout: 'split' },
  { id: 'berry', name: 'Berry', description: 'Burgundy sidebar', colors: ['#9d174d'], layout: 'sidebar' },
  { id: 'honey', name: 'Honey', description: 'Golden banner paper', colors: ['#a16207'], layout: 'single' },
  { id: 'storm', name: 'Storm', description: 'Slate storm dark', colors: ['#0f172a'], layout: 'dark' },
  { id: 'cobalt', name: 'Cobalt', description: 'Electric blue gradient', colors: ['#1d4ed8', '#3b82f6'], layout: 'single' },
  { id: 'pine', name: 'Pine', description: 'Deep green split', colors: ['#14532d'], layout: 'split' },
  { id: 'platinum', name: 'Platinum', description: 'Silver mono accent', colors: ['#94a3b8'], layout: 'single' },
];

export const FONTS = [
  'Inter',
  'Poppins',
  'Playfair Display',
  'Roboto',
  'Lora',
  'Georgia',
  'Times New Roman',
  'Arial',
  'Courier New',
];

export const COLOR_PRESETS = [
  '#3b82f6',
  '#0ea5e9',
  '#8b5cf6',
  '#ec4899',
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#10b981',
  '#14b8a6',
  '#6366f1',
  '#22c55e',
  '#64748b',
];
