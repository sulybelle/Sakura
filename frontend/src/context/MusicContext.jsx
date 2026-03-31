import { createContext, useContext, useState, useEffect, useRef } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [user, setUser] = useState(null);
  const [likedTracks, setLikedTracks] = useState([]); // сүйікті тректердің ID-і
  const audioRef = useRef(new Audio());

  const mediaBaseUrl = (import.meta.env.VITE_MEDIA_URL || import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');
  const toMediaUrl = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${mediaBaseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const storedLikes = localStorage.getItem('likedTracks');
    if (storedLikes) setLikedTracks(JSON.parse(storedLikes));
  }, []);

  // likedTracks өзгергенде localStorage-ке сақтау
  useEffect(() => {
    localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
  }, [likedTracks]);

  // Аудио элементін басқару
  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = toMediaUrl(currentTrack.file_url);
      if (isPlaying) {
        const p = audioRef.current.play();
        if (p?.catch) p.catch(() => {});
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (currentTrack) {
      if (isPlaying) {
        const p = audioRef.current.play();
        if (p?.catch) p.catch(() => {});
      }
      else audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const onEnded = () => {
      if (queue.length && currentTrack) {
        const idx = queue.findIndex(t => t.id === currentTrack.id);
        const next = queue[idx + 1] || queue[0];
        if (next) {
          setCurrentTrack(next);
          setIsPlaying(true);
        }
      } else {
        setIsPlaying(false);
      }
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, [queue, currentTrack]);

  const playTrack = (track, queueList = []) => {
    setCurrentTrack(track);
    setQueue(queueList);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (queue.length && currentTrack) {
      const idx = queue.findIndex(t => t.id === currentTrack.id);
      const next = queue[idx + 1] || queue[0];
      playTrack(next, queue);
    }
  };

  const prevTrack = () => {
    if (queue.length && currentTrack) {
      const idx = queue.findIndex(t => t.id === currentTrack.id);
      const prev = queue[idx - 1] || queue[queue.length - 1];
      playTrack(prev, queue);
    }
  };

  const toggleLike = (trackId) => {
    setLikedTracks(prev =>
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <MusicContext.Provider value={{
      currentTrack, isPlaying, user, setUser,
      likedTracks, toggleLike,
      playTrack, setIsPlaying, nextTrack, prevTrack, logout,
      audioRef, toMediaUrl
    }}>
      {children}
    </MusicContext.Provider>
  );
};