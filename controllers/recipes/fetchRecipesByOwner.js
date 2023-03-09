const { Recipe } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const fetchRecipesByOwner = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 4 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Recipe.find({ owner }, "-owner, -__v ", {skip, limit});
    if (!result) {
            HttpError(404,`Recipes by owner ID: ${_id} not found`)
    }
    res.json(result);
};

module.exports = fetchRecipesByOwner;