import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Track = sequelize.define('Track', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: DataTypes.INTEGER,
  file_url: DataTypes.STRING,
  cover_image: DataTypes.STRING,
  plays: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  itunesId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  preview_url: DataTypes.STRING,
  artistId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Artists',
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
});

export default Track;