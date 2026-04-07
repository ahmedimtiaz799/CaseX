import React, { useState, useRef } from 'react';
import { Paperclip, Send, X } from 'lucide-react';

const FileUploadBar = ({ onSendMessage, onUploadSuccess, token, isLoading, sidebarWidth = 0, hasSession }) => {
    const [text, setText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const showToast = (message, isError = false) => {
        setToast({ message, isError });
        setTimeout(() => setToast(null), 3000);
    };

    const handleInput = (e) => {
        setText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 116)}px`;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (!text.trim() || isLoading || isUploading || !hasSession) return;
        onSendMessage(text, selectedFile);
        setText('');
        setSelectedFile(null);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            showToast('Only PDF files are allowed.', true);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setSelectedFile(file);
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${apiUrl}/api/v1/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            onUploadSuccess(data.session_id);
            showToast('Document uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            setSelectedFile(null);
            showToast('Upload failed. Please try again.', true);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const inputDisabled = isLoading || isUploading;
    const sendDisabled = inputDisabled || !text.trim() || !hasSession;

    return (
        <>
            {toast && (
                <div className={`fixed top-4 right-4 z-[60] bg-slate-900 border text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg ${
                    toast.isError
                        ? 'border-red-500/30 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                        : 'border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                }`}>
                    {toast.message}
                </div>
            )}

            <div
                className="fixed bottom-0 right-0 z-50 bg-slate-900 border-t border-white/[0.12] shadow-[0_-4px_24px_rgba(0,0,0,0.4)] py-5 transition-all duration-300 ease-out"
                style={{ width: `calc(100% - ${sidebarWidth}px)` }}
            >
                {selectedFile && (
                    <div className="flex items-center gap-2 mb-2 w-full max-w-2xl mx-auto px-6">
                        <div className="flex items-center bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium">
                            <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="ml-2 text-amber-500/60 hover:text-amber-400 focus:outline-none"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 w-full max-w-2xl mx-auto px-6">
                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />

                    <div className="flex-1 flex items-center bg-slate-950 border border-white/[0.08] rounded-xl focus-within:border-amber-500/40 focus-within:ring-2 focus-within:ring-amber-500/15 transition-all duration-200 min-h-[44px]">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={inputDisabled}
                            className="shrink-0 w-9 h-9 ml-1 rounded-lg hover:bg-amber-500/10 flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            <Paperclip className="text-slate-400 group-hover:text-amber-400 w-[18px] h-[18px]" />
                        </button>

                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            disabled={inputDisabled}
                            placeholder={hasSession ? 'Ask about your document…' : 'Upload a PDF document to start…'}
                            className="flex-1 min-h-[44px] bg-transparent font-sans text-sm text-slate-200 placeholder-slate-400 px-3 py-[11px] resize-none outline-none disabled:opacity-50"
                            rows={1}
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={sendDisabled}
                        style={
                            isLoading
                                ? { backgroundColor: 'transparent' }
                                : { backgroundColor: '#f59e0b', color: '#0f172a' }
                        }
                        className={`shrink-0 font-heading font-bold text-sm px-5 h-[44px] rounded-xl transition-all duration-200 flex items-center justify-center min-w-[44px]
                            ${!sendDisabled ? 'cursor-pointer shadow-[0_0_16px_rgba(245,158,11,0.25)] hover:shadow-[0_0_24px_rgba(245,158,11,0.4)] hover:brightness-110' : 'opacity-50 cursor-not-allowed shadow-none'}
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default FileUploadBar;