import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Trash2, MessageSquare, X, Scale, LogOut } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";

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
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/');
    };

    const Logo = () => (
        <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-amber-500/20 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:bg-amber-500/20 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 shrink-0">
                <Scale className="w-[18px] h-[18px] text-amber-400 cursor-pointer" strokeWidth={2} />
            </div>
            <span className="font-heading font-extrabold text-xl text-white tracking-wide">
                Case<span className="text-amber-500">X</span>
            </span>
        </div>
    );

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-10 px-4 gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/[0.07] flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-slate-400 text-xs text-center leading-relaxed">
                No sessions yet.<br />Start a new chat.
            </p>
        </div>
    );

    const renderSessionList = (expanded) => (
        <div className="flex-1 overflow-y-auto relative py-2 px-2 space-y-1">
            {sessions.length === 0 && expanded && <EmptyState />}
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
                                {session.name || 'New Document Chat'}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteSession(session.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-colors p-1 shrink-0 ml-1 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
                            {(session.name || 'N').substring(0, 2).toUpperCase()}
                        </div>
                    )}
                </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        </div>
    );

    const renderLogoutButton = (expanded) => (
        <div className="p-3 shrink-0 border-t border-white/[0.12] mt-auto">
            <button
                onClick={handleLogout}
                className={`group cursor-pointer flex items-center rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] ${
                    expanded ? 'px-3 py-2.5 w-full gap-3' : 'py-2 justify-center w-full'
                }`}
                title="Logout"
            >
                <LogOut className="w-[18px] h-[18px] shrink-0" />
                {expanded && <span className="text-sm font-sans font-medium">Log out</span>}
            </button>
        </div>
    );

    return (
        <>
            <aside
                className={`hidden md:flex flex-col fixed left-0 top-0 h-screen z-40 bg-slate-900 border-r border-white/[0.12] transition-all duration-300 ease-out ${
                    isExpanded ? 'w-[260px]' : 'w-[60px]'
                }`}
            >
                <div className="h-16 flex items-center justify-between px-3 border-b border-white/[0.12] shrink-0">
                    {isExpanded && <Logo />}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center shrink-0 transition-colors duration-200 mx-auto cursor-pointer"
                    >
                        <ChevronRight className={`text-amber-400 w-[18px] h-[18px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="p-3 shrink-0 border-b border-white/[0.12]">
                    {isExpanded ? (
                        <button
                            onClick={createNewSession}
                            style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
                            className="w-full h-9 rounded-xl font-heading font-bold px-4 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:brightness-110 transition-all duration-200 cursor-pointer"
                        >
                            <Plus className="w-4 h-4 shrink-0" />
                            <span>New Chat</span>
                        </button>
                    ) : (
                        <button
                            onClick={createNewSession}
                            className="w-9 h-9 mx-auto rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                        >
                            <Plus className="text-amber-400 w-[18px] h-[18px]" />
                        </button>
                    )}
                </div>

                {renderSessionList(isExpanded)}
                {renderLogoutButton(isExpanded)}
            </aside>

            <div
                className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer md:hidden ${
                    isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileOpen(false)}
            />

            <aside
                className={`fixed top-0 left-0 h-screen w-[260px] bg-slate-900 border-r border-white/[0.12] z-50 flex flex-col md:hidden transform transition-transform duration-300 ease-out ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.12] shrink-0">
                    <Logo />
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/15 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                    >
                        <X className="text-amber-400 w-[18px] h-[18px]" />
                    </button>
                </div>

                <div className="p-3 shrink-0 border-b border-white/[0.12]">
                    <button
                        onClick={() => {
                            createNewSession();
                            setIsMobileOpen(false);
                        }}
                        style={{ backgroundColor: '#f59e0b', color: '#0f172a' }}
                        className="w-full h-9 rounded-xl font-heading font-bold px-4 flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.2)] hover:brightness-110 transition-all duration-200 cursor-pointer"
                    >
                        <Plus className="w-4 h-4 shrink-0" />
                        <span>New Chat</span>
                    </button>
                </div>

                {renderSessionList(true)}
                {renderLogoutButton(true)}
            </aside>
        </>
    );
};

export default Sidebar;