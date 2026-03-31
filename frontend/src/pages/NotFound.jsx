import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="main-content not-found-page">
      <p className="not-found-code">404</p>
      <h1>Бет табылмады</h1>
      <p className="text-muted">Сілтеме қате немесе бет өшірілген болуы мүмкін.</p>
      <Link to="/" className="back-home-btn">Басты бетке оралу</Link>
    </main>
  );
};

export default NotFound;
