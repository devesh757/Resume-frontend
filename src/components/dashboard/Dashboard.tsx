import React, { useEffect } from 'react';
import { useResume } from '../../hooks/useResume';
import { useAuth } from '../../hooks/useAuth';
import { ResumeCard } from './ResumeCard';
import { Plus, LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { resumes, loading, fetchResumes, createResume } = useResume();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreate = async () => {
    const newResume = await createResume({
      title: 'Untitled Resume',
      template: 'minimalist',
      theme: { font: 'Inter', primaryColor: '#3b82f6' },
    });
    navigate(`/builder/${newResume._id}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // clear local state and navigate even if the server call fails
    } finally {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
              <FileText size={18} />
            </span>
            <span className="font-bold text-gray-800">Resume Builder</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-500 hidden sm:block">
                Welcome, <span className="font-medium text-gray-700">{user.name}</span>
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Resumes</h1>
            <p className="text-sm text-gray-500 mt-1">
              {resumes.length === 0
                ? 'Create your first resume to get started'
                : `${resumes.length} resume${resumes.length > 1 ? 's' : ''} created`}
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-primary-200 transition"
          >
            <Plus size={18} /> New Resume
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No resumes yet</p>
            <p className="text-sm text-gray-400 mt-1 mb-6">Choose from 15 templates and build your resume in minutes</p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
            >
              <Plus size={18} /> Create your first resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume._id} resume={resume} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
