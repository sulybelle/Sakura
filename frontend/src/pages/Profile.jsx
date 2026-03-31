import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../api/api';
import { useMusic } from '../context/MusicContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, toMediaUrl } = useMusic();
  const [form, setForm] = useState({
    username: '',
    email: '',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(user.id);
        const profile = res.data;
        setForm((prev) => ({
          ...prev,
          username: profile.username || '',
          email: profile.email || '',
          avatar: profile.avatar || '',
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Профильді жүктеу сәтсіз аяқталды');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError('Жаңа пароль растаумен сәйкес келмейді');
      return;
    }

    const payload = new FormData();
    payload.append('username', form.username);
    payload.append('email', form.email);
    payload.append('avatar', form.avatar);
    if (avatarFile) payload.append('avatar', avatarFile);

    if (form.newPassword) {
      payload.append('currentPassword', form.currentPassword);
      payload.append('newPassword', form.newPassword);
    }

    try {
      const res = await updateUserProfile(user.id, payload);
      const nextUser = res.data?.user || {
        ...user,
        username: form.username,
        email: form.email,
        avatar: form.avatar,
      };
      localStorage.setItem('user', JSON.stringify(nextUser));
      setUser(nextUser);
      setForm((prev) => ({
        ...prev,
        avatar: nextUser.avatar || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      setAvatarFile(null);
      setSuccess('Профиль сәтті жаңартылды');
    } catch (err) {
      setError(err.response?.data?.message || 'Профильді жаңарту сәтсіз аяқталды');
    }
  };

  if (loading) return <main className="main-content"><p>Жүктелуде...</p></main>;

  const avatarSrc = form.avatar ? (form.avatar.startsWith('http') ? form.avatar : toMediaUrl(form.avatar)) : '/default-avatar.png';

  return (
    <main className="main-content">
      <section className="profile-wrap">
        <div className="profile-hero">
          <img src={avatarSrc} alt="avatar" className="profile-avatar" />
          <div>
            <p className="text-muted">Профиль</p>
            <h1 className="profile-title">{form.username || 'Пайдаланушы'}</h1>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Пайдаланушы аты
            <input name="username" value={form.username} onChange={handleChange} required />
          </label>

          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Фото URL
            <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="https://..." />
          </label>

          <label>
            Немесе фото жүктеу
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
          </label>

          <div className="profile-password-grid">
            <label>
              Ағымдағы пароль
              <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
            </label>
            <label>
              Жаңа пароль
              <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />
            </label>
            <label>
              Жаңа пароль (растау)
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            </label>
          </div>

          {error ? <p className="error-text">{error}</p> : null}
          {success ? <p className="success-text">{success}</p> : null}

          <button type="submit" className="profile-save-btn">Сақтау</button>
        </form>
      </section>
    </main>
  );
};

export default Profile;
