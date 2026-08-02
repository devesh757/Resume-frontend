import React from 'react';
import { TemplateId } from '../../types';
import { TEMPLATES } from '../../utils/constants';

const Thumb: React.FC<{ color: string; layout: string }> = ({ color, layout }) => {
  if (layout === 'sidebar') {
    return (
      <div className="flex w-full h-full">
        <div className="w-1/3 h-full" style={{ backgroundColor: color }} />
        <div className="flex-1 p-1 space-y-1">
          <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
          <div className="h-1 w-1/2 bg-gray-200 rounded" />
          <div className="h-1 w-2/3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  if (layout === 'split') {
    return (
      <div className="flex w-full h-full">
        <div className="w-1/3 h-full bg-gray-100 p-1 space-y-1 border-r border-gray-200">
          <div className="h-1 w-2/3 bg-gray-400 rounded" />
          <div className="h-1 w-full bg-gray-200 rounded" />
          <div className="h-1 w-full bg-gray-200 rounded" />
        </div>
        <div className="flex-1 p-1 space-y-1">
          <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
          <div className="h-1 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  if (layout === 'dark') {
    return (
      <div className="w-full h-full bg-slate-900 p-1.5 space-y-1">
        <div className="h-1.5 w-2/3 rounded" style={{ backgroundColor: color }} />
        <div className="h-1 w-3/4 bg-slate-600 rounded" />
        <div className="h-1 w-1/2 bg-slate-700 rounded" />
      </div>
    );
  }
  return (
    <div className="w-full h-full p-1.5 space-y-1">
      <div className="h-1.5 w-2/3 rounded" style={{ backgroundColor: color }} />
      <div className="h-1 w-3/4 bg-gray-200 rounded" />
      <div className="h-1 w-1/2 bg-gray-200 rounded" />
      <div className="flex gap-1 pt-1">
        <div className="h-1 w-4 bg-gray-200 rounded" />
        <div className="h-1 w-4 bg-gray-200 rounded" />
        <div className="h-1 w-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export const TemplateThumb: React.FC<{ template: TemplateId; className?: string }> = ({ template, className }) => {
  const meta = TEMPLATES.find((t) => t.id === template) ?? TEMPLATES[0];
  return (
    <div className={`w-full h-full overflow-hidden ${className ?? ''}`}>
      <Thumb color={meta.colors[0]} layout={meta.layout} />
    </div>
  );
};
