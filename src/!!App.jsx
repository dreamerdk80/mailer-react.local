import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { AuthProvider } from './authContext';
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

function App() {
    return (
        <AuthProvider>

            <Router>
                <nav className='menu'>
                    <ul>
                      <li>
                        <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>Авторизация</NavLink>
                      </li>
                      <li>
                        <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Главная</NavLink>
                      </li>
                      <li>
                        <NavLink to="/reg" className={({isActive}) => (isActive ? "active" : "")}>Регистрация</NavLink>
                      </li>
                      <li>
                        <NavLink to="/load" className={({isActive}) => (isActive ? "active" : "")}>Загрузка файла</NavLink>
                      </li>
                      <li>
                        <NavLink to="/form" className={({isActive}) => (isActive ? "active" : "")}>Отправка формы</NavLink>
                      </li>
                      <li>
                        <NavLink to="/settings" className={({isActive}) => (isActive ? "active" : "")}>Настройки</NavLink>
                      </li>
                    </ul>
                  </nav>
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
                    <Route path="/" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;