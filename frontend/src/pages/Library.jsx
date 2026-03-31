import { useEffect, useState } from 'react';
import { getPlaylists, createPlaylist, deletePlaylist, getPlaylist, removeTrackFromPlaylist } from '../api/api';
import { useMusic } from '../context/MusicContext';
import { Trash2 } from 'lucide-react';

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newName, setNewName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { user } = useMusic();

  useEffect(() => {
    if (!user) window.location.href = '/login';
    else fetchPlaylists();
  }, [user]);

  const fetchPlaylists = async () => {
    const res = await getPlaylists();
    setPlaylists(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createPlaylist({ name: newName });
    setNewName('');
    fetchPlaylists();
  };

  const handleDeletePlaylist = async (id) => {
    if (window.confirm('Плейлистті жою?')) {
      await deletePlaylist(id);
      fetchPlaylists();
      if (selectedPlaylist?.id === id) setSelectedPlaylist(null);
    }
  };

  const handleViewPlaylist = async (id) => {
    const res = await getPlaylist(id);
    setSelectedPlaylist(res.data);
  };

  const handleRemoveTrack = async (playlistId, trackId) => {
    await removeTrackFromPlaylist(playlistId, trackId);
    if (selectedPlaylist?.id === playlistId) {
      const updated = await getPlaylist(playlistId);
      setSelectedPlaylist(updated.data);
    }
  };

  return (
    <main className="main-content">
      <h2 className="section-title">Менің плейлисттерім</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Жаңа плейлист аты" />
        <button type="submit">Құру</button>
      </form>
      <div className="grid-cards">
        {playlists.map(p => (
          <div key={p.id} className="card" onClick={() => handleViewPlaylist(p.id)}>
            <img src="https://via.placeholder.com/150/F48FB1/FFFFFF?text=Playlist" alt={p.name} />
            <h4>{p.name}</h4>
            <p>{p.Tracks?.length || 0} трек</p>
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleDeletePlaylist(p.id); }} aria-label="Delete playlist">
              <Trash2 className="ui-icon" />
            </button>
          </div>
        ))}
      </div>

      {selectedPlaylist && (
        <div style={{ marginTop: '40px' }}>
          <h3>{selectedPlaylist.name}</h3>
          {selectedPlaylist.Tracks?.map(track => (
            <div key={track.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #ccc' }}>
              <span>{track.title} - {track.Artist?.name}</span>
              <button onClick={() => handleRemoveTrack(selectedPlaylist.id, track.id)}>×</button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Library;