import React, { createContext, useState, ReactNode, useCallback } from 'react';
import api from '../services/api';
import { Resume } from '../types';

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  loading: boolean;
  fetchResumes: () => Promise<void>;
  fetchResume: (id: string) => Promise<void>;
  createResume: (data: Partial<Resume>) => Promise<Resume>;
  updateResume: (id: string, data: Partial<Resume>) => Promise<Resume>;
  deleteResume: (id: string) => Promise<void>;
  duplicateResume: (id: string) => Promise<Resume>;
  setCurrentResume: (resume: Resume | null) => void;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const normalizeResume = (resume: unknown): Resume | null => {
  if (!isRecord(resume) || typeof resume._id !== 'string') return null;
  return {
    ...(resume as unknown as Resume),
    workExperience: asArray((resume as Record<string, unknown>).workExperience),
    education: asArray((resume as Record<string, unknown>).education),
    skills: asArray((resume as Record<string, unknown>).skills),
    projects: asArray((resume as Record<string, unknown>).projects),
    customSections: asArray((resume as Record<string, unknown>).customSections),
    personalInfo: isRecord((resume as Record<string, unknown>).personalInfo)
      ? (resume as Record<string, unknown>).personalInfo as Resume['personalInfo']
      : { firstName: '', lastName: '', email: '', phone: '' },
    order: isRecord((resume as Record<string, unknown>).order)
      ? (resume as Record<string, unknown>).order as Resume['order']
      : { workExperience: 0, education: 1, skills: 2, projects: 3, customSections: 4 },
    theme: isRecord((resume as Record<string, unknown>).theme)
      ? (resume as Record<string, unknown>).theme as Resume['theme']
      : { font: 'Inter', primaryColor: '#3b82f6' },
  };
};

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/resumes');
      setResumes(asArray(data).map(normalizeResume).filter((r): r is Resume => r !== null));
    } catch {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchResume = useCallback(async (id: string) => {
    try {
      const { data } = await api.get(`/resumes/${id}`);
      setCurrentResume(normalizeResume(data));
    } catch {
      setCurrentResume(null);
    }
  }, []);

  const createResume = useCallback(async (data: Partial<Resume>) => {
    const { data: newResume } = await api.post('/resumes', data);
    const normalized = normalizeResume(newResume);
    if (normalized) setResumes(prev => [normalized, ...prev]);
    return normalized ?? (newResume as Resume);
  }, []);

  const updateResume = useCallback(async (id: string, data: Partial<Resume>) => {
    const { data: updated } = await api.put(`/resumes/${id}`, data);
    const normalized = normalizeResume(updated);
    if (normalized) setResumes(prev => prev.map(r => r._id === id ? normalized : r));
    return normalized ?? (updated as Resume);
  }, []);

  const deleteResume = useCallback(async (id: string) => {
    await api.delete(`/resumes/${id}`);
    setResumes(prev => prev.filter(r => r._id !== id));
    setCurrentResume(prev => (prev?._id === id ? null : prev));
  }, []);

  const duplicateResume = useCallback(async (id: string) => {
    const { data } = await api.post(`/resumes/${id}/duplicate`);
    const normalized = normalizeResume(data);
    if (normalized) setResumes(prev => [normalized, ...prev]);
    return normalized ?? (data as Resume);
  }, []);

  return (
    <ResumeContext.Provider value={{
      resumes,
      currentResume,
      loading,
      fetchResumes,
      fetchResume,
      createResume,
      updateResume,
      deleteResume,
      duplicateResume,
      setCurrentResume,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
