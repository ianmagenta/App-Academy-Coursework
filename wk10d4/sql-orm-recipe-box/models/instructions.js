'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instructions = sequelize.define('Instructions', {
    specification: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    },
    listOrder: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: "List order must be greater than zero"
        }
      }
    },
    recipeId: DataTypes.INTEGER
  }, {});
  Instructions.associate = function (models) {
    Instructions.belongsTo(models.Recipes, { foreignKey: 'recipeId' })
  };
  return Instructions;
};
