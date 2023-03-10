const { Recipe } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const delRecipe = async (req, res) => {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404,`Recipe with id ${id} not found` )
    }
        res.status(204);
};

module.exports = delRecipe;
