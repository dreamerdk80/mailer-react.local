import Auth from './Auth';
import LoadFile from './LoadFile';
import MailerForm from './MailerForm';
import Main from './Main';
import Settings from './Settings';
import "./reset.css";
import "./style.css";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className='menu'>
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Главная</NavLink>
          </li>
          <li>
            <NavLink to="/auth" className={({isActive}) => (isActive ? "active" : "")}>Авторизация</NavLink>
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
        <Route path='/' element={<Main />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/load' element={<LoadFile />} />
        <Route path='/form' element={<MailerForm />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;