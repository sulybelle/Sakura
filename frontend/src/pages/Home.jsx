import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTracks } from '../api/api';
import TrackCard from '../components/TrackCard';
import { Menu, UserCircle } from 'lucide-react';

const Home = ({ toggleSidebar }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await getTracks();
        setTracks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  if (loading) return <div className="loading">Жүктелуде...</div>;

  const forYou = tracks.slice(0, 8);
  const more = tracks.slice(8, 16);

  return (
    <>
      <header className="top-bar">
        <div className="left-controls">
          <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu className="ui-icon" />
          </button>
        </div>
        <div className="home-slogan" aria-label="Sakura slogan">
          <p>Sakura — Music for your soul</p>
        </div>
        <div className="user-info">
          {user ? (
            <Link to="/profile" className="profile-link">
              <UserCircle className="ui-icon" />
              <span>Жеке бет</span>
            </Link>
          ) : (
            <button className="auth-btn login" onClick={() => window.location.href = '/login'}>Кіру</button>
          )}
        </div>
      </header>

      <section>
        <h2 className="section-title">Тек сен үшін</h2>
        <div className="grid-cards">
          {forYou.map(track => (
            <TrackCard key={track.id} track={track} tracksList={tracks} />
          ))}
        </div>

        <h2 className="section-title">Одан әрі тыңдаймыз ба?</h2>
        <div className="grid-cards">
          {more.map(track => (
            <TrackCard key={track.id} track={track} tracksList={tracks} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;