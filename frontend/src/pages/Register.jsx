import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/api';
import { useMusic } from '../context/MusicContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useMusic();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !email.trim() || !password) {
      setError('Барлық өріс міндетті');
      return;
    }
    if (password.length < 6) {
      setError('Құпия сөз кемінде 6 таңба болуы керек');
      return;
    }
    if (password !== confirmPassword) {
      setError('Құпия сөздер сәйкес емес');
      return;
    }

    setLoading(true);
    try {
      const res = await register({ username, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
      setSuccess('Тіркелу сәтті аяқталды');
      setTimeout(() => navigate('/'), 350);
    } catch (err) {
      setError(err.response?.data?.message || 'Тіркелу сәтсіз аяқталды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Тіркелу</h2>
        {error ? <p className="error-text auth-feedback">{error}</p> : null}
        {success ? <p className="success-text auth-feedback">{success}</p> : null}
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
          <input
            type="password"
            placeholder="Құпия сөзді растау"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Жүктелуде...' : 'Тіркелу'}</button>
        </form>
        <div className="auth-link">
          Қазір тіркелгенсіз бе? <Link to="/login">Кіру</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;