const { Recipe } = require("../../models");

const getOwnRecipeByID = async (req, res) => {
    const { id } = (req.params)
    const result = await Recipe.findById({ id }, '-owner, -__v' );

    res.json(result)
};

module.exports = getOwnRecipeByID;

