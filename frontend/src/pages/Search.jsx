import { useState, useEffect } from 'react';
import { getTracks } from '../api/api';
import TrackCard from '../components/TrackCard';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [allTracks, setAllTracks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await getTracks();
        setAllTracks(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Тректерді жүктеу сәтсіз аяқталды');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(allTracks);
      return;
    }

    const results = allTracks.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.Artist?.name.toLowerCase().includes(query.toLowerCase())
      );
    setFiltered(results);
  }, [query, allTracks]);

  return (
    <section className="main-content">
      <header className="top-bar sticky">
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true"><SearchIcon className="ui-icon" /></span>
          <input 
            type="text" 
            placeholder="Не тыңдағыңыз келеді?" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
        </div>
      </header>

      {loading ? <p className="text-muted">Жүктелуде...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      
      {!loading && !error && filtered.length === 0 ? (
        <div className="empty-state">
          <h3>Ештеңе табылмады</h3>
          <p>Басқа сөзбен іздеп көріңіз немесе фильтрді өзгертіңіз</p>
        </div>
      ) : null}

      {!loading && !error && filtered.length > 0 ? (
        <div className="grid-cards">
          {filtered.map(track => <TrackCard key={track.id} track={track} tracksList={filtered} />)}
        </div>
      ) : null}
    </section>
  );
};

export default Search;