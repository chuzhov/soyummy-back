const { Recipe } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const addRecipe = async (req, res) => {
    const {_id} = req.user;
    const recipe = req.body
    const { ingredients } = req.body;
    const findRecipe = await Recipe.find({ingredients})
    if (findRecipe) {
        throw HttpError(409, "Recipe is already created")
    }
    await Recipe.create({ ...recipe, owner: _id});
    res.status(204).send('Recipe created successfully');
};

module.exports = addRecipe;
