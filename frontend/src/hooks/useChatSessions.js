import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useChatSessions() {
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);

    const fetchSessions = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('chat_sessions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            setSessions(data || []);
            if (data && data.length > 0 && !activeSessionId) {
                setActiveSessionId(data[0].id);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error.message);
        }
    }, [activeSessionId]);

    const createNewSession = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No authenticated user");

            const { data, error } = await supabase
                .from('chat_sessions')
                .insert([{ user_id: user.id, name: 'New Document Chat' }])
                .select()
                .single();

            if (error) throw error;

            setSessions(prev => [data, ...prev]);
            setActiveSessionId(data.id);
        } catch (error) {
            console.error('Error creating session:', error.message);
        }
    }, []);

    const deleteSession = useCallback(async (id) => {
        try {
            const { error } = await supabase
                .from('chat_sessions')
                .delete()
                .eq('id', id);

            if (error) throw error;

            const filtered = sessions.filter(session => session.id !== id);
            setSessions(filtered);
            if (activeSessionId === id) {
                setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
            }
        } catch (error) {
            console.error('Error deleting session:', error.message);
        }
    }, [activeSessionId, sessions]);

    const setActive = useCallback((id) => {
        setActiveSessionId(id);
    }, []);

    return {
        sessions,
        activeSessionId,
        fetchSessions,
        createNewSession,
        deleteSession,
        setActive,
    };
}