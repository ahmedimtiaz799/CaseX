import React from 'react';
import { ChevronRight, Plus, Trash2, MessageSquare, X, Scale } from 'lucide-react';

const Sidebar = ({
    sessions = [],
    activeSessionId,
    createNewSession,
    deleteSession,
    setActive,
    isExpanded,
    setIsExpanded,
    isMobileOpen,
    setIsMobileOpen
}) => {

    const Logo = () => (
        <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] shrink-0">
                <Scale className="w-[18px] h-[18px] text-amber-400" strokeWidth={2} />
            </div>
            <span className="font-heading font-extrabold text-xl text-white tracking-wide">
                Case<span className="text-amber-500">X</span>
            </span>
        </div>
    );

    const renderSessionList = (expanded) => (
        <div className="flex-1 overflow-y-auto relative py-2 px-2 space-y-1">
            {sessions.length === 0 && expanded && (
                <p className="text-slate-500 text-xs text-center px-4 py-6">No sessions yet</p>
            )}
            {sessions.map((session) => (
                <div
                    key={session.id}
                    onClick={() => {
                        setActive(session.id);
                        if (window.innerWidth < 768) setIsMobileOpen(false);
                    }}
                    className={`group cursor-pointer flex items-center rounded-lg transition-colors duration-200 ${
                        activeSessionId === session.id
                            ? 'bg-amber-500/10 border-l-2 border-amber-500 text-white font-semibold'
                            : 'text-slate-300 hover:bg-white/[0.05] border-l-2 border-transparent'
                    } ${expanded ? 'px-3 py-2.5' : 'py-2 justify-center'}`}
                >
                    {expanded ? (
                        <>
                            <MessageSquare className="w-4 h-4 mr-3 opacity-70 shrink-0" />
                            <span className="flex-1 text-sm max-w-[160px] truncate">
                                {session.name || "New Document Chat"}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSession(session.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-colors p-1 shrink-0 ml-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                            {(session.name || "N").substring(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        </div>
    );

    return (
        <>
            <aside
                className={`hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 bg-slate-900 border-r border-white/[0.07] transition-all duration-300 ease-out ${
                    isExpanded ? 'w-[260px]' : 'w-[60px]'
                }`}
            >
                <div className="h-16 flex items-center justify-between px-3 border-b border-white/[0.07] shrink-0">
                    {isExpanded && <Logo />}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center shrink-0 transition-colors duration-200 mx-auto"
                    >
                        <ChevronRight className={`text-amber-400 w-[18px] h-[18px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="p-3 shrink-0 border-b border-white/[0.07]">
                    {isExpanded ? (
                        <button
                            onClick={createNewSession}
                            style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
                            className="w-full h-9 rounded-xl font-heading font-bold px-4 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:brightness-110 transition-all duration-200"
                        >
                            <Plus className="w-4 h-4 shrink-0" />
                            <span>New Chat</span>
                        </button>
                    ) : (
                        <button
                            onClick={createNewSession}
                            className="w-9 h-9 mx-auto rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center transition-colors duration-200"
                        >
                            <Plus className="text-amber-400 w-[18px] h-[18px]" />
                        </button>
                    )}
                </div>

                {renderSessionList(isExpanded)}
            </aside>

            <div
                className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
                    isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileOpen(false)}
            />

            <aside
                className={`fixed top-0 left-0 h-screen w-[260px] bg-slate-900 border-r border-white/[0.07] z-50 flex flex-col md:hidden transform transition-transform duration-300 ease-out ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.07] shrink-0">
                    <Logo />
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center transition-colors duration-200"
                    >
                        <X className="text-amber-400 w-[18px] h-[18px]" />
                    </button>
                </div>

                <div className="p-3 shrink-0 border-b border-white/[0.07]">
                    <button
                        onClick={() => {
                            createNewSession();
                            setIsMobileOpen(false);
                        }}
                        style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
                        className="w-full h-9 rounded-xl font-heading font-bold px-4 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:brightness-110 transition-all duration-200"
                    >
                        <Plus className="w-4 h-4 shrink-0" />
                        <span>New Chat</span>
                    </button>
                </div>

                {renderSessionList(true)}
            </aside>
        </>
    );
};

export default Sidebar;