import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Sparkles, Palette, Download } from 'lucide-react';

const features = [
  { icon: Sparkles, text: '15 beautiful templates to choose from' },
  { icon: Palette, text: 'Customize fonts, colors and section order' },
  { icon: Download, text: 'One-click PDF export, ATS friendly' },
];

export const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 text-white flex-col justify-between p-12">
        <div className="flex items-center gap-2 text-lg font-bold">
          <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <FileText size={20} />
          </span>
          Resume Builder
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Create your resume
            <br />
            in minutes
          </h1>
          <ul className="space-y-3 mt-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3 text-white/90">
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <f.icon size={16} />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-white/60 text-sm">© 2026 Resume Builder</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center text-lg font-bold text-gray-800">
            <span className="w-9 h-9 rounded-xl bg-primary-600 text-white flex items-center justify-center">
              <FileText size={20} />
            </span>
            Resume Builder
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Create your account</h2>
            <p className="text-sm text-gray-500 mb-6">Free forever. No credit card required</p>
            {error && <p className="text-red-500 text-sm mb-4 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
              minLength={6}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-xl font-medium transition disabled:opacity-50"
            >
              {submitting ? 'Creating account...' : 'Sign Up'}
            </button>
            <p className="text-sm text-gray-500 text-center mt-5">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:underline font-medium">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
