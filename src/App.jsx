import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { AuthProvider, useAuth } from './authContext'; // Добавлен useAuth
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminDashboard from './AdminDashboard';
import MailerForm from './MailerForm';
import LoadFile from './LoadFile';
import Settings from './Settings';
import Registration from './Registration';
import "./reset.css";
import "./style.css";

// Создаем отдельный компонент для меню
const NavigationMenu = () => {
    const { user } = useAuth(); // Получаем информацию о пользователе

    return (
        <nav className='menu'>
            <ul>
                {/* Показываем "Авторизация" только если пользователь НЕ авторизован */}
                {!user && (
                    <li>
                        <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>
                            Авторизация
                        </NavLink>
                    </li>
                )}

                {/* Показываем остальные пункты меню только если пользователь авторизован */}
                {user && (
                    <>
                        <li>
                            <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>
                                Главная
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reg" className={({isActive}) => (isActive ? "active" : "")}>
                                Регистрация
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/load" className={({isActive}) => (isActive ? "active" : "")}>
                                Загрузка файла
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/form" className={({isActive}) => (isActive ? "active" : "")}>
                                Отправка формы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/settings" className={({isActive}) => (isActive ? "active" : "")}>
                                Настройки
                            </NavLink>
                        </li>

                        {/* Дополнительные пункты для администраторов */}
                        {user.role === 'admin' && (
                            <li>
                                <NavLink to="/admin" className={({isActive}) => (isActive ? "active" : "")}>
                                    Админка
                                </NavLink>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavigationMenu /> {/* Используем компонент меню */}

                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/load"
                        element={
                            <ProtectedRoute>
                                <LoadFile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/form"
                        element={
                            <ProtectedRoute>
                                <MailerForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/reg"
                        element={
                            <ProtectedRoute>
                                <Registration />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Редирект на главную для несуществующих routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;