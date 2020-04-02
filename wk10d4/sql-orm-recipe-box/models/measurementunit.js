'use strict';
module.exports = (sequelize, DataTypes) => {
  const MeasurementUnit = sequelize.define('MeasurementUnits', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {});
  MeasurementUnit.associate = function (models) {
    MeasurementUnit.hasMany(models.Ingredients, { foreignKey: "measurementUnitId" });

  };
  return MeasurementUnit;
};
