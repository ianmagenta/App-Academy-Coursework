'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Parks', [
      { parkName: 'Cool Park', city: 'Chicago', provinceState: "Illinois", country: "USA", opened: new Date(), size: "Big", description: "It's a cool park!", createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Disney', city: 'Orlando', provinceState: "Florida", country: "USA", opened: new Date(), size: "Big", description: "It's a cool park!", createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Bad Park', city: 'Nowhere', provinceState: "Texas", country: "USA", opened: new Date(), size: "Little", description: "It's a bad park!", createdAt: new Date(), updatedAt: new Date() },
      { parkName: 'Boring Park', city: 'Somewhere', provinceState: "Delaware", country: "USA", opened: new Date(), size: "Medium", description: "It's a boring park.", createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Parks', null, {});
  }
};
