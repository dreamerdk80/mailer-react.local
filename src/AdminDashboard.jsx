import { useAuth } from './authContext';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="mailling">
            <h3>Панель Адиминистратора</h3>
            <p>Добро пожаловать, Администратор {user?.name}!</p>
            <p>Это закрытая зона только для администраторов.</p>
            <div className="mailling">
                <h3>Admin Features:</h3>
                <ul className="mailling">
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