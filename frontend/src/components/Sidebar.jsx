import { Link, useLocation } from 'react-router-dom';
import { useMusic } from '../context/MusicContext';
import logo from '../assets/Sakura.png';
import { Home, Search, Library, Plus, Heart, LogIn, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const { user, logout } = useMusic();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Sakura" />
        {isOpen && <h2>SAKURA</h2>}
      </div>
      
      <nav className="menu-items">
        <Link to="/" className={isActive('/')}>
          <Home className="nav-icon" />
          {isOpen && <span>Басты бет</span>}
        </Link>
        <Link to="/search" className={isActive('/search')}>
          <Search className="nav-icon" />
          {isOpen && <span>Іздеу</span>}
        </Link>
        <Link to="/library" className={isActive('/library')}>
          <Library className="nav-icon" />
          {isOpen && <span>Кітапхана</span>}
        </Link>
      </nav>
      
      <hr className="divider" />
      
      <nav className="menu-items">
        <Link to="/playlists" className={isActive('/playlists')}>
          <Plus className="nav-icon" />
          {isOpen && <span>Жаңа плейлист</span>}
        </Link>
        <Link to="/liked" className={isActive('/liked')}>
          <Heart className="nav-icon" />
          {isOpen && <span>Сүйіктілерім</span>}
        </Link>
      </nav>

      <div className="sidebar-footer">
        {user ? (
          <button className="auth-btn logout" onClick={logout}>
            {isOpen ? `Шығу (${user.username})` : <LogOut className="nav-icon" />}
          </button>
        ) : (
          <Link to="/login" className="auth-btn login">
            {isOpen ? 'Кіру' : <LogIn className="nav-icon" />}
          </Link>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;