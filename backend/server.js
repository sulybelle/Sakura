import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import trackRoutes from './routes/trackRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import itunesRoutes from './routes/itunesRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/itunes', itunesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tracks/:trackId/reviews', reviewRoutes);

app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5001;
sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection/startup failed:', err.message);
    process.exit(1);
  });