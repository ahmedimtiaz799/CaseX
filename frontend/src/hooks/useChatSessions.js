import { useState, useCallback } from 'react';

export function useChatSessions() {
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);

    const fetchSessions = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/sessions');
            if (!response.ok) throw new Error('Failed to fetch sessions');
            const data = await response.json();
            setSessions(data);
            if (data.length > 0 && !activeSessionId) {
                setActiveSessionId(data[0].id);
            }
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    }, [activeSessionId]);

    const createNewSession = useCallback(() => {
        const newId = crypto.randomUUID();
        const newSession = {
            id: newId,
            name: "New Document Chat",
            createdAt: new Date().toISOString(),
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newId);
    }, []);

    const deleteSession = useCallback(async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/sessions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete session');
            const filtered = sessions.filter(session => session.id !== id);
            setSessions(filtered);
            if (activeSessionId === id) {
                setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
            }
        } catch (error) {
            console.error('Error deleting session:', error);
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

