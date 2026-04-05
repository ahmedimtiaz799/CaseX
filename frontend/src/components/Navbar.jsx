import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  const handleLogout = async () => {
    await signOut();
    navigate('/');
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="/" className="flex items-center gap-2.5 group cursor-pointer select-none">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:bg-amber-500/20 group-hover:border-amber-500/30 transition-all duration-300">
            <Scale className="w-[18px] h-[18px] text-amber-400" strokeWidth={2} />
          </div>
          <span className="font-heading font-extrabold text-xl text-white tracking-wide">
            Case<span className="text-amber-500">X</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="px-4 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-sans text-sm font-medium"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="px-4 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-sans text-sm font-medium"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="px-4 py-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 font-sans text-sm font-medium"
          >
            Testimonials
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              onClick={handleLogout}
              style={{ color: '#f59e0b' }}
              className="text-sm font-semibold border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10 px-4 h-9 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          ) : !isLoginPage && (
            <Button
              onClick={handleLoginClick}
              style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
              className="font-sans font-semibold transition-all px-5 py-2 h-auto rounded-md text-sm cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:brightness-110"
            >
              Login
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-300 hover:text-white focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/[0.08] px-6 py-4 flex flex-col gap-4 shadow-xl">
          <a
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
            className="text-slate-300 hover:text-white transition-colors font-sans text-base font-medium block"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="text-slate-300 hover:text-white transition-colors font-sans text-base font-medium block"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            onClick={(e) => handleNavClick(e, 'testimonials')}
            className="text-slate-300 hover:text-white transition-colors font-sans text-base font-medium block"
          >
            Testimonials
          </a>

          {user ? (
            <button
              onClick={handleLogout}
              style={{ color: '#f59e0b' }}
              className="text-sm font-semibold border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10 w-full mt-2 h-10 rounded-lg transition-all duration-200"
            >
              Logout
            </button>
          ) : !isLoginPage && (
            <Button
              onClick={handleLoginClick}
              style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
              className="font-sans font-semibold w-full mt-2 h-10 text-sm shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:brightness-110 cursor-pointer"
            >
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;