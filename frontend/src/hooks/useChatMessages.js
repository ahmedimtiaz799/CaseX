import { useState, useCallback } from "react";

export function useChatMessages(token) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchMessages = useCallback(async (sessionId) => {
        if (!sessionId) return;
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/api/v1/sessions/${sessionId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error("Failed to fetch messages");
            const data = await response.json();
            const formatted = (data.messages || []).map((msg) => ({
                id: msg.id || crypto.randomUUID(),
                session_id: msg.session_id,
                role: msg.role,
                content: msg.content,
                sources: msg.sources || []
            }));
            setMessages(formatted);
        } catch (err) {
            console.error("Fetch Messages Error", err);
            setError('Failed to load messages.');
        } finally {
            setIsLoading(false);
        }
    }, [token, apiUrl]);

    const sendMessage = useCallback(async (sessionId, text) => {
        if (!text.trim() || !sessionId) return;

        const optimisticUserMsg = {
            id: crypto.randomUUID(),
            session_id: sessionId,
            role: 'user',
            content: text,
            sources: []
        };

        setMessages(prev => [...prev, optimisticUserMsg]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${apiUrl}/api/v1/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ session_id: sessionId, message: text }),
            });

            if (!response.ok) throw new Error("Failed to process message");

            const data = await response.json();

            const aiMessage = {
                id: crypto.randomUUID(),
                session_id: sessionId,
                role: 'assistant',
                content: data.reply,
                sources: data.sources || []
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error("Chat Error", err);
            setError('Failed to reach CaseX servers. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [token, apiUrl]);

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearMessages,
        fetchMessages,
    };
}