import axios from 'axios';
import fs from 'fs';

const songs = [
  "Aikyn Tolepbergen  Асылым",
  "Darkhan Juzz En suly",
  "Молданазар Махабатым",
  "Отпетые Мошенники Люби меня люби",
  "Anna Of The North Lovers",
  "Arctic Monkeys I Wanna Be Yours",
  "Bad Bunny DtMF",
  "bakr Сирен",
  "Billie Eilish WILDFLOWER",
  "charlie puth attention",
  "charlie puth selena gomez we dont talk anymore",
  "Darkhan Juzz Shyraq",
  "dj snake justin bieber let me love you",
  "Dominic Fike Babydoll",
  "Ed Sheeran Perfect",
  "ed sheeran shape of you",
  "eminem rihanna love the way you lie",
  "french montana swae lee unforgettable remix",
  "glass animals iann dior heat waves",
  "Kodak Heart Mind",
  "huntrix golden",
  "JID 21 Savage Surround Sound",
  "justin bieber love yourself",
  "justin bieber sorry",
  "kendrick lamar sza all the stars",
  "lauv i like me better",
  "Lil Pump Gucci Gang",
  "M'Dee Нужна",
  "napa deslocado evrovidenie 2025 portugalija",
  "pitbull kesha timber",
  "post malone swae lee sunflower",
  "serebro Между нами любовь",
  "shawn mendes camila cabello señorita",
  "Starlight TAEIL",
  "Stephen Sanchez Until I Found You",
  "sting shape of my heart",
  "the chainsmokers halsey closer",
  "VXVPRINCE Asylum",
  "Xcho Про любовь",
  "mot Баллада",
  "yung kai blue"
];

async function searchItunes(query) {
  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: query,
        media: 'music',
        limit: 1,
        entity: 'song',
      },
    });
    if (response.data.results.length === 0) return null;
    const item = response.data.results[0];
    return {
      title: item.trackName,
      artist: item.artistName,
      album: item.collectionName,
      cover: item.artworkUrl100?.replace('100x100', '600x600'),
      preview_url: item.previewUrl,
      duration: Math.floor(item.trackTimeMillis / 1000),
      itunesId: item.trackId,
    };
  } catch (err) {
    console.error(`Error searching for ${query}:`, err.message);
    return null;
  }
}

(async () => {
  const results = [];
  for (const song of songs) {
    console.log(`Іздеу: ${song}`);
    const data = await searchItunes(song);
    if (data) {
      results.push(data);
    } else {
      console.log(`Табылмады: ${song}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  fs.writeFileSync('itunes_tracks.json', JSON.stringify(results, null, 2));
  console.log('Нәтижелер itunes_tracks.json файлына сақталды');
})();