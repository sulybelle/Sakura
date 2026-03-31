import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import AppRouter from './routes/AppRouter';
import { MusicProvider } from './context/MusicContext';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import RightPanel from './components/RightPanel';
import { ChevronUp, Music2 } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [playerOpen, setPlayerOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleRight = () => setRightOpen(!rightOpen);
  const openPlayer = () => setPlayerOpen(true);

  return (
    <MusicProvider>
      <BrowserRouter>
        <div className={`app-container ${!sidebarOpen ? 'sidebar-closed' : ''} ${!rightOpen ? 'right-closed' : ''} ${!playerOpen ? 'player-closed' : ''}`}>
          <Sidebar isOpen={sidebarOpen} />
          <main className="main-content">
            <AppRouter toggleSidebar={toggleSidebar} toggleRight={toggleRight} rightOpen={rightOpen} />
          </main>
          <RightPanel />
          {playerOpen ? <Player onClose={() => setPlayerOpen(false)} /> : null}
          {!playerOpen ? (
            <button className="player-reopen" onClick={openPlayer} aria-label="Open player">
              <Music2 className="ui-icon" />
              <ChevronUp className="ui-icon" />
            </button>
          ) : null}
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;