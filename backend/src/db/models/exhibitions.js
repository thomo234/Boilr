const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const exhibitions = sequelize.define(
    'exhibitions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
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

  exhibitions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.exhibitions.belongsTo(db.artists, {
      as: 'artist',
      foreignKey: {
        name: 'artistId',
      },
      constraints: false,
    });

    db.exhibitions.hasMany(db.file, {
      as: 'gallery_images',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.exhibitions.getTableName(),
        belongsToColumn: 'gallery_images',
      },
    });

    db.exhibitions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.exhibitions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return exhibitions;
};
