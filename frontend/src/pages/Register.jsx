import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';
import { useMusic } from '../context/MusicContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useMusic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ username, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Тіркелу сәтсіз аяқталды');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Тіркелу</h2>
        {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Пайдаланушы аты"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Тіркелу</button>
        </form>
        <div className="auth-link">
          Қазір тіркелгенсіз бе? <Link to="/login">Кіру</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;