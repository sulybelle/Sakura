import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import { useMusic } from '../context/MusicContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useMusic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Email және құпия сөз міндетті');
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setSuccess('Сәтті кірдіңіз');
      setTimeout(() => navigate('/'), 350);
    } catch (err) {
      setError(err.response?.data?.message || 'Кіру сәтсіз аяқталды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Кіру</h2>
        {error ? <p className="error-text auth-feedback">{error}</p> : null}
        {success ? <p className="success-text auth-feedback">{success}</p> : null}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Құпия сөз"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Жүктелуде...' : 'Кіру'}</button>
        </form>
        <div className="auth-link">
          Тіркелмегенсіз бе? <Link to="/register">Тіркелу</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;