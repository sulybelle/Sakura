import { useMusic } from '../context/MusicContext';

const RightPanel = () => {
  const { currentTrack, toMediaUrl } = useMusic();
  
  if (!currentTrack) {
    return (
      <aside className="right-panel empty">
        <h3>Трек туралы</h3>
        <p className="text-muted">Трек таңдалмаған. Музыка қосыңыз!</p>
      </aside>
    );
  }
  
  const coverUrl = currentTrack.cover_image ? toMediaUrl(currentTrack.cover_image) : '/default-cover.jpg';
  
  return (
    <aside className="right-panel">
      <h3>Ойнап тұрған трек</h3>
      <div className="right-panel-content">
        <img src={coverUrl} alt="cover" className="now-playing-img" />
        <h2>{currentTrack.title}</h2>
        <p className="text-muted">{currentTrack.Artist?.name}</p>
        
        <div className="artist-bio-card">
          <h4>Орындаушы туралы</h4>
          <p>{currentTrack.Artist?.bio || 'Қосымша ақпарат жоқ'}</p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;