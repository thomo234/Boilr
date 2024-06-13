const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const artists = sequelize.define(
    'artists',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  artists.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.artists.hasMany(db.users, {
      as: 'users_artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.artists.hasMany(db.exhibitions, {
      as: 'exhibitions_artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.artists.hasMany(db.messages, {
      as: 'messages_artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.artists.hasMany(db.pages, {
      as: 'pages_artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.artists.hasMany(db.portfolios, {
      as: 'portfolios_artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    //end loop

    db.artists.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.artists.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return artists;
};
