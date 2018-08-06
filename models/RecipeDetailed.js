const RecipeBase = require('./RecipeBase');

function RecipeDetailed(id, title, image, content, ingredients, directions) {
    RecipeBase.apply(this, arguments);
    this.ingredients = ingredients;
    this.directions = directions;
}

RecipeDetailed.prototype = Object.create(RecipeBase.prototype);

RecipeDetailed.prototype.constructor = RecipeDetailed;


module.exports = RecipeDetailed;
