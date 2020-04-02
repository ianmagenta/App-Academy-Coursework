'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredients = sequelize.define('Ingredients', {
    amount: DataTypes.NUMERIC,
    measurementUnitId: DataTypes.INTEGER,
    foodStuff: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    recipeId: DataTypes.INTEGER
  }, {});
  Ingredients.associate = function (models) {
    Ingredients.belongsTo(models.MeasurementUnits, { foreignKey: "measurementUnitId" });
    Ingredients.belongsTo(models.Recipes, { foreignKey: "recipeId" });
  };
  return Ingredients;
};
