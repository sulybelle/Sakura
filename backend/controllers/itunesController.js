import axios from 'axios';

export const searchTracks = async (req, res) => {
  const { q, limit = 20 } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter "q" is required' });

  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: q,
        media: 'music',
        limit: Math.min(limit, 50),
        entity: 'song',
      },
    });

    const tracks = response.data.results.map(item => ({
      itunesId: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      cover: item.artworkUrl100?.replace('100x100', '600x600'),
      preview_url: item.previewUrl,
      duration: Math.floor(item.trackTimeMillis / 1000),
    }));

    res.json(tracks);
  } catch (error) {
    console.error('iTunes search error:', error.message);
    res.status(500).json({ error: 'Failed to search tracks on iTunes' });
  }
};

export const getTrackById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get('https://itunes.apple.com/lookup', {
      params: { id, entity: 'song' },
    });
    const item = response.data.results[0];
    if (!item) return res.status(404).json({ error: 'Track not found' });
    res.json({
      itunesId: item.trackId,
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      cover: item.artworkUrl100?.replace('100x100', '600x600'),
      preview_url: item.previewUrl,
      duration: Math.floor(item.trackTimeMillis / 1000),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get track' });
  }
};