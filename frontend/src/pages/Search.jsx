import { useState, useEffect } from 'react';
import { getTracks } from '../api/api';
import TrackCard from '../components/TrackCard';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [allTracks, setAllTracks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState('title_asc');
  const [filterArtist, setFilterArtist] = useState('');
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    getTracks().then(res => {
      setAllTracks(res.data);
      const unique = [...new Map(res.data.map(t => [t.Artist?.id, t.Artist])).values()];
      setArtists(unique.filter(a => a));
    });
  }, []);

  useEffect(() => {
    let results = allTracks;
    if (query.trim()) {
      results = results.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.Artist?.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filterArtist) {
      results = results.filter(t => t.Artist?.id === filterArtist);
    }
    switch (sortBy) {
      case 'title_asc': results.sort((a,b) => a.title.localeCompare(b.title)); break;
      case 'title_desc': results.sort((a,b) => b.title.localeCompare(a.title)); break;
      case 'artist_asc': results.sort((a,b) => (a.Artist?.name || '').localeCompare(b.Artist?.name || '')); break;
      case 'duration_asc': results.sort((a,b) => a.duration - b.duration); break;
      case 'duration_desc': results.sort((a,b) => b.duration - a.duration); break;
      default: break;
    }
    setFiltered(results);
  }, [query, allTracks, sortBy, filterArtist]);

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
      
      <div className="filters-container">
        <select className="chip" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title_asc">Атауы A-Z</option>
          <option value="title_desc">Атауы Z-A</option>
          <option value="artist_asc">Орындаушы A-Z</option>
          <option value="duration_asc">Ұзақтығы (қысқа)</option>
          <option value="duration_desc">Ұзақтығы (ұзын)</option>
        </select>
        
        <select className="chip" value={filterArtist} onChange={(e) => setFilterArtist(e.target.value)}>
          <option value="">Барлық орындаушылар</option>
          {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
        </select>
      </div>

      <h2 className="section-title">Нәтижелер ({filtered.length})</h2>
      
      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>Ештеңе табылмады</h3>
          <p>Басқа сөзбен іздеп көріңіз немесе фильтрді өзгертіңіз</p>
        </div>
      ) : (
        <div className="grid-cards">
          {filtered.map(track => <TrackCard key={track.id} track={track} tracksList={filtered} />)}
        </div>
      )}
    </section>
  );
};

export default Search;