// AdminDashboard.js
import React from 'react';
import { useAuth } from './authContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, Administrator {user?.name}!</p>
            <p>This is a restricted area for administrators only.</p>
            <div>
                <h3>Admin Features:</h3>
                <ul>
                    <li>User Management</li>
                    <li>System Settings</li>
                    <li>Analytics</li>
                    <li>Reports</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;