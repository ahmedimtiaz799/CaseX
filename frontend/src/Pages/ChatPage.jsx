import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChatSessions } from '../hooks/useChatSessions';
import { useChatMessages } from '../hooks/useChatMessages';
import Sidebar from '../components/chat/Sidebar';
import MessageBubble from '../components/chat/MessageBubble';
import SuggestionCards from '../components/chat/SuggestionCards';
import FileUploadBar from '../components/chat/FileUploadBar';

const ChatPage = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const messagesEndRef = useRef(null);

    const { token } = useAuth();

    const {
        sessions,
        activeSessionId,
        fetchSessions,
        deleteSession,
        setActive
    } = useChatSessions(token);

    const {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        fetchMessages
    } = useChatMessages(token);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (token) fetchSessions();
    }, [token, fetchSessions]);

    useEffect(() => {
        if (activeSessionId) {
            fetchMessages(activeSessionId);
        } else {
            clearMessages();
        }
    }, [activeSessionId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const handleUploadSuccess = (sessionId) => {
        setActive(sessionId);
        fetchSessions();
    };

    const handleNewChat = () => {
        setActive(null);
        clearMessages();
    };

    const handleSendMessage = (text) => {
        if (!activeSessionId) return;
        sendMessage(activeSessionId, text);
    };

    const currentSidebarWidth = isMobile ? 0 : (isExpanded ? 260 : 60);

    return (
        <div className="flex h-screen bg-slate-950 overflow-hidden font-sans relative">

            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.13,
                    transform: 'translateZ(0)',
                }}
            />

            <Sidebar
                sessions={sessions}
                activeSessionId={activeSessionId}
                onNewChat={handleNewChat}
                deleteSession={deleteSession}
                setActive={setActive}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            <main
                className="flex flex-col flex-1 relative z-10 h-screen transition-all duration-300 ease-out"
                style={{ marginLeft: `${currentSidebarWidth}px` }}
            >
                <div className="md:hidden h-16 border-b border-white/[0.07] bg-slate-900 flex items-center px-4 shrink-0 z-20">
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center hover:bg-amber-500/15 transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="ml-4 font-heading font-bold text-white tracking-wide">
                        Case<span className="text-amber-500">X</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-scroll px-4 py-6 md:px-8 md:py-10 pb-32">
                    <div className="max-w-4xl mx-auto w-full flex flex-col min-h-full">

                        {error && (
                            <div className="mb-6 bg-slate-900 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                {error}
                            </div>
                        )}

                        {messages.length === 0 ? (
                            <SuggestionCards onSendMessage={handleSendMessage}
                            hasSession={!!activeSessionId} />
                        ) : (
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                    />
                                ))}

                                {isLoading && (
                                    <div className="flex justify-start items-end gap-2 mb-6">
                                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="text-amber-400 w-3.5 h-3.5" />
                                        </div>
                                        <div className="bg-slate-800 border border-white/[0.08] rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5 h-[42px]">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} className="h-4 w-full" />
                            </div>
                        )}
                    </div>
                </div>

                <FileUploadBar
                    onSendMessage={handleSendMessage}
                    onUploadSuccess={handleUploadSuccess}
                    token={token}
                    isLoading={isLoading}
                    sidebarWidth={currentSidebarWidth}
                    hasSession={!!activeSessionId}
                />
            </main>
        </div>
    );
};

export default ChatPage;