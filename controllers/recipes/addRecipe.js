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
        HttpError(400, "Recipe is already created")
    }
    await Recipe.create({ ...recipe, owner: _id});
    res.json({
        message: "Recipe created successfully"
    });
};

module.exports = addRecipe;