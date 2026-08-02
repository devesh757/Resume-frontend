import React from 'react';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { Resume } from '../../../types';

type SectionKey = keyof Resume['order'];

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'workExperience', label: 'Work Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'customSections', label: 'Custom Sections' },
];

export const SectionReorder: React.FC<{
  resume: Resume;
  setResume: (r: Resume) => void;
}> = ({ resume, setResume }) => {
  const order = { ...resume.order };
  const entries = SECTIONS.map((s) => ({ ...s, value: order[s.key] ?? 0 })).sort((a, b) => a.value - b.value);

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= entries.length) return;
    const a = entries[index];
    const b = entries[target];
    setResume({
      ...resume,
      order: { ...order, [a.key]: b.value, [b.key]: a.value },
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
        <GripVertical size={16} className="text-gray-400" /> Section Order
      </h3>
      <div className="space-y-1.5">
        {entries.map((s, i) => (
          <div
            key={s.key}
            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100"
          >
            <span className="text-sm text-gray-700">
              <span className="text-gray-400 mr-2 text-xs">{i + 1}.</span>
              {s.label}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="p-1 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === entries.length - 1}
                className="p-1 rounded hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
