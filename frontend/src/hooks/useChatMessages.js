import { useState, useCallback } from "react";
import { supabase } from '../lib/supabaseClient';

export function useChatMessages() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMessages = useCallback(async (sessionId) => {
        if (!sessionId) return;
        
        try {
            const { data, error: fetchError } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('session_id', sessionId)
                .order('created_at', { ascending: true });

            if (fetchError) throw fetchError;
            setMessages(data || []);
        } catch (err) {
            console.error('Error fetching messages:', err.message);
            setError('Failed to load chat history.');
        }
    }, []);

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
            const { error: dbError } = await supabase
                .from('chat_messages')
                .insert([{ session_id: sessionId, role: 'user', content: text }]);

            if (dbError) throw dbError;

            const { data: { session } } = await supabase.auth.getSession();

            const response = await fetch('http://localhost:8000/api/v1/chat', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.access_token}`
                },
                body: JSON.stringify({ session_id: sessionId, message: text }),
            });

            if (!response.ok) {
                throw new Error("Failed to process message");
            }
            
            const data = await response.json();
            const aiContent = data.reply || data.content;

            const { data: aiMessage, error: aiDbError } = await supabase
                .from('chat_messages')
                .insert([{
                    session_id: sessionId,
                    role: 'assistant',
                    content: aiContent,
                    sources: data.sources || []
                }])
                .select()
                .single();

            if (aiDbError) throw aiDbError;

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
        fetchMessages,
        sendMessage,
        clearMessages,
    };
}