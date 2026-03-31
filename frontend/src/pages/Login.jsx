import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/api';
import { useMusic } from '../context/MusicContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useMusic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Кіру сәтсіз аяқталды');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Кіру</h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
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
          <button type="submit">Кіру</button>
        </form>
        <div className="auth-link">
          Тіркелмегенсіз бе? <Link to="/register">Тіркелу</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;