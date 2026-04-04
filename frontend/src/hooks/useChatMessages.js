import { useState, useCallback } from "react";

export function useChatMessages() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = useCallback(async (sessionId, text) => {
        const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: text,
            sources: []
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/v1/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, text }),
            });
            if (!response.ok) {
                throw new Error("Failed to process message");
            }
            const data = await response.json();
            const aiMessage = {
                id: crypto.randomUUID(),
                role: 'ai',
                content: data.content,
                sources: data.sources || []
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error("Chat Error", err);
            setError('Failed to reach CaseX servers. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

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
    };
}