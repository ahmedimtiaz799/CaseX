import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (activeTab === 'signup') {
        if (password.length < 8) {
          throw new Error('Password must be at least 8 characters long.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        const { error } = await signUp(email, password);
        if (error) throw error;
        navigate('/chat');
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/chat');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-y-auto">
      <div
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}
      />

      <div
        style={{
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.10) 0%, transparent 65%)',
          position: 'fixed',
          top: '10%',
          right: '-100px',
          width: '600px',
          height: '600px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 65%)',
          position: 'fixed',
          bottom: '0',
          left: '-150px',
          width: '500px',
          height: '500px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
        <div
          className="bg-slate-900 rounded-2xl p-8 w-full max-w-md relative z-10"
          style={{
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,158,11,0.15)',
          }}
        >
          <div className="mb-6">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ backgroundColor: 'rgba(245,158,11,0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
              {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
            </div>
            <h2 className="text-white text-2xl font-heading font-bold">
              {activeTab === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-slate-400 text-sm font-sans mt-1">
              {activeTab === 'signin'
                ? 'Sign in to access your CaseX workspace.'
                : 'Get started with CaseX for free today.'}
            </p>
          </div>

          <div
            className="grid grid-cols-2 rounded-xl p-1 mb-6 border border-white/[0.07]"
            style={{ backgroundColor: '#020617' }}
          >
            <button
              type="button"
              onClick={() => { setActiveTab('signin'); setError(''); }}
              className="h-9 rounded-lg text-sm font-heading font-semibold transition-all duration-200"
              style={
                activeTab === 'signin'
                  ? { backgroundColor: '#334155', color: '#ffffff', cursor: 'pointer' }
                  : { backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer' }
              }
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setError(''); }}
              className="h-9 rounded-lg text-sm font-heading font-semibold transition-all duration-200"
              style={
                activeTab === 'signup'
                  ? { backgroundColor: '#334155', color: '#ffffff', cursor: 'pointer' }
                  : { backgroundColor: 'transparent', color: '#94a3b8', cursor: 'pointer' }
              }
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium font-sans mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-slate-950 border border-white/[0.10] rounded-xl text-slate-200 text-sm px-4 h-11 w-full placeholder-slate-400 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/15 transition-all duration-200"
                style={{ cursor: 'text' }}
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium font-sans mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-slate-950 border border-white/[0.10] rounded-xl text-slate-200 text-sm px-4 h-11 w-full placeholder-slate-400 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/15 transition-all duration-200"
                style={{ cursor: 'text' }}
              />
            </div>

            {activeTab === 'signup' && (
              <div>
                <label className="block text-slate-300 text-sm font-medium font-sans mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-950 border border-white/[0.10] rounded-xl text-slate-200 text-sm px-4 h-11 w-full placeholder-slate-400 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/15 transition-all duration-200"
                  style={{ cursor: 'text' }}
                />
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 font-sans">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: '#f59e0b',
                color: '#0f172a',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                lineHeight: '1',
              }}
              className="h-11 w-full rounded-xl font-heading font-bold text-sm hover:brightness-110 transition-all duration-200 shadow-[0_0_24px_rgba(245,158,11,0.3)] hover:shadow-[0_0_36px_rgba(245,158,11,0.45)] mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full animate-spin border-2 border-slate-900/30 border-t-slate-900" />
              ) : activeTab === 'signin' ? (
                <>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 shrink-0" />
                  Create Account
                </>
              )}
            </button>

            {activeTab === 'signin' && (
              <p className="text-center text-slate-500 text-xs font-sans pt-1">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setError(''); }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200"
                  style={{ cursor: 'pointer' }}
                >
                  Sign up for free
                </button>
              </p>
            )}

            {activeTab === 'signup' && (
              <p className="text-center text-slate-500 text-xs font-sans pt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setError(''); }}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200"
                  style={{ cursor: 'pointer' }}
                >
                  Sign in instead
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}