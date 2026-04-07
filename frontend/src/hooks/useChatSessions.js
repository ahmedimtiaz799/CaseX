import { useState, useCallback } from 'react';

export function useChatSessions(token) {
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchSessions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${apiUrl}/api/v1/sessions`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Failed to fetch sessions: ${res.status}`);
            const data = await res.json();
            setSessions(data.sessions || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token, apiUrl]);

    const deleteSession = useCallback(async (id) => {
        setError(null);
        try {
            const res = await fetch(`${apiUrl}/api/v1/sessions/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error(`Failed to delete session: ${res.status}`);
            const filtered = sessions.filter(session => session.id !== id);
            setSessions(filtered);
            if (activeSessionId === id) {
                setActiveSessionId(filtered.length > 0 ? filtered[0].id : null);
            }
        } catch (err) {
            setError(err.message);
        }
    }, [token, activeSessionId, sessions, apiUrl]);

    const setActive = useCallback((id) => {
        setActiveSessionId(id);
    }, []);

    return {
        sessions,
        activeSessionId,
        loading,
        error,
        fetchSessions,
        deleteSession,
        setActive,
    };
}