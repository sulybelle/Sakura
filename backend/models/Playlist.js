import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Playlist = sequelize.define('Playlist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  cover_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  play_mode: {
    type: DataTypes.ENUM('sequence', 'shuffle'),
    allowNull: false,
    defaultValue: 'sequence',
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: true,
  },
});

export default Playlist;