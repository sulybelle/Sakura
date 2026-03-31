import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Library from '../pages/Library';
import Liked from '../pages/Liked';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';

const AppRouter = ({ toggleSidebar }) => {
  return (
    <Routes>
      <Route path="/" element={<Home toggleSidebar={toggleSidebar} />} />
      <Route path="/search" element={<Search toggleSidebar={toggleSidebar} />} />
      <Route path="/library" element={<Library />} />
      <Route path="/playlists" element={<Library />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;