const { Recipe } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const delRecipe = async (req, res) => {
    const { id } = req.params;
    const { id: uid } = req.user;

    const result = await Recipe.findOneAndDelete({_id: id, owner: uid});
    if (!result) {
        throw HttpError(404,`Recipe with id ${id} not found` )
    }
    res.json({"Deleted: ": result._id})
};

module.exports = delRecipe;
