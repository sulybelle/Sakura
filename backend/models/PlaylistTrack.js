import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PlaylistTrack = sequelize.define('PlaylistTrack', {}, {
  timestamps: false,
});

export default PlaylistTrack;