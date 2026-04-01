import { sequelize, Artist, Track } from './models/index.js';
import fs from 'fs';

const tracksData = JSON.parse(fs.readFileSync('./itunes_tracks.json', 'utf-8'));

const reimport = async () => {
  try {
    await sequelize.sync();
 
    await Track.destroy({ where: {} });
    await Artist.destroy({ where: {} });
 
    const uniqueArtists = [...new Map(tracksData.map(item => [item.artist, item.artist])).values()];
    for (const name of uniqueArtists) {
      await Artist.create({ name });
      console.log(`Орындаушы қосылды: ${name}`);
    }

    for (const item of tracksData) {
      const artist = await Artist.findOne({ where: { name: item.artist } });
      if (!artist) {
        console.log(`Орындаушы табылмады: ${item.artist}`);
        continue;
      }
      await Track.create({
        title: item.title,
        duration: item.duration,
        file_url: item.preview_url,
        cover_image: item.cover,
        itunesId: String(item.itunesId),   
        preview_url: item.preview_url,
        artistId: artist.id,
      });
      console.log(`Қосылды: ${item.title} - ${item.artist}`);
    }

    console.log('Импорт аяқталды!');
  } catch (err) {
    console.error('Қате:', err);
  } finally {
    await sequelize.close();
  }
};

reimport();