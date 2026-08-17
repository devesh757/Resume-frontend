import React, { useRef, useState } from 'react';
import { Resume } from '../../types';
import { useResume } from '../../hooks/useResume';
import { useNavigate } from 'react-router-dom';
import { Edit, Copy, Trash2, Download, FileText, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { TemplateThumb } from '../common/TemplateThumb';
import { TEMPLATES } from '../../utils/constants';
import { ResumePreview } from '../builder/PreviewPanel/ResumePreview';
import appCss from '../../index.css?inline';

export const ResumeCard: React.FC<{ resume: Resume }> = ({ resume }) => {
  const { deleteResume, duplicateResume } = useResume();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const templateName = TEMPLATES.find((t) => t.id === resume.template)?.name ?? resume.template;

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const html = previewRef.current?.innerHTML ?? '';
      const response = await api.post(
        `/resumes/${resume._id}/pdf`,
        { html, css: appCss },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resume.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete "${resume.title}"? This cannot be undone.`)) {
      await deleteResume(resume._id);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition group">
      <div className="hidden" ref={previewRef}>
        <ResumePreview resume={resume} />
      </div>
      <button
        onClick={() => navigate(`/builder/${resume._id}`)}
        className="block w-full h-44 bg-gray-50 relative group-hover:scale-[1.02] transition"
        title="Open in builder"
      >
        <TemplateThumb template={resume.template} />
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[10px] font-medium text-gray-600 px-2 py-0.5 rounded-full shadow">
          {templateName}
        </span>
      </button>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate flex items-center gap-1.5">
              <FileText size={14} className="text-gray-400 shrink-0" /> {resume.title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Updated {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-1 mt-3 border-t border-gray-100 pt-3">
          <button
            onClick={() => navigate(`/builder/${resume._id}`)}
            className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-xs text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition"
          >
            <Edit size={14} /> Edit
          </button>
          <button
            onClick={() => duplicateResume(resume._id)}
            className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition"
            title="Duplicate"
          >
            <Copy size={14} /> Copy
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-100 transition disabled:opacity-60"
            title="Download PDF"
          >
            {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} PDF
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-1 p-1.5 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};