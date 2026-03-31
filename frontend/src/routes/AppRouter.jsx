import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Library from '../pages/Library';
import Liked from '../pages/Liked';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRouter = ({ toggleSidebar, toggleRight, rightOpen }) => {
  return (
    <Routes>
      <Route path="/" element={<Home toggleSidebar={toggleSidebar} toggleRight={toggleRight} rightOpen={rightOpen} />} />
      <Route path="/search" element={<Search toggleSidebar={toggleSidebar} toggleRight={toggleRight} rightOpen={rightOpen} />} />
      <Route path="/library" element={<Library />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;