import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../hooks/useResume';
import { FormPanel } from './FormPanel/FormPanel';
import { ResumePreview } from './PreviewPanel/ResumePreview';
import { TemplatePicker, ThemeControls } from './TemplatePicker';
import { useDebounce } from '../../hooks/useDebounce';
import { ArrowLeft, Download, Check, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { Resume } from '../../types';

type SaveState = 'idle' | 'saving' | 'saved';

export const ResumeBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentResume, fetchResume, updateResume } = useResume();
  const [localResume, setLocalResume] = useState<Resume | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const debouncedResume = useDebounce(localResume, 800);
  const savingRef = useRef(false);

  useEffect(() => {
    setLocalResume(null);
    setSaveState('idle');
    if (id) fetchResume(id);
  }, [id]);

  useEffect(() => {
    if (currentResume && !savingRef.current) setLocalResume(currentResume);
  }, [currentResume]);

  useEffect(() => {
    if (!debouncedResume?._id) return;
    let cancelled = false;
    savingRef.current = true;
    setSaveState('saving');
    updateResume(debouncedResume._id, debouncedResume)
      .then(() => {
        if (!cancelled) {
          setSaveState('saved');
          setTimeout(() => !cancelled && setSaveState('idle'), 1500);
        }
      })
      .catch(() => {
        if (!cancelled) setSaveState('idle');
      })
      .finally(() => {
        savingRef.current = false;
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedResume]);

  const handleDownload = async () => {
    if (!localResume) return;
    const response = await api.get(`/resumes/${localResume._id}/pdf`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${localResume.title || 'resume'}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!localResume) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            title="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <input
            type="text"
            value={localResume.title}
            onChange={(e) => setLocalResume({ ...localResume, title: e.target.value })}
            className="text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 focus:outline-none min-w-0 w-56"
          />
          <span className="text-xs text-gray-400 flex items-center gap-1">
            {saveState === 'saving' && <><Loader2 size={12} className="animate-spin" /> Saving...</>}
            {saveState === 'saved' && <><Check size={12} className="text-green-500" /> Saved</>}
          </span>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          <Download size={16} /> Download PDF
        </button>
      </header>

      <div className="bg-white border-b px-4 py-3 space-y-3 shrink-0">
        <TemplatePicker
          currentTemplate={localResume.template}
          onSelect={(template) => setLocalResume({ ...localResume, template })}
        />
        <ThemeControls
          font={localResume.theme.font}
          primaryColor={localResume.theme.primaryColor}
          onFontChange={(font) => setLocalResume({ ...localResume, theme: { ...localResume.theme, font } })}
          onColorChange={(primaryColor) => setLocalResume({ ...localResume, theme: { ...localResume.theme, primaryColor } })}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r bg-white overflow-y-auto">
          <div className="p-4">
            <FormPanel resume={localResume} setResume={setLocalResume} />
          </div>
        </div>
        <div className="w-1/2 bg-gray-100 overflow-y-auto">
          <div className="p-6">
            <ResumePreview resume={localResume} />
          </div>
        </div>
      </div>
    </div>
  );
};
