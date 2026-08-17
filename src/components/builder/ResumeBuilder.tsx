import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../hooks/useResume';
import { FormPanel } from './FormPanel/FormPanel';
import { ResumePreview } from './PreviewPanel/ResumePreview';
import { TemplatePicker, ThemeControls } from './TemplatePicker';
import { useDebounce } from '../../hooks/useDebounce';
import { ArrowLeft, Download, Check, Loader2, PenLine, Eye } from 'lucide-react';
import api from '../../services/api';
import { Resume } from '../../types';
import appCss from '../../index.css?inline';

type SaveState = 'idle' | 'saving' | 'saved';
type Panel = 'form' | 'preview';

export const ResumeBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentResume, fetchResume, updateResume } = useResume();
  const [localResume, setLocalResume] = useState<Resume | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [activePanel, setActivePanel] = useState<Panel>('form');
  const [downloading, setDownloading] = useState(false);
  const debouncedResume = useDebounce(localResume, 800);
  const savingRef = useRef(false);
  const previewRef = useRef<HTMLDivElement>(null);

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
    if (!localResume || downloading) return;
    setDownloading(true);
    try {
      const html = previewRef.current?.innerHTML ?? '';
      const response = await api.post(
        `/resumes/${localResume._id}/pdf`,
        { html, css: appCss },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${localResume.title || 'resume'}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  if (!localResume) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-primary-600" size={32} />
      </div>
    );
  }

  const panelTabClass = (panel: Panel) =>
    `flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition border-b-2 ${
      activePanel === panel
        ? 'text-primary-600 border-primary-600'
        : 'text-gray-500 border-transparent hover:text-gray-700'
    }`;

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-50">
      <header className="bg-white border-b px-3 sm:px-4 py-3 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 shrink-0"
            title="Back to dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <input
            type="text"
            value={localResume.title}
            onChange={(e) => setLocalResume({ ...localResume, title: e.target.value })}
            className="text-base sm:text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary-500 focus:outline-none min-w-0 w-36 sm:w-56"
          />
          <span className="hidden sm:flex text-xs text-gray-400 items-center gap-1 shrink-0">
            {saveState === 'saving' && <><Loader2 size={12} className="animate-spin" /> Saving...</>}
            {saveState === 'saved' && <><Check size={12} className="text-green-500" /> Saved</>}
          </span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition shrink-0"
        >
          {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          <span className="hidden sm:inline">{downloading ? 'Preparing…' : 'Download PDF'}</span>
        </button>
      </header>

      <div className="bg-white border-b px-3 sm:px-4 py-3 space-y-3 shrink-0">
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

      <div className="md:hidden flex border-b bg-white shrink-0">
        <button className={panelTabClass('form')} onClick={() => setActivePanel('form')}>
          <PenLine size={15} /> Form
        </button>
        <button className={panelTabClass('preview')} onClick={() => setActivePanel('preview')}>
          <Eye size={15} /> Preview
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <div
          className={`${activePanel === 'form' ? 'flex' : 'hidden'} md:flex md:w-1/2 border-r bg-white overflow-y-auto flex-col`}
        >
          <div className="p-4">
            <FormPanel resume={localResume} setResume={setLocalResume} />
          </div>
        </div>
        <div
          className={`${activePanel === 'preview' ? 'flex' : 'hidden'} md:flex md:w-1/2 bg-gray-100 overflow-y-auto flex-col`}
        >
          <div className="p-4 md:p-6 flex-1">
            <div
              ref={previewRef}
              className="mx-auto"
              style={{ width: '794px', maxWidth: '100%' }}
            >
              <ResumePreview resume={localResume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};