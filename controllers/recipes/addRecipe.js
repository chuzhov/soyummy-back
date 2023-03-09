const { Recipe } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const addRecipe = async (req, res) => {
    const { title } = req.body;
    const recipe = await Recipe.findOne({ title });
    if (recipe) {
        throw HttpError(
            409,
            `Recipe ${title} is already created`
        );
    }
    await Recipe.create(req.body);
    res.json({
        message: "Recipe created successfully"
    });
};

module.exports = addRecipe;