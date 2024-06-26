const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PortfoliosDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const portfolios = await db.portfolios.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await portfolios.setArtist(data.artist || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.portfolios.getTableName(),
        belongsToColumn: 'images',
        belongsToId: portfolios.id,
      },
      data.images,
      options,
    );

    return portfolios;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const portfoliosData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const portfolios = await db.portfolios.bulkCreate(portfoliosData, {
      transaction,
    });

    // For each item created, replace relation files

    for (let i = 0; i < portfolios.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.portfolios.getTableName(),
          belongsToColumn: 'images',
          belongsToId: portfolios[i].id,
        },
        data[i].images,
        options,
      );
    }

    return portfolios;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const portfolios = await db.portfolios.findByPk(id, {}, { transaction });

    await portfolios.update(
      {
        title: data.title || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await portfolios.setArtist(data.artist || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.portfolios.getTableName(),
        belongsToColumn: 'images',
        belongsToId: portfolios.id,
      },
      data.images,
      options,
    );

    return portfolios;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const portfolios = await db.portfolios.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of portfolios) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of portfolios) {
        await record.destroy({ transaction });
      }
    });

    return portfolios;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const portfolios = await db.portfolios.findByPk(id, options);

    await portfolios.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await portfolios.destroy({
      transaction,
    });

    return portfolios;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const portfolios = await db.portfolios.findOne({ where }, { transaction });

    if (!portfolios) {
      return portfolios;
    }

    const output = portfolios.get({ plain: true });

    output.images = await portfolios.getImages({
      transaction,
    });

    output.artist = await portfolios.getArtist({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.artists,
        as: 'artist',
      },

      {
        model: db.file,
        as: 'images',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('portfolios', 'title', filter.title),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.artist) {
        var listItems = filter.artist.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          artistId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.portfolios.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.portfolios.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('portfolios', 'title', query),
        ],
      };
    }

    const records = await db.portfolios.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
