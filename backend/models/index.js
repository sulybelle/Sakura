import sequelize from '../config/db.js';
import User from './User.js';
import Artist from './Artist.js';
import Track from './Track.js';
import Playlist from './Playlist.js';
import PlaylistTrack from './PlaylistTrack.js';
import Review from './Review.js';

// Байланыстар
User.hasMany(Playlist, { foreignKey: 'user_id' });
Playlist.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Review);
Review.belongsTo(User);
 
Artist.hasMany(Track, { foreignKey: 'artistId' });
Track.belongsTo(Artist, { foreignKey: 'artistId' });

Track.hasMany(Review);
Review.belongsTo(Track);

Playlist.belongsToMany(Track, { through: PlaylistTrack });
Track.belongsToMany(Playlist, { through: PlaylistTrack });

export { sequelize, User, Artist, Track, Playlist, PlaylistTrack, Review };