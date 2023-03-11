const { Recipe } = require("../../models");

const fetchRecipesByOwner = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 4 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Recipe.find({ owner }, "-owner, -__v ", {skip, limit});
    res.json(result);
};

module.exports = fetchRecipesByOwner;