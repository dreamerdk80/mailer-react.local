import React, { useState, useEffect, useCallback } from 'react'; // Добавлен useCallback
import { useAuth } from './authContext';

const Dashboard = () => {
    const { user, token, logout } = useAuth();
    const [protectedData, setProtectedData] = useState(null);

    // Используем useCallback для мемоизации функции
    const fetchProtectedData = useCallback(async () => {
        try {
            const response = await fetch('https://mailer-php.local/php/protected.php', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                setProtectedData(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch protected data:', error);
        }
    }, [token]); // Зависимости функции

    useEffect(() => {
        fetchProtectedData();
    }, [fetchProtectedData]); // Теперь fetchProtectedData в зависимостях

    return (
        <div>
            <h2>Welcome, {user?.name}!</h2>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>

            {protectedData && (
                <div>
                    <h3>Protected Data:</h3>
                    <pre>{JSON.stringify(protectedData, null, 2)}</pre>
                </div>
            )}

            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Dashboard;