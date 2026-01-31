'use client';

import { useEffect } from 'react';

export default function ClearSessionPage() {
    useEffect(() => {
        // Clear all cookies for this domain
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Redirect to signup after clearing
        window.location.href = '/signup';
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: 'system-ui'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1>🧹 Clearing session...</h1>
                <p>Redirecting to signup...</p>
            </div>
        </div>
    );
}
