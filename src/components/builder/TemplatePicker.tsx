import React from 'react';
import { Check, Palette } from 'lucide-react';
import { TEMPLATES, FONTS, COLOR_PRESETS } from '../../utils/constants';
import { TemplateId } from '../../types';
import { TemplateThumb } from '../common/TemplateThumb';

export const TemplatePicker: React.FC<{
  currentTemplate: TemplateId;
  onSelect: (id: TemplateId) => void;
}> = ({ currentTemplate, onSelect }) => {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
        <Palette size={12} /> Template
      </p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            title={t.description}
            className={`relative w-16 h-20 rounded-lg border-2 overflow-hidden shrink-0 transition hover:scale-105 ${
              currentTemplate === t.id ? 'border-primary-600 shadow-md' : 'border-gray-200'
            }`}
          >
            <TemplateThumb template={t.id} />
            <span className="absolute bottom-0 inset-x-0 bg-white/90 text-[9px] font-medium text-gray-700 py-0.5 text-center truncate">
              {t.name}
            </span>
            {currentTemplate === t.id && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-600 text-white flex items-center justify-center">
                <Check size={10} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export const ThemeControls: React.FC<{
  font: string;
  primaryColor: string;
  onFontChange: (font: string) => void;
  onColorChange: (color: string) => void;
}> = ({ font, primaryColor, onFontChange, onColorChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Font</label>
        <select
          value={font}
          onChange={(e) => onFontChange(e.target.value)}
          className="border rounded-lg px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {FONTS.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Accent Color</label>
        <div className="flex items-center gap-1.5">
          {COLOR_PRESETS.map((c) => (
            <button
              key={c}
              onClick={() => onColorChange(c)}
              className={`w-5 h-5 rounded-full border-2 transition hover:scale-110 ${
                primaryColor === c ? 'border-gray-800 scale-110' : 'border-white shadow'
              }`}
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
            title="Custom color"
          />
        </div>
      </div>
    </div>
  );
};
