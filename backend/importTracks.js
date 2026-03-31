import { sequelize, Artist, Track } from './models/index.js';
import fs from 'fs';

const tracksData = JSON.parse(fs.readFileSync('./itunes_tracks.json', 'utf-8'));

const importToDatabase = async () => {
  try {
    await sequelize.sync();

    for (const item of tracksData) {
      if (!item.title || !item.artist) continue;

      let artist = await Artist.findOne({ where: { name: item.artist } });
      if (!artist) {
        artist = await Artist.create({ name: item.artist });
        console.log(`Жаңа орындаушы: ${item.artist}`);
      }

      // itunesId-ді жолға түрлендіру
      const itunesIdStr = String(item.itunesId);
      const existing = await Track.findOne({ where: { itunesId: itunesIdStr } });
      if (existing) {
        console.log(`Трек өткізілді: ${item.title} – бар`);
        continue;
      }

      await Track.create({
        title: item.title,
        duration: item.duration,
        file_url: item.preview_url,
        cover_image: item.cover,
        artistId: artist.id,
        itunesId: itunesIdStr,
        preview_url: item.preview_url,
      });
      console.log(`Қосылды: ${item.title} - ${item.artist}`);
    }

    console.log('Импорт аяқталды!');
  } catch (err) {
    console.error('Импорт қатесі:', err);
  } finally {
    await sequelize.close();
  }
};

importToDatabase();