import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

       
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">⚖️</span>
          <span className="font-heading font-bold text-xl text-amber-500 tracking-wide">
            CaseX
          </span>
        </div>

        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-white hover:text-amber-400 transition-colors font-sans text-sm font-medium">
            Features
          </a>
          <a href="#how-it-works" className="text-white hover:text-amber-400 transition-colors font-sans text-sm font-medium">
            How It Works
          </a>
          <a href="#testimonials" className="text-white hover:text-amber-400 transition-colors font-sans text-sm font-medium">
            Testimonials
          </a>
        </div>

        
        <div className="hidden md:block">
          <Button
            onClick={() => window.location.href = '/login'}
            className="bg-amber-500 text-slate-900 hover:bg-amber-400 ring-1 ring-amber-500/50 font-sans font-medium transition-all h-10 px-6 text-sm cursor-pointer"
          >
            Login
          </Button>
        </div>

       
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-amber-400 focus:outline-none transition-colors"
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
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 flex flex-col gap-4 shadow-xl">
          <a href="#features" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 transition-colors font-sans text-base font-medium block">
            Features
          </a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 transition-colors font-sans text-base font-medium block">
            How It Works
          </a>
          <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-white hover:text-amber-400 transition-colors font-sans text-base font-medium block">
            Testimonials
          </a>
          
          
          <Button
            onClick={() => window.location.href = '/login'}
            className="bg-amber-500 text-slate-900 hover:bg-amber-400 ring-1 ring-amber-500/50 font-sans font-medium w-full mt-2 h-10 text-sm cursor-pointer"
          >
            Login
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;