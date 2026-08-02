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

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    const { data } = await api.get('/resumes');
    setResumes(data);
    setLoading(false);
  }, []);

  const fetchResume = useCallback(async (id: string) => {
    const { data } = await api.get(`/resumes/${id}`);
    setCurrentResume(data);
  }, []);

  const createResume = useCallback(async (data: Partial<Resume>) => {
    const { data: newResume } = await api.post('/resumes', data);
    setResumes(prev => [newResume, ...prev]);
    return newResume;
  }, []);

  const updateResume = useCallback(async (id: string, data: Partial<Resume>) => {
    const { data: updated } = await api.put(`/resumes/${id}`, data);
    setResumes(prev => prev.map(r => r._id === id ? updated : r));
    return updated;
  }, []);

  const deleteResume = useCallback(async (id: string) => {
    await api.delete(`/resumes/${id}`);
    setResumes(prev => prev.filter(r => r._id !== id));
    setCurrentResume(prev => (prev?._id === id ? null : prev));
  }, []);

  const duplicateResume = useCallback(async (id: string) => {
    const { data } = await api.post(`/resumes/${id}/duplicate`);
    setResumes(prev => [data, ...prev]);
    return data;
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
