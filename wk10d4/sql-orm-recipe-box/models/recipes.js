'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  Recipes.associate = function (models) {
    Recipes.hasMany(models.Instructions, { foreignKey: 'recipeId', onDelete: 'CASCADE', hooks: true });
    Recipes.hasMany(models.Ingredients, { foreignKey: "recipeId", onDelete: 'CASCADE', hooks: true })
  };
  return Recipes;
};
