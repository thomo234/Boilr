const db = require('../models');
const Users = db.users;

const Exhibitions = db.exhibitions;

const Messages = db.messages;

const Pages = db.pages;

const Portfolios = db.portfolios;

const Artists = db.artists;

const ExhibitionsData = [
  {
    title: 'Exhibition One',

    start_date: new Date('2023-10-01T10:00:00Z'),

    end_date: new Date('2023-10-10T18:00:00Z'),

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Exhibition Two',

    start_date: new Date('2023-11-01T10:00:00Z'),

    end_date: new Date('2023-11-10T18:00:00Z'),

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Exhibition Three',

    start_date: new Date('2023-12-01T10:00:00Z'),

    end_date: new Date('2023-12-10T18:00:00Z'),

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const MessagesData = [
  {
    content: 'Hello, Artist Two!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Hi, Artist One!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Hello, Artist Three!',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const PagesData = [
  {
    title: 'Home Page',

    content: "<h1>Welcome to Artist One's Homepage</h1>",

    // type code here for "relation_one" field
  },

  {
    title: 'Portfolio Page',

    content: "<h1>Artist One's Portfolio</h1>",

    // type code here for "relation_one" field
  },

  {
    title: 'Home Page',

    content: "<h1>Welcome to Artist Two's Homepage</h1>",

    // type code here for "relation_one" field
  },
];

const PortfoliosData = [
  {
    title: 'Artist One Portfolio',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Artist Two Portfolio',

    // type code here for "images" field

    // type code here for "relation_one" field
  },

  {
    title: 'Artist Three Portfolio',

    // type code here for "images" field

    // type code here for "relation_one" field
  },
];

const ArtistsData = [
  {
    name: 'Artist One',
  },

  {
    name: 'Artist Two',
  },

  {
    name: 'Artist Three',
  },
];

// Similar logic for "relation_many"

async function associateUserWithArtist() {
  const relatedArtist0 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setArtist) {
    await User0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setArtist) {
    await User1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setArtist) {
    await User2.setArtist(relatedArtist2);
  }
}

async function associateExhibitionWithArtist() {
  const relatedArtist0 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Exhibition0 = await Exhibitions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Exhibition0?.setArtist) {
    await Exhibition0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Exhibition1 = await Exhibitions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Exhibition1?.setArtist) {
    await Exhibition1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Exhibition2 = await Exhibitions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Exhibition2?.setArtist) {
    await Exhibition2.setArtist(relatedArtist2);
  }
}

async function associateMessageWithSender() {
  const relatedSender0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message0 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Message0?.setSender) {
    await Message0.setSender(relatedSender0);
  }

  const relatedSender1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message1 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Message1?.setSender) {
    await Message1.setSender(relatedSender1);
  }

  const relatedSender2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message2 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Message2?.setSender) {
    await Message2.setSender(relatedSender2);
  }
}

async function associateMessageWithReceiver() {
  const relatedReceiver0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message0 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Message0?.setReceiver) {
    await Message0.setReceiver(relatedReceiver0);
  }

  const relatedReceiver1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message1 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Message1?.setReceiver) {
    await Message1.setReceiver(relatedReceiver1);
  }

  const relatedReceiver2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Message2 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Message2?.setReceiver) {
    await Message2.setReceiver(relatedReceiver2);
  }
}

async function associateMessageWithArtist() {
  const relatedArtist0 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Message0 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Message0?.setArtist) {
    await Message0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Message1 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Message1?.setArtist) {
    await Message1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Message2 = await Messages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Message2?.setArtist) {
    await Message2.setArtist(relatedArtist2);
  }
}

async function associatePageWithArtist() {
  const relatedArtist0 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Page0 = await Pages.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Page0?.setArtist) {
    await Page0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Page1 = await Pages.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Page1?.setArtist) {
    await Page1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Page2 = await Pages.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Page2?.setArtist) {
    await Page2.setArtist(relatedArtist2);
  }
}

async function associatePortfolioWithArtist() {
  const relatedArtist0 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Portfolio0 = await Portfolios.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Portfolio0?.setArtist) {
    await Portfolio0.setArtist(relatedArtist0);
  }

  const relatedArtist1 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Portfolio1 = await Portfolios.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Portfolio1?.setArtist) {
    await Portfolio1.setArtist(relatedArtist1);
  }

  const relatedArtist2 = await Artists.findOne({
    offset: Math.floor(Math.random() * (await Artists.count())),
  });
  const Portfolio2 = await Portfolios.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Portfolio2?.setArtist) {
    await Portfolio2.setArtist(relatedArtist2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Exhibitions.bulkCreate(ExhibitionsData);

    await Messages.bulkCreate(MessagesData);

    await Pages.bulkCreate(PagesData);

    await Portfolios.bulkCreate(PortfoliosData);

    await Artists.bulkCreate(ArtistsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithArtist(),

      await associateExhibitionWithArtist(),

      await associateMessageWithSender(),

      await associateMessageWithReceiver(),

      await associateMessageWithArtist(),

      await associatePageWithArtist(),

      await associatePortfolioWithArtist(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exhibitions', null, {});

    await queryInterface.bulkDelete('messages', null, {});

    await queryInterface.bulkDelete('pages', null, {});

    await queryInterface.bulkDelete('portfolios', null, {});

    await queryInterface.bulkDelete('artists', null, {});
  },
};
