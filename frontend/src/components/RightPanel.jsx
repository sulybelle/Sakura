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
  const artistImageUrl = currentTrack.Artist?.image ? toMediaUrl(currentTrack.Artist.image) : coverUrl;
  const artistName = currentTrack.Artist?.name || currentTrack.artist || currentTrack.artist_name || 'Белгісіз автор';
  
  return (
    <aside className="right-panel">
      <h3 className="right-panel-title">Ойнап тұрған трек</h3>
      <div className="right-panel-content">
        <img src={coverUrl} alt="cover" className="now-playing-img" />
        <h2 className="now-playing-title">{currentTrack.title}</h2>
        <p className="text-muted">{artistName}</p>
        
        <div className="artist-bio-card">
          <h4>Орындаушы туралы</h4>
          <img src={artistImageUrl} alt={artistName} className="artist-cover" />
          <h5>{artistName}</h5>
          <p>{currentTrack.Artist?.bio || 'Қосымша ақпарат жоқ'}</p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;