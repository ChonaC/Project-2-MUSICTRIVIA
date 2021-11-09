const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Song extends Model {}

Song.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
      Song_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      Song_URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'Song',
  }
);

module.exports = Song;
