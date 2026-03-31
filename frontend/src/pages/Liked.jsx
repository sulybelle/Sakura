import { useMusic } from '../context/MusicContext';
import { useEffect, useState } from 'react';
import { getTracks } from '../api/api';
import TrackCard from '../components/TrackCard';
import { Heart } from 'lucide-react';

const Liked = () => {
  const { likedTracks } = useMusic();
  const [tracks, setTracks] = useState([]);
  const [likedTracksData, setLikedTracksData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await getTracks();
      setTracks(res.data);
    };
    fetchAll();
  }, []);

  useEffect(() => {
    setLikedTracksData(tracks.filter(t => likedTracks.includes(t.id)));
  }, [tracks, likedTracks]);

  return (
    <main className="main-content">
      <h2 className="section-title"><Heart className="ui-icon" /> Сүйікті тректерім</h2>
      <div className="grid-cards">
        {likedTracksData.map(track => (
          <TrackCard key={track.id} track={track} tracksList={likedTracksData} />
        ))}
      </div>
    </main>
  );
};

export default Liked;