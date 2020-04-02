const { Op } = require('sequelize');
let Ingredients;
let moduleError;

try {
  const db = require('../models');
  ({ Ingredients } = db);
  if (Ingredients === undefined) {
    moduleError = 'It looks like you need to generate the Ingredient model.';
  }
} catch (e) {
  console.error(e);
  if (e.message.includes('Cannot find module')) {
    moduleError = 'It looks like you need initialize your project.';
  } else {
    moduleError = `An error was raised "${e.message}". Check the console for details.`;
  }
}
/* Don't change code above this line ******************************************/



async function createNewIngredient(amount, recipeId, measurementUnitId, foodStuff) {
  // Use the create method of the Ingredient object to create a new object.
  //
  // Docs: https://sequelize.org/v5/manual/instances.html#creating-persistent-instances
  await Ingredients.create({
    amount,
    recipeId,
    measurementUnitId,
    foodStuff,
  })

}



/* Don't change code below this line ******************************************/
module.exports = {
  createNewIngredient,
  loadingDbError: moduleError,
};
